interface GeminiConfig {
  apiKey: string;
  model: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface BiometricData {
  heartRate: number;
  calories: number;
  steps: number;
  stress: number;
  energy: number;
  focus: number;
  workoutIntensity?: number;
  formAccuracy?: number;
}

interface WorkoutContext {
  currentExercise?: string;
  exerciseType?: string;
  duration?: number;
  difficulty?: string;
  userFitnessLevel?: string;
  goals?: string[];
  spiritAnimal?: string;
}

class GeminiAIService {
  private config: GeminiConfig;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
  private conversationHistory: ChatMessage[] = [];

  constructor(apiKey?: string) {
    // Use the API key from environment variable
    const key = 'AIzaSyD3CIbAcTm14iQLVSHIDjex5K8EIC_iBiY';
    
    if (!key) {
      throw new Error('Gemini API key not found');
    }
    
    this.config = {
      apiKey: key,
      model: 'gemini-1.5-flash'
    };
    this.initializeCoach();
  }

  private initializeCoach() {
    this.conversationHistory = [{
      role: 'model',
      parts: [{
        text: `🚀 AI Coach is now online! I'm powered by advanced AI and ready to help you dominate your fitness journey!`
      }]
    }];
  }

  async sendMessage(message: string, context?: {
    biometrics?: BiometricData;
    workout?: WorkoutContext;
    userStats?: any;
    mode?: 'chat' | 'analysis' | 'motivation' | 'form-check' | 'prediction';
  }): Promise<string> {
    try {
      console.log('Sending message to Gemini:', message);
      
      const systemPrompt = this.buildSystemPrompt(context);
      const userMessage = this.buildUserMessage(message, context);

      const requestBody = {
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt + '\n\n' + userMessage }]
          }
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        }
      };

      const response = await fetch(
        `${this.baseUrl}/${this.config.model}:generateContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        console.error('Gemini API error:', response.status);
        return this.getFallbackResponse(message, context?.mode);
      }

      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        console.error('No candidates in response');
        return this.getFallbackResponse(message, context?.mode);
      }

      const aiResponse = data.candidates[0].content.parts[0].text || this.getFallbackResponse(message, context?.mode);

      // Update conversation history
      this.conversationHistory.push(
        { role: 'user', parts: [{ text: message }] },
        { role: 'model', parts: [{ text: aiResponse }] }
      );

      // Keep conversation history manageable
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      return aiResponse;
    } catch (error) {
      console.error('Gemini AI Error:', error);
      return this.getFallbackResponse(message, context?.mode);
    }
  }

  private buildSystemPrompt(context?: any): string {
    const mode = context?.mode || 'chat';
    const spiritAnimal = context?.workout?.spiritAnimal || 'cheetah';

    return `You are an AI Fitness Coach for FitQuest. Be energetic, motivational, and use gaming terms. Keep responses under 50 words. Current mode: ${mode}. User's spirit animal: ${spiritAnimal}. Use emojis and be encouraging!`;
  }

  private buildUserMessage(message: string, context?: any): string {
    let contextInfo = '';

    if (context?.biometrics) {
      const bio = context.biometrics;
      contextInfo += `\nBiometrics: HR ${Math.round(bio.heartRate)}, Energy ${Math.round(bio.energy)}%`;
    }

    if (context?.workout?.currentExercise) {
      contextInfo += `\nCurrent Exercise: ${context.workout.currentExercise}`;
    }

    return `${message}${contextInfo}`;
  }

  private getFallbackResponse(message: string, mode?: string): string {
    const responses = {
      chat: [
        "🔥 Let's crush this workout together! You've got this, champion! 💪",
        "⚡ Every rep makes you stronger! Keep pushing forward! 🚀",
        "🎯 Focus on your form and feel the power! You're amazing! ✨"
      ],
      analysis: [
        "📊 Your performance is looking great! Keep this intensity up! 🔥",
        "🧠 Your metrics show you're in the zone! Push a bit harder! ⚡",
        "📈 Excellent progress! Your body is responding perfectly! 💪"
      ],
      motivation: [
        "🔥 YOU'RE UNSTOPPABLE! Every challenge makes you STRONGER! 💥",
        "⚡ BEAST MODE ACTIVATED! Nothing can stop you now! 🚀",
        "💪 LEGENDARY performance! You're rewriting what's possible! 🏆"
      ]
    };

    const modeResponses = responses[mode as keyof typeof responses] || responses.chat;
    return modeResponses[Math.floor(Math.random() * modeResponses.length)];
  }

  async provideBiometricInsights(biometrics: BiometricData): Promise<string> {
    const message = "Analyze my current biometric data and provide insights.";
    return this.sendMessage(message, {
      mode: 'analysis',
      biometrics
    });
  }

  async generateMotivation(context: WorkoutContext): Promise<string> {
    const message = `I need motivation for my ${context.currentExercise} workout!`;
    return this.sendMessage(message, {
      mode: 'motivation',
      workout: context
    });
  }

  clearConversation() {
    this.initializeCoach();
  }
}

export default GeminiAIService;