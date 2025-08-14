
import type { Level } from './types';

export const COURSE_STRUCTURE: Level[] = [
  {
    id: 'level-1',
    title: 'Nivel 1: Fundamentos de Power BI',
    description: 'Comienza tu viaje. Aprende la interfaz, cómo importar datos y crear tus primeras visualizaciones.',
    lessons: [
      { id: 'l1-1', title: 'Introducción a Power BI Desktop', topic: 'Introduction to the Power BI Desktop interface for beginners' },
      { id: 'l1-2', title: 'Conectarse a Fuentes de Datos', topic: 'Connecting to data sources in Power BI, focusing on Excel and CSV files' },
      { id: 'l1-3', title: 'Creación de Visualizaciones Básicas', topic: 'Creating basic visualizations like bar charts and pie charts in Power BI' },
    ],
    quiz: { id: 'q1', topic: 'Power BI Fundamentals', questionCount: 5 },
  },
  {
    id: 'level-2',
    title: 'Nivel 2: Modelado y DAX',
    description: 'Profundiza en el corazón de Power BI. Aprende a modelar tus datos y a usar DAX para crear cálculos potentes.',
    lessons: [
      { id: 'l2-1', title: 'Introducción al Modelado de Datos', topic: 'Introduction to data modeling in Power BI, including relationships and cardinality' },
      { id: 'l2-2', title: 'Columnas Calculadas vs. Medidas', topic: 'Calculated Columns vs. Measures in Power BI DAX' },
      { id: 'l2-3', title: 'Funciones DAX Esenciales', topic: 'Essential DAX functions like SUM, AVERAGE, COUNT, and CALCULATE' },
    ],
    quiz: { id: 'q2', topic: 'Power BI Data Modeling and DAX', questionCount: 5 },
  },
  {
    id: 'level-3',
    title: 'Nivel 3: Diseño de Informes Avanzado',
    description: 'Eleva tus informes al siguiente nivel. Aprende sobre temas, marcadores, y técnicas de diseño profesional.',
    lessons: [
      { id: 'l3-1', title: 'Uso de Temas y Plantillas', topic: 'Using themes and templates to standardize Power BI report design' },
      { id: 'l3-2', title: 'Interactividad con Marcadores y Botones', topic: 'Creating interactive reports using bookmarks and buttons in Power BI' },
      { id: 'l3-3', title: 'Principios de Diseño de Dashboards', topic: 'Key principles of effective dashboard design and data storytelling' },
    ],
    quiz: { id: 'q3', topic: 'Advanced Power BI Report Design', questionCount: 5 },
  },
    {
    id: 'level-4',
    title: 'Nivel 4: Power Query y ETL',
    description: 'Domina la transformación de datos. Aprende a limpiar, dar forma y combinar datos con el Editor de Power Query.',
    lessons: [
      { id: 'l4-1', title: 'El Editor de Power Query', topic: 'Comprehensive overview of the Power Query Editor interface in Power BI' },
      { id: 'l4-2', title: 'Transformaciones de Datos Comunes', topic: 'Common data transformations in Power Query, such as splitting columns, changing data types, and filtering rows' },
      { id: 'l4-3', title: 'Combinar y Anexar Consultas', topic: 'Merging and Appending queries in Power Query to combine data from multiple sources' },
    ],
    quiz: { id: 'q4', topic: 'Power Query and Data Transformation', questionCount: 5 },
  },
];
