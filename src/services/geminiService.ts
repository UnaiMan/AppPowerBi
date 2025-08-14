import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedLessonContent, GeneratedQuizContent } from '../types';

// The API key MUST be obtained exclusively from the environment variable `process.env.API_KEY`.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY environment variable not set. It must be configured in your hosting provider (e.g., Netlify).");
}

const ai = new GoogleGenAI({ apiKey });

const lessonSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Título de la lección en español." },
    introduction: { type: Type.STRING, description: "Introducción a la lección en español, de 2 a 3 frases." },
    sections: {
      type: Type.ARRAY,
      description: "Array de secciones de la lección.",
      items: {
        type: Type.OBJECT,
        properties: {
          heading: { type: Type.STRING, description: "Encabezado de la sección en español." },
          content: { type: Type.STRING, description: "Contenido detallado de la sección en español, usando párrafos y listas con formato markdown simple." },
          imagePrompt: {
            type: Type.STRING,
            description: "An English descriptive prompt for an image generation model to illustrate this section. For example: 'A screenshot of the Power BI ribbon with the 'Get Data' button highlighted'. If no image is needed, this field should be omitted."
          }
        },
        required: ["heading", "content"],
      },
    },
    conclusion: { type: Type.STRING, description: "Conclusión de la lección en español, resumiendo los puntos clave." },
  },
  required: ["title", "introduction", "sections", "conclusion"],
};

const quizSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Título del cuestionario en español." },
    questions: {
      type: Type.ARRAY,
      description: "Array de preguntas del cuestionario.",
      items: {
        type: Type.OBJECT,
        properties: {
          questionText: { type: Type.STRING, description: "El texto de la pregunta en español." },
          options: {
            type: Type.ARRAY,
            description: "Un array de 4 posibles respuestas en español.",
            items: { type: Type.STRING },
          },
          correctAnswerIndex: { type: Type.INTEGER, description: "El índice (0-3) de la respuesta correcta en el array de opciones." },
          explanation: { type: Type.STRING, description: "Una breve explicación en español de por qué la respuesta es correcta." },
        },
        required: ["questionText", "options", "correctAnswerIndex", "explanation"],
      },
    },
  },
  required: ["title", "questions"],
};

export const generateLessonContent = async (topic: string): Promise<GeneratedLessonContent> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Genera una lección detallada y fácil de entender para un estudiante de Power BI sobre el siguiente tema: "${topic}". La lección debe estar en español. Para cada sección, si es apropiado, proporciona un 'imagePrompt' en inglés para generar una imagen ilustrativa. Sigue el esquema JSON proporcionado.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonSchema,
      },
    });
    const jsonText = response.text;
    if (!jsonText) {
        throw new Error("Received an empty response from the API.");
    }
    return JSON.parse(jsonText.trim()) as GeneratedLessonContent;
  } catch (error) {
    console.error("Error generating lesson content:", error);
    throw new Error("No se pudo generar el contenido de la lección. Por favor, inténtalo de nuevo.");
  }
};

export const generateQuiz = async (topic: string, questionCount: number): Promise<GeneratedQuizContent> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Crea un cuestionario de ${questionCount} preguntas de opción múltiple sobre el siguiente tema de Power BI: "${topic}". Las preguntas y respuestas deben estar en español. Sigue el esquema JSON proporcionado.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });
    
    const jsonText = response.text;
    if (!jsonText) {
        throw new Error("Received an empty response from the API.");
    }
    return JSON.parse(jsonText.trim()) as GeneratedQuizContent;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("No se pudo generar el cuestionario. Por favor, inténtalo de nuevo.");
  }
};

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: `${prompt}, as a clear screenshot for a tutorial, user interface, high resolution, clear text`,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9',
        },
    });

    const image = response.generatedImages?.[0]?.image;
    if (image?.imageBytes) {
      const base64ImageBytes = image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No images were generated by the API.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("No se pudo generar la imagen.");
  }
};