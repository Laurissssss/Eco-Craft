import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ScannerTab from './components/ScannerTab';
import ProjectsFeed from './components/ProjectsFeed';
import ProfileTab from './components/ProfileTab';
import ProjectDetailModal from './components/ProjectDetailModal';
import NewProjectModal from './components/NewProjectModal';
import AuthModal from './components/AuthModal';
import SubscriptionModal from './components/SubscriptionModal';
import { getStoredProjects, getStoredScans, supabase } from './supabaseClient';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'scan' | 'profile'
  const [projects, setProjects] = useState([]);
  const [scansHistory, setScansHistory] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Pro Membership Status
  const [isPro, setIsPro] = useState(() => {
    return localStorage.getItem('ecocraft_is_pro') === 'true';
  });
  
  // Eco-points & Streak local states
  const [ecoPoints, setEcoPoints] = useState(() => {
    const val = localStorage.getItem('ecocraft_points');
    return val ? parseInt(val, 10) : 120;
  });

  const [recycledStreak, setRecycledStreak] = useState(() => {
    const val = localStorage.getItem('ecocraft_streak');
    return val ? parseInt(val, 10) : 5;
  });

  const [completedProjectIds, setCompletedProjectIds] = useState(() => {
    const val = localStorage.getItem('ecocraft_completed_ids');
    return val ? JSON.parse(val) : ['proj-1'];
  });

  // Load initial data & Auth State Listener
  const loadData = async () => {
    const projList = await getStoredProjects();
    setProjects(projList);
    const scanList = await getStoredScans();
    setScansHistory(scanList);
  };

  useEffect(() => {
    loadData();

    // Listen to Supabase Auth State changes
    const checkInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          setUser(data.session.user);
        }
      } catch (e) {
        console.warn('Session check error:', e);
      }
    };
    checkInitialSession();

    const { data: authSubscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authSubscription?.subscription?.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpgradeSuccess = (plan) => {
    setIsPro(true);
    localStorage.setItem('ecocraft_is_pro', 'true');
    // Reward bonus eco-points for becoming PRO
    handleEarnPoints(100);
  };

  // Update Points handler
  const handleEarnPoints = (pointsEarned = 25) => {
    const updatedPoints = ecoPoints + pointsEarned;
    setEcoPoints(updatedPoints);
    localStorage.setItem('ecocraft_points', updatedPoints.toString());
  };

  // Update Points & Streak handler for completed project
  const handleCompleteProject = (projectId, pointsEarned = 50) => {
    const updatedPoints = ecoPoints + pointsEarned;
    const updatedStreak = recycledStreak + 1;
    const updatedCompleted = Array.from(new Set([...completedProjectIds, projectId]));

    setEcoPoints(updatedPoints);
    setRecycledStreak(updatedStreak);
    setCompletedProjectIds(updatedCompleted);

    localStorage.setItem('ecocraft_points', updatedPoints.toString());
    localStorage.setItem('ecocraft_streak', updatedStreak.toString());
    localStorage.setItem('ecocraft_completed_ids', JSON.stringify(updatedCompleted));
  };

  const handleProjectCreated = (newProj) => {
    setProjects((prev) => [newProj, ...prev]);
    setSelectedProject(newProj);
  };

  const handleScanCompleted = async () => {
    const freshScans = await getStoredScans();
    setScansHistory(freshScans);
  };

  return (
    <div className="w-full min-h-screen bg-[#E2D7C5] flex justify-center py-0 sm:py-6 selection:bg-[#2D5A27]/20">
      {/* Mobile-first viewport container locked to max-w-md */}
      <div className="w-full max-w-md bg-[#EFE8DC] min-h-screen sm:min-h-[92vh] sm:rounded-3xl relative shadow-2xl flex flex-col border border-[#D8CEBC] overflow-hidden">
        {/* Sticky App Header */}
        <Header 
          ecoPoints={ecoPoints} 
          recycledStreak={recycledStreak} 
          user={user}
          isPro={isPro}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onSignOut={handleSignOut}
          onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
          onOpenNewProjectModal={() => setIsAddModalOpen(true)}
        />

        {/* Dynamic Tab Body */}
        <main className="flex-1 overflow-y-auto pb-6">
          {activeTab === 'feed' && (
            <ProjectsFeed
              projects={projects}
              onSelectProject={(proj) => setSelectedProject(proj)}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onEarnPoints={handleEarnPoints}
              recycledCount={recycledStreak}
            />
          )}

          {activeTab === 'scan' && (
            <ScannerTab
              projects={projects}
              onSelectProject={(proj) => setSelectedProject(proj)}
              onScanCompleted={handleScanCompleted}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab
              ecoPoints={ecoPoints}
              recycledStreak={recycledStreak}
              completedProjects={completedProjectIds}
              scansHistory={scansHistory}
              allProjects={projects}
              onSelectProject={(proj) => setSelectedProject(proj)}
              user={user}
              isPro={isPro}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onSignOut={handleSignOut}
              onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
            />
          )}
        </main>

        {/* Sticky Mobile Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={(tab) => setActiveTab(tab)} 
        />

        {/* Modal: Project Detail & Step-by-Step */}
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            isCompleted={completedProjectIds.includes(selectedProject.id)}
            onClose={() => setSelectedProject(null)}
            onCompleteProject={(id, pts) => handleCompleteProject(id, pts)}
          />
        )}

        {/* Modal: Create New Project */}
        {isAddModalOpen && (
          <NewProjectModal
            onClose={() => setIsAddModalOpen(false)}
            onProjectCreated={handleProjectCreated}
          />
        )}

        {/* Modal: Supabase Authentication */}
        {isAuthModalOpen && (
          <AuthModal
            onClose={() => setIsAuthModalOpen(false)}
            onAuthSuccess={(authenticatedUser) => {
              setUser(authenticatedUser);
            }}
          />
        )}

        {/* Modal: Subscription & Payment Simulator */}
        {isSubscriptionModalOpen && (
          <SubscriptionModal
            onClose={() => setIsSubscriptionModalOpen(false)}
            onUpgradeSuccess={handleUpgradeSuccess}
            currentIsPro={isPro}
          />
        )}
      </div>
    </div>
  );
}
