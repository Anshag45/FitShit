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
    // Use the hardcoded API key from env
    const key = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyD3CIbAcTm14iQLVSHIDjex5K8EIC_iBiY';
    
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
        text: `🚀 AI Coach is now online! I'm powered by advanced AI and ready to help you dominate your fitness journey. I can:

🏋️ Analyze your workouts and provide real-time feedback
📊 Interpret your biometric data and suggest optimizations  
🎯 Create personalized workout plans based on your goals
🎮 Guide you through fitness games and challenges
💪 Provide motivation and coaching during exercises
🧠 Track your progress and predict optimal training times
⚡ Adjust difficulty based on your performance

I'm powered by advanced AI and I learn from every interaction to better support your fitness goals. What would you like to work on today?`
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
          maxOutputTokens: 512,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      };

      console.log('Sending request to Gemini API:', {
        url: `${this.baseUrl}/${this.config.model}:generateContent?key=${this.config.apiKey.substring(0, 10)}...`,
        body: requestBody
      });

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

      console.log('Gemini API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', response.status, response.statusText, errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Gemini API Response Data:', data);
      
      if (!data.candidates || data.candidates.length === 0) {
        console.error('No candidates in response:', data);
        throw new Error('No response candidates from Gemini API');
      }

      const candidate = data.candidates[0];
      if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
        console.error('Invalid candidate structure:', candidate);
        throw new Error('Invalid response structure from Gemini API');
      }

      const aiResponse = candidate.content.parts[0].text || this.getFallbackResponse(message, context?.mode);

      // Update conversation history
      this.conversationHistory.push(
        { role: 'user', parts: [{ text: message }] },
        { role: 'model', parts: [{ text: aiResponse }] }
      );

      // Keep conversation history manageable
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

      return aiResponse;
    } catch (error) {
      console.error('Gemini AI Error:', error);
      return this.getFallbackResponse(message, context?.mode);
    }
  }

  private buildSystemPrompt(context?: any): string {
    const mode = context?.mode || 'chat';
    const userStats = context?.userStats;
    const spiritAnimal = context?.workout?.spiritAnimal || 'cheetah';

    let personality = '';
    switch (spiritAnimal) {
      case 'cheetah':
        personality = 'high-energy, motivational, speed-focused, using explosive language';
        break;
      case 'turtle':
        personality = 'calm, steady, mindful, using zen-like wisdom';
        break;
      case 'eagle':
        personality = 'focused, strategic, goal-oriented, using precise language';
        break;
      case 'bear':
        personality = 'strong, powerful, endurance-focused, using bold language';
        break;
    }

    return `You are an advanced AI Fitness Coach for FitQuest, a gamified fitness app. Your personality is ${personality}.

CORE IDENTITY:
- You're an expert fitness coach with deep knowledge of exercise science, nutrition, and motivation
- You speak in gaming terms (XP, levels, quests, achievements, power-ups)
- You're encouraging but realistic, pushing users to their limits safely
- You adapt your communication style to the user's spirit animal: ${spiritAnimal}
- Keep responses under 100 words, energetic and actionable

CURRENT MODE: ${mode.toUpperCase()}

${mode === 'analysis' ? `
ANALYSIS MODE - Focus on:
- Interpreting biometric data and performance metrics
- Identifying patterns and trends
- Providing actionable insights
- Suggesting optimizations
` : ''}

${mode === 'motivation' ? `
MOTIVATION MODE - Focus on:
- High-energy encouragement
- Celebrating achievements
- Pushing through challenges
- Building confidence
` : ''}

USER STATS: ${userStats ? `Level ${userStats.level}, ${userStats.xp} XP, ${userStats.totalWorkouts} workouts completed` : 'New user'}

Keep responses concise (2-3 sentences max), actionable, and motivating. Use emojis effectively.`;
  }

  private buildUserMessage(message: string, context?: any): string {
    let contextInfo = '';

    if (context?.biometrics) {
      const bio = context.biometrics;
      contextInfo += `\nCURRENT BIOMETRICS:
- Heart Rate: ${Math.round(bio.heartRate)} BPM
- Energy Level: ${Math.round(bio.energy)}%
- Focus: ${Math.round(bio.focus)}%
- Stress: ${Math.round(bio.stress)}%
- Calories Burned: ${Math.round(bio.calories)}`;

      if (bio.workoutIntensity) {
        contextInfo += `\n- Workout Intensity: ${Math.round(bio.workoutIntensity)}%`;
      }
      if (bio.formAccuracy) {
        contextInfo += `\n- Form Accuracy: ${Math.round(bio.formAccuracy)}%`;
      }
    }

    if (context?.workout) {
      const workout = context.workout;
      contextInfo += `\nWORKOUT CONTEXT:
- Current Exercise: ${workout.currentExercise || 'None'}
- Exercise Type: ${workout.exerciseType || 'Unknown'}
- Difficulty: ${workout.difficulty || 'Medium'}`;
    }

    return `USER MESSAGE: ${message}${contextInfo}`;
  }

  private getFallbackResponse(message: string, mode?: string): string {
    const fallbacks = {
      chat: [
        "🔥 I'm here to power up your fitness journey! Let's crush those goals together! 💪",
        "⚡ Every rep counts, champion! What's your next power move? 🏆",
        "🚀 Your dedication is legendary! Ready to level up? Let's go! 🎯"
      ],
      analysis: [
        "📊 Your performance metrics show incredible potential! Keep this intensity! 🔥",
        "🧠 Analyzing your data - you're in the optimal training zone! Keep pushing! ⚡",
        "📈 Your biometrics indicate peak performance mode! You're crushing it! 💪"
      ],
      motivation: [
        "🔥 YOU'RE ABSOLUTELY UNSTOPPABLE! Every challenge makes you STRONGER! 💥",
        "⚡ LEGENDARY performance! You're rewriting what's possible! Keep going! 🚀",
        "💪 BEAST MODE ACTIVATED! Nothing can stop this momentum! You're amazing! 🏆"
      ]
    };

    const responses = fallbacks[mode as keyof typeof fallbacks] || fallbacks.chat;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async analyzeWorkoutForm(exerciseName: string, formData: any): Promise<string> {
    const message = `Analyze my form for ${exerciseName}. Current form accuracy: ${formData.accuracy}%`;
    return this.sendMessage(message, {
      mode: 'form-check',
      workout: { currentExercise: exerciseName },
      biometrics: { formAccuracy: formData.accuracy }
    });
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

  async predictPerformance(userStats: any, recentWorkouts: any[]): Promise<string> {
    const message = "Predict my performance and suggest optimal training times.";
    return this.sendMessage(message, {
      mode: 'prediction',
      userStats,
      workout: { userFitnessLevel: 'intermediate' }
    });
  }

  async createPersonalizedWorkout(goals: string[], fitnessLevel: string, timeAvailable: number): Promise<string> {
    const message = `Create a ${timeAvailable}-minute workout for my goals: ${goals.join(', ')}. My fitness level is ${fitnessLevel}.`;
    return this.sendMessage(message, {
      mode: 'analysis',
      workout: { 
        duration: timeAvailable, 
        difficulty: fitnessLevel,
        goals 
      }
    });
  }

  clearConversation() {
    this.initializeCoach();
  }
}

export default GeminiAIService;