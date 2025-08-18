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
      { id: 'l2-4', title: 'Inteligencia de Tiempo Básica con DAX', topic: 'Basic Time Intelligence functions in DAX like DATESYTD' },
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
      { id: 'l3-4', title: 'Mejorando la Experiencia con Tooltips y Drillthrough', topic: 'Creating custom report tooltips and drillthrough pages in Power BI' },
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
      { id: 'l4-4', title: 'Uso de Parámetros en Power Query', topic: 'Using Parameters in Power Query for dynamic data sources' },
    ],
    quiz: { id: 'q4', topic: 'Power Query and ETL', questionCount: 5 },
  },
  {
    id: 'level-5',
    title: 'Nivel 5: Servicio Power BI y Colaboración',
    description: 'Comparte tu trabajo con el mundo. Publica informes, crea paneles y colabora con tu equipo en el Servicio Power BI.',
    lessons: [
      { id: 'l5-1', title: 'Publicando Informes al Servicio Power BI', topic: 'PublishING Reports to the Power BI Service' },
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
      { id: 'l6-4', title: 'Entendiendo el Contexto de Filtro en DAX', topic: 'Understanding Filter Context and Row Context in DAX' },
    ],
    quiz: { id: 'q6', topic: 'Optimization and Pro Techniques', questionCount: 5 },
  },
  {
    id: 'level-7',
    title: 'Nivel 7: DAX Avanzado y Patrones de Modelado',
    description: 'Sumérgete en las complejidades de DAX. Aprende sobre contextos de iteración, inteligencia de tiempo avanzada y patrones de modelado complejos.',
    lessons: [
      { id: 'l7-1', title: 'Contexto de Iteración y Funciones \'X\'', topic: 'DAX Iterator functions like SUMX, AVERAGEX' },
      { id: 'l7-2', title: 'Inteligencia de Tiempo Avanzada', topic: 'Advanced Time Intelligence in DAX using functions like PARALLELPERIOD, SAMEPERIODLASTYEAR' },
      { id: 'l7-3', title: 'Patrones de Modelado: Tablas de Hechos y Dimensiones', topic: 'Star Schema fundamentals: Fact tables vs. Dimension tables in Power BI' },
      { id: 'l7-4', title: 'Variables en DAX para Código Limpio y Eficiente', topic: 'Using VAR in DAX to write cleaner and more efficient measures' },
    ],
    quiz: { id: 'q7', topic: 'Advanced DAX and Modeling Patterns', questionCount: 5 },
  },
  {
    id: 'level-8',
    title: 'Nivel 8: Proyectos Prácticos Guiados',
    description: 'Pon a prueba tus habilidades con proyectos del mundo real. Crea un informe de ventas, un panel de RRHH y un análisis financiero de principio a fin.',
    lessons: [
        { id: 'l8-1', title: 'Proyecto 1: Informe de Ventas Interactivo', topic: 'Building a complete interactive sales report in Power BI from scratch, including data modeling, DAX measures, and report design' },
        { id: 'l8-2', title: 'Proyecto 2: Panel de Recursos Humanos', topic: 'Creating a Human Resources dashboard in Power BI to analyze employee turnover, recruitment, and performance metrics' },
        { id: 'l8-3', title: 'Proyecto 3: Análisis Financiero para Ejecutivos', topic: 'Developing a financial analysis dashboard for executives in Power BI, focusing on KPIs like profit margin, ROI, and cash flow' },
    ],
    quiz: { id: 'q8', topic: 'Practical application of Power BI skills in real-world scenarios', questionCount: 5 },
  },
  {
    id: 'level-9',
    title: 'Nivel 9: Tópicos Super Pro y Herramientas Externas',
    description: 'Conviértete en una leyenda de Power BI. Explora herramientas externas, scripting con Tabular Editor y optimización a gran escala.',
    lessons: [
        { id: 'l9-1', title: 'Introducción a Herramientas Externas (DAX Studio, Tabular Editor)', topic: 'Introduction to external tools for Power BI like DAX Studio and Tabular Editor' },
        { id: 'l9-2', title: 'Scripting y Automatización con Tabular Editor', topic: 'Automating DAX measure creation and data model changes using Tabular Editor scripting' },
        { id: 'l9-3', title: 'Optimización de Modelos a Gran Escala (DirectQuery y Modelos Compuestos)', topic: 'Optimizing large-scale Power BI models using DirectQuery, composite models, and aggregation tables' },
        { id: 'l9-4', title: 'Análisis de Rendimiento con DAX Studio', topic: 'Using DAX Studio to analyze and optimize the performance of DAX queries' },
    ],
    quiz: { id: 'q9', topic: 'Super Pro techniques and external tools for Power BI', questionCount: 5 },
  },
  {
    id: 'level-10',
    title: 'Nivel 10: Contenido Extra y Futuro de Power BI',
    description: 'Expande tus horizontes. Descubre la integración con Python y R, explora Power BI Embedded y mantente al día con las últimas tendencias.',
    lessons: [
        { id: 'l10-1', title: 'Integración de Python y R para Visualizaciones Avanzadas', topic: 'Integrating Python and R scripts in Power BI for advanced data analysis and custom visualizations' },
        { id: 'l10-2', title: 'Introducción a Power BI Embedded', topic: 'Introduction to Power BI Embedded for integrating reports into custom applications' },
        { id: 'l10-3', title: 'Dataflows y su Papel en la Arquitectura de BI', topic: 'Understanding and using Power BI Dataflows for reusable data preparation logic' },
        { id: 'l10-4', title: 'Manteniéndose Actualizado: El Futuro de Power BI', topic: 'How to stay updated with the latest Power BI features and roadmap trends' },
    ],
    quiz: { id: 'q10', topic: 'Bonus knowledge and future trends in Power BI', questionCount: 5 },
  },
];

export const PASSING_SCORE_PERCENTAGE = 60;