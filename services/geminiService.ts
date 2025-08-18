import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedLessonContent, GeneratedQuiz } from '../types';

export class InvalidApiKeyError extends Error {
  constructor(message = 'Clave de API de Gemini no válida o no encontrada.') {
    super(message);
    this.name = 'InvalidApiKeyError';
  }
}

const getGenAIClient = (): GoogleGenAI => {
  const apiKey = localStorage.getItem('gemini-api-key');
  if (!apiKey) {
    throw new InvalidApiKeyError('La clave de API no se encontró en el almacenamiento local.');
  }
  return new GoogleGenAI({ apiKey });
};

const handleApiError = (error: any): never => {
    console.error("Error en la API de Gemini:", error);
    if (error.message && (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID'))) {
        throw new InvalidApiKeyError();
    }
    throw new Error("Falló la comunicación con la API de Gemini.");
};


export const generateLessonContent = async (topic: string): Promise<GeneratedLessonContent> => {
  try {
    const ai = getGenAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Genera una lección detallada y fácil de entender en español sobre el siguiente tema de Power BI: "${topic}". La lección debe ser educativa, clara y estar estructurada para un principiante. No incluyas el título principal en la respuesta, solo el objeto JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "El título de la lección en español." },
            introduction: { type: Type.STRING, description: "Una introducción atractiva al tema." },
            sections: {
              type: Type.ARRAY,
              description: "Una lista de secciones que componen la lección.",
              items: {
                type: Type.OBJECT,
                properties: {
                  heading: { type: Type.STRING, description: "El encabezado de la sección en español." },
                  content: { type: Type.STRING, description: "El contenido detallado de la sección, en formato markdown simple." },
                  imagePrompt: { type: Type.STRING, description: "Opcional. Un prompt en inglés para generar una imagen ilustrativa para esta sección." },
                },
                required: ['heading', 'content'],
              },
            },
            conclusion: { type: Type.STRING, description: "Una conclusión que resuma los puntos clave." },
          },
          required: ['title', 'introduction', 'sections', 'conclusion'],
        },
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as GeneratedLessonContent;
  } catch (error) {
    if (error instanceof InvalidApiKeyError) throw error;
    handleApiError(error);
  }
};

export const generateQuiz = async (topic: string, questionCount: number): Promise<GeneratedQuiz> => {
  try {
    const ai = getGenAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Genera un cuestionario de opción múltiple en español con ${questionCount} preguntas sobre el siguiente tema de Power BI: "${topic}". Cada pregunta debe tener 4 opciones y solo una respuesta correcta. Las preguntas deben evaluar la comprensión del tema. No incluyas el título principal en la respuesta, solo el objeto JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "El título del cuestionario en español." },
            questions: {
              type: Type.ARRAY,
              description: "La lista de preguntas del cuestionario.",
              items: {
                type: Type.OBJECT,
                properties: {
                  questionText: { type: Type.STRING, description: "El texto de la pregunta." },
                  options: {
                    type: Type.ARRAY,
                    description: "Un array de 4 strings con las posibles respuestas.",
                    items: { type: Type.STRING },
                  },
                  correctAnswerIndex: { type: Type.INTEGER, description: "El índice (0-3) de la respuesta correcta en el array de opciones." },
                  explanation: { type: Type.STRING, description: "Una breve explicación de por qué la respuesta es correcta." },
                },
                required: ['questionText', 'options', 'correctAnswerIndex', 'explanation'],
              },
            },
          },
          required: ['title', 'questions'],
        },
      },
    });
    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    // Ensure the number of options is exactly 4
    parsedData.questions.forEach((q: any) => {
        if(q.options.length > 4) q.options = q.options.slice(0, 4);
        while(q.options.length < 4) q.options.push("Opción inválida");
    });
    return parsedData as GeneratedQuiz;
  } catch (error) {
    if (error instanceof InvalidApiKeyError) throw error;
    handleApiError(error);
  }
};

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
    try {
      const ai = getGenAIClient();
      const fullPrompt = `${prompt}, as a clear screenshot for a tutorial, user interface, high resolution, clear text`;
      const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          aspectRatio: '16:9',
          outputMimeType: 'image/png',
        },
      });
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } catch (error) {
        if (error instanceof InvalidApiKeyError) throw error;
        handleApiError(error);
    }
};