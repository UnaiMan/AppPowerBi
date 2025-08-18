
import type { Level } from './types';

export const COURSE_STRUCTURE: Level[] = [
  {
    id: 'level-1',
    title: 'Nivel 1: Fundamentos de Power BI',
    description: 'Comienza tu viaje. Conoce la interfaz, conecta tus primeras fuentes de datos y crea visualizaciones básicas.',
    lessons: [
      { id: 'l1-1', title: 'Introducción a la Inteligencia de Negocios y Power BI', topic: 'Introduction to Business Intelligence and Power BI' },
      { id: 'l1-2', title: 'Explorando la Interfaz de Power BI Desktop', topic: 'Exploring the Power BI Desktop Interface' },
      { id: 'l1-3', title: 'Conectando a Fuentes de Datos (Excel y CSV)', topic: 'Connecting to Data Sources (Excel and CSV)' },
    ],
    quiz: { id: 'q1', topic: 'Power BI Fundamentals', questionCount: 5 },
  },
  {
    id: 'level-2',
    title: 'Nivel 2: Modelado de Datos y DAX Básico',
    description: 'Aprende a estructurar tus datos. Crea relaciones, columnas calculadas y tus primeras medidas con DAX.',
    lessons: [
      { id: 'l2-1', title: 'Introducción al Modelado de Datos', topic: 'Introduction to Data Modeling in Power BI' },
      { id: 'l2-2', title: 'Creando Relaciones entre Tablas', topic: 'Creating Relationships between Tables in Power BI' },
      { id: 'l2-3', title: 'Fundamentos de DAX: Columnas Calculadas vs. Medidas', topic: 'DAX Fundamentals: Calculated Columns vs. Measures' },
    ],
    quiz: { id: 'q2', topic: 'Data Modeling and Basic DAX', questionCount: 5 },
  },
  {
    id: 'level-3',
    title: 'Nivel 3: Diseño de Informes Avanzado',
    description: 'Haz que tus informes destaquen. Domina las visualizaciones, aplica temas y mejora la interactividad.',
    lessons: [
      { id: 'l3-1', title: 'Visualizaciones Avanzadas y Personalizadas', topic: 'Advanced and Custom Visualizations in Power BI' },
      { id: 'l3-2', title: 'Uso de Marcadores y Botones para la Navegación', topic: 'Using Bookmarks and Buttons for Navigation' },
      { id: 'l3-3', title: 'Diseño de Informes y Temas', topic: 'Report Design and Theming in Power BI' },
    ],
    quiz: { id: 'q3', topic: 'Advanced Report Design', questionCount: 5 },
  },
  {
    id: 'level-4',
    title: 'Nivel 4: Power Query y Transformación de Datos (ETL)',
    description: 'El poder detrás de los datos. Limpia, transforma y combina datos de múltiples fuentes con el Editor de Power Query.',
    lessons: [
      { id: 'l4-1', title: 'Introducción al Editor de Power Query', topic: 'Introduction to the Power Query Editor' },
      { id: 'l4-2', title: 'Técnicas Comunes de Limpieza y Transformación', topic: 'Common Data Cleaning and Transformation Techniques' },
      { id: 'l4-3', title: 'Combinar y Anexar Consultas', topic: 'Merging and Appending Queries in Power Query' },
    ],
    quiz: { id: 'q4', topic: 'Power Query and ETL', questionCount: 5 },
  },
  {
    id: 'level-5',
    title: 'Nivel 5: Servicio Power BI y Colaboración',
    description: 'Comparte tu trabajo con el mundo. Publica informes, crea paneles y colabora con tu equipo en el Servicio Power BI.',
    lessons: [
      { id: 'l5-1', title: 'Publicando Informes al Servicio Power BI', topic: 'Publishing Reports to the Power BI Service' },
      { id: 'l5-2', title: 'Creación de Paneles (Dashboards)', topic: 'Creating Dashboards in the Power BI Service' },
      { id: 'l5-3', title: 'Compartir y Colaborar en Áreas de Trabajo', topic: 'Sharing and Collaborating in Workspaces' },
    ],
    quiz: { id: 'q5', topic: 'Power BI Service and Collaboration', questionCount: 5 },
  },
  {
    id: 'level-6',
    title: 'Nivel 6: Optimización y Técnicas Pro',
    description: 'Lleva tus habilidades al siguiente nivel. Optimiza el rendimiento de tus modelos y aprende técnicas avanzadas de DAX.',
    lessons: [
      { id: 'l6-1', title: 'Mejores Prácticas para el Rendimiento del Modelo', topic: 'Best Practices for Model Performance Optimization' },
      { id: 'l6-2', title: 'Introducción a la Función CALCULATE', topic: 'Introduction to the CALCULATE function in DAX' },
      { id: 'l6-3', title: 'Seguridad a Nivel de Fila (Row-Level Security)', topic: 'Row-Level Security (RLS) in Power BI' },
    ],
    quiz: { id: 'q6', topic: 'Optimization and Pro Techniques', questionCount: 5 },
  },
];

export const PASSING_SCORE_PERCENTAGE = 60;
