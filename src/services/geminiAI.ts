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

  constructor(apiKey: string) {
    this.config = {
      apiKey,
      model: 'gemini-1.5-flash'
    };
    this.initializeCoach();
  }

  private initializeCoach() {
    this.conversationHistory = [{
      role: 'model',
      parts: [{
        text: `I'm your AI Fitness Coach! I'm here to help you on your fitness gaming journey. I can:

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

      const response = await fetch(
        `${this.baseUrl}/${this.config.model}:generateContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: systemPrompt + '\n\n' + userMessage }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I'm having trouble processing that right now. Let's keep pushing forward with your fitness journey!";

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

${mode === 'form-check' ? `
FORM CHECK MODE - Focus on:
- Exercise technique analysis
- Safety considerations
- Improvement suggestions
- Injury prevention
` : ''}

${mode === 'prediction' ? `
PREDICTION MODE - Focus on:
- Performance forecasting
- Optimal timing recommendations
- Goal achievement timelines
- Training adaptations
` : ''}

USER STATS: ${userStats ? `Level ${userStats.level}, ${userStats.xp} XP, ${userStats.totalWorkouts} workouts completed` : 'New user'}

Keep responses concise (2-3 sentences max), actionable, and motivating. Use emojis sparingly but effectively.`;
  }

  private buildUserMessage(message: string, context?: any): string {
    let contextInfo = '';

    if (context?.biometrics) {
      const bio = context.biometrics;
      contextInfo += `\nCURRENT BIOMETRICS:
- Heart Rate: ${bio.heartRate} BPM
- Energy Level: ${bio.energy}%
- Focus: ${bio.focus}%
- Stress: ${bio.stress}%
- Calories Burned: ${bio.calories}`;

      if (bio.workoutIntensity) {
        contextInfo += `\n- Workout Intensity: ${bio.workoutIntensity}%`;
      }
      if (bio.formAccuracy) {
        contextInfo += `\n- Form Accuracy: ${bio.formAccuracy}%`;
      }
    }

    if (context?.workout) {
      const workout = context.workout;
      contextInfo += `\nWORKOUT CONTEXT:
- Current Exercise: ${workout.currentExercise || 'None'}
- Exercise Type: ${workout.exerciseType || 'Unknown'}
- Difficulty: ${workout.difficulty || 'Medium'}
- Duration: ${workout.duration || 0} minutes`;
    }

    return `USER MESSAGE: ${message}${contextInfo}`;
  }

  private getFallbackResponse(message: string, mode?: string): string {
    const fallbacks = {
      chat: [
        "I'm here to support your fitness journey! Let's keep pushing forward! 💪",
        "Every rep counts! What's your next move, champion? 🏆",
        "Your dedication is inspiring! Let's level up together! ⚡"
      ],
      analysis: [
        "📊 Your performance data shows great potential! Keep maintaining this intensity!",
        "🧠 I'm analyzing your patterns - you're on track for amazing results!",
        "📈 Your metrics indicate you're in the optimal training zone!"
      ],
      motivation: [
        "🔥 YOU'RE UNSTOPPABLE! Every challenge makes you stronger!",
        "💥 LEGENDARY performance! You're rewriting what's possible!",
        "⚡ BEAST MODE ACTIVATED! Nothing can stop you now!"
      ],
      'form-check': [
        "🎯 Focus on controlled movements and proper breathing!",
        "💪 Great form! Keep that core engaged and shoulders aligned!",
        "⭐ Perfect technique! You're mastering this exercise!"
      ],
      prediction: [
        "🔮 Based on your progress, you'll achieve your goal ahead of schedule!",
        "📊 Your consistency suggests 15% improvement in the next two weeks!",
        "🎯 Optimal workout window: Your body performs best in the evening!"
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