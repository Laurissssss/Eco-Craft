import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Fallback initial mock data for seamless demo when keys are not configured
export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Macetero Auto-Regable Colgante',
    material: 'Plástico',
    category: 'Jardín',
    difficulty: 'Fácil',
    time: '20 min',
    co2_saved: '0.4 kg CO2',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    description: 'Transforma botellas de plástico desechadas de 2L en hermosos maceteros colgantes con sistema de mecha para autorriego.',
    materials_list: [
      '1 Botella plástica transparente limpia (2L o 1.5L)',
      'Tira de tela de algodón o cuerda de yute (15 cm)',
      'Tijeras o cúter multiusos',
      'Tierra fértil para plantas',
      'Planta pequeña o esqueje (suculenta o menta)'
    ],
    steps: [
      {
        step: 1,
        title: 'Corte de la botella',
        detail: 'Corta con cuidado la botella por la mitad. Utilizaremos ambas secciones: la superior invertida como maceta y la inferior como depósito de agua.'
      },
      {
        step: 2,
        title: 'Sistema de autorriego',
        detail: 'Haz una pequeña perforación en la tapa plástica y pasa la cuerda de algodón dejando 5cm hacia la tierra y 5cm hacia el fondo para que absorba el agua por capilaridad.'
      },
      {
        step: 3,
        title: 'Montaje y plantación',
        detail: 'Enrosca la tapa, coloca la parte superior invertida dentro de la base, agrega la tierra envolviendo la cuerda y trasplanta con cuidado tu esqueje.'
      },
      {
        step: 4,
        title: 'Llenado y colocación',
        detail: 'Vierte agua fresca en la base sin rebasar el cuello. ¡Tu planta absorberá exactamente lo que necesita durante hasta 12 días!'
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'proj-2',
    title: 'Organizador de Escritorio Modular',
    material: 'Cartón',
    category: 'Almacenamiento',
    difficulty: 'Fácil',
    time: '35 min',
    co2_saved: '0.8 kg CO2',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    description: 'Convierte cajas de cartón corrugado y tubos de papel en un elegante organizador nórdico de escritorio.',
    materials_list: [
      '1 Caja de cartón mediana resistente',
      '3 Tubos de papel higiénico o de cocina',
      'Pegamento blanco no tóxico o cola vinílica',
      'Papel kraft o pintura acrílica color tierra',
      'Regla y cúter'
    ],
    steps: [
      {
        step: 1,
        title: 'Diseño y compartimentos',
        detail: 'Mide la altura deseada para tus bolígrafos, clips y bloc de notas. Corta los tubos a diferentes alturas diagonales.'
      },
      {
        step: 2,
        title: 'Ensamble de la estructura',
        detail: 'Pega los tubos entre sí formando un bloque triangular o en hilera sobre la base rectangular de cartón.'
      },
      {
        step: 3,
        title: 'Refuerzo y forrado',
        detail: 'Forra con tiras de papel kraft rústico para un acabado minimalista y natural de estilo estético.'
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'proj-3',
    title: 'Bolsa Tote Bag Ecológica Sin Costuras',
    material: 'Textil',
    category: 'Moda',
    difficulty: 'Medio',
    time: '25 min',
    co2_saved: '1.2 kg CO2',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    description: 'Dale una segunda vida a esa camiseta de algodón vieja convirtiéndola en una bolsa de compras superresistente y lavable sin necesidad de coser.',
    materials_list: [
      '1 Camiseta de algodón vieja (talla M o L)',
      'Tijeras afiladas para tela',
      'Tiza o lápiz para marcar'
    ],
    steps: [
      {
        step: 1,
        title: 'Corte de mangas y cuello',
        detail: 'Extiende la camiseta lisa. Corta ambas mangas y amplía el escote del cuello en forma de U profunda para crear las asas.'
      },
      {
        step: 2,
        title: 'Creación de flecos inferiores',
        detail: 'En el borde inferior, corta tiras verticales de 8 cm de largo y 2 cm de ancho por ambas caras (delantera y trasera).'
      },
      {
        step: 3,
        title: 'Anudado doble resistente',
        detail: 'Ata cada fleco frontal con su correspondiente fleco trasero con un nudo doble bien ajustado. ¡Listo para llevar tus compras!'
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'proj-4',
    title: 'Farol Portavelas Rústico Cálido',
    material: 'Vidrio',
    category: 'Decoración',
    difficulty: 'Fácil',
    time: '15 min',
    co2_saved: '0.6 kg CO2',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
    description: 'Transforma frascos de café o mermelada en farolitos decorativos con luz tenue para terrazas y dormitorios.',
    materials_list: [
      '1 Frasco de vidrio transparente lavado y seco',
      '2 metros de cuerda de cáñamo o yute',
      'Vela de cera de soja o vela LED',
      'Hojas secas prensadas o ramitas de lavanda'
    ],
    steps: [
      {
        step: 1,
        title: 'Preparación de la superficie',
        detail: 'Retira la etiqueta con agua tibia y jabón. Seca completamente con un paño suave.'
      },
      {
        step: 2,
        title: 'Atado de asa colgante',
        detail: 'Haz un anillo firme alrededor de la boca del frasco con el hilo de yute y genera un asa arqueada superior con nudo corredizo.'
      },
      {
        step: 3,
        title: 'Decoración botánica',
        detail: 'Inserta la ramita aromática o fija hojas secas en el exterior. Introduce tu vela y disfruta de una atmósfera serena.'
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'proj-5',
    title: 'Dispensador de Hilo y Cordeles',
    material: 'Plástico',
    category: 'Herramientas',
    difficulty: 'Fácil',
    time: '10 min',
    co2_saved: '0.2 kg CO2',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    description: 'Evita enredos en tus hilos o cuerdas de taller usando botellas pequeñas tipo refresco o botellines de viaje.',
    materials_list: [
      '1 Botella pequeña de plástico duro',
      'Madeja o ovillo de cordel o hilo',
      'Cúter afilado'
    ],
    steps: [
      {
        step: 1,
        title: 'Corte intermedio',
        detail: 'Haz una incisión horizontal a 3/4 de la altura de la botella sin llegar a separar la tapa por completo (dejando una bisagra).'
      },
      {
        step: 2,
        title: 'Salida de la mecha',
        detail: 'Introduce el ovillo sacando la punta del hilo a través del pico o pico dosificador de la botella.'
      },
      {
        step: 3,
        title: 'Cierre seguro',
        detail: 'Cierra con una tira de cinta adhesiva de papel. Ahora podrás jalar el hilo sin que ruede ni se ensucie en el taller.'
      }
    ],
    created_at: new Date().toISOString()
  }
];

export const INITIAL_SCANS = [
  {
    id: 'scan-1',
    item_name: 'Botella de Plástico PET (1.5L)',
    material: 'Plástico',
    target_purpose: 'Jardín',
    image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    recommendations_count: 3,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'scan-2',
    item_name: 'Caja de Paquete Courier',
    material: 'Cartón',
    target_purpose: 'Almacenamiento',
    image_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    recommendations_count: 2,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

// In-memory / localStorage auth mock helper when Supabase keys are not set
const authListeners = new Set();
const notifyAuthChange = (event, session) => {
  authListeners.forEach((callback) => {
    try {
      callback(event, session);
    } catch (e) {
      console.error(e);
    }
  });
};

const getLocalSession = () => {
  try {
    const raw = localStorage.getItem('ecocraft_mock_auth_user');
    if (raw) {
      const user = JSON.parse(raw);
      return { user, access_token: 'mock-token-xyz' };
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};

// Initialize real client or create a graceful mock fallback
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => {
          const session = getLocalSession();
          return { data: { session }, error: null };
        },
        getUser: async () => {
          const session = getLocalSession();
          return { data: { user: session ? session.user : null }, error: null };
        },
        signInWithPassword: async ({ email, password }) => {
          if (!email || !password) {
            return { data: null, error: { message: 'Por favor completa todos los campos' } };
          }
          if (password.length < 6) {
            return { data: null, error: { message: 'La contraseña debe tener al menos 6 caracteres' } };
          }
          const user = {
            id: `usr-${Date.now()}`,
            email,
            user_metadata: { name: email.split('@')[0] },
            created_at: new Date().toISOString()
          };
          localStorage.setItem('ecocraft_mock_auth_user', JSON.stringify(user));
          const session = { user, access_token: 'mock-token-xyz' };
          notifyAuthChange('SIGNED_IN', session);
          return { data: { user, session }, error: null };
        },
        signUp: async ({ email, password }) => {
          if (!email || !password) {
            return { data: null, error: { message: 'Por favor completa todos los campos' } };
          }
          if (password.length < 6) {
            return { data: null, error: { message: 'La contraseña debe tener al menos 6 caracteres' } };
          }
          const user = {
            id: `usr-${Date.now()}`,
            email,
            user_metadata: { name: email.split('@')[0] },
            created_at: new Date().toISOString()
          };
          localStorage.setItem('ecocraft_mock_auth_user', JSON.stringify(user));
          const session = { user, access_token: 'mock-token-xyz' };
          notifyAuthChange('SIGNED_IN', session);
          return { data: { user, session }, error: null };
        },
        signOut: async () => {
          localStorage.removeItem('ecocraft_mock_auth_user');
          notifyAuthChange('SIGNED_OUT', null);
          return { error: null };
        },
        onAuthStateChange: (callback) => {
          authListeners.add(callback);
          const session = getLocalSession();
          if (session) {
            callback('INITIAL_SESSION', session);
          }
          return {
            data: {
              subscription: {
                unsubscribe: () => {
                  authListeners.delete(callback);
                }
              }
            }
          };
        }
      },
      from: (table) => {
        return {
          select: async () => {
            const key = `ecocraft_mock_${table}`;
            const stored = localStorage.getItem(key);
            if (stored) {
              try {
                return { data: JSON.parse(stored), error: null };
              } catch (e) {
                console.error(e);
              }
            }
            const fallback = table === 'projects' ? INITIAL_PROJECTS : INITIAL_SCANS;
            localStorage.setItem(key, JSON.stringify(fallback));
            return { data: fallback, error: null };
          },
          insert: async (records) => {
            const key = `ecocraft_mock_${table}`;
            const stored = localStorage.getItem(key);
            const current = stored ? JSON.parse(stored) : (table === 'projects' ? INITIAL_PROJECTS : INITIAL_SCANS);
            const newRecords = Array.isArray(records) ? records : [records];
            const updated = [...newRecords.map(r => ({ ...r, id: r.id || `local-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, created_at: r.created_at || new Date().toISOString() })), ...current];
            localStorage.setItem(key, JSON.stringify(updated));
            return { data: updated, error: null };
          }
        };
      }
    };

// Helper methods to guarantee synchronous persistence in LocalStorage as well
export const getStoredProjects = async () => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
  } catch (err) {
    console.warn('Using local fallback for projects:', err);
  }
  const local = localStorage.getItem('ecocraft_mock_projects');
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem('ecocraft_mock_projects', JSON.stringify(INITIAL_PROJECTS));
  return INITIAL_PROJECTS;
};

export const getStoredScans = async () => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('scans_history').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
  } catch (err) {
    console.warn('Using local fallback for scans:', err);
  }
  const local = localStorage.getItem('ecocraft_mock_scans_history');
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem('ecocraft_mock_scans_history', JSON.stringify(INITIAL_SCANS));
  return INITIAL_SCANS;
};

export const saveScanRecord = async (scanData) => {
  const newScan = {
    ...scanData,
    id: `scan-${Date.now()}`,
    created_at: new Date().toISOString()
  };

  try {
    if (isSupabaseConfigured) {
      await supabase.from('scans_history').insert([newScan]);
    }
  } catch (err) {
    console.warn('Supabase insert fallback:', err);
  }

  // Also update local storage cache
  const local = localStorage.getItem('ecocraft_mock_scans_history');
  const current = local ? JSON.parse(local) : INITIAL_SCANS;
  const updated = [newScan, ...current];
  localStorage.setItem('ecocraft_mock_scans_history', JSON.stringify(updated));
  return newScan;
};

export const saveNewProject = async (projectData) => {
  const newProject = {
    ...projectData,
    id: `proj-${Date.now()}`,
    created_at: new Date().toISOString()
  };

  try {
    if (isSupabaseConfigured) {
      await supabase.from('projects').insert([newProject]);
    }
  } catch (err) {
    console.warn('Supabase insert fallback:', err);
  }

  const local = localStorage.getItem('ecocraft_mock_projects');
  const current = local ? JSON.parse(local) : INITIAL_PROJECTS;
  const updated = [newProject, ...current];
  localStorage.setItem('ecocraft_mock_projects', JSON.stringify(updated));
  return newProject;
};
