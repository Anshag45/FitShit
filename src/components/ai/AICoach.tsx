import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle, Zap, Target, TrendingUp, Heart, Brain, Camera, Mic, Send, Sparkles, X } from 'lucide-react';
import { InteractiveCard } from '../common/InteractiveCard';
import { useApp } from '../../contexts/AppContext';
import GeminiAIService from '../../services/geminiAI';

interface AICoachProps {
  isVisible: boolean;
  onClose: () => void;
}

export function AICoach({ isVisible, onClose }: AICoachProps) {
  const { state } = useApp();
  const [messages, setMessages] = useState<Array<{ type: 'ai' | 'user'; content: string; timestamp: Date }>>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [coachMode, setCoachMode] = useState<'chat' | 'analysis' | 'motivation'>('chat');
  const [aiService, setAiService] = useState<GeminiAIService | null>(null);

  const aiPersonalities = {
    cheetah: {
      name: 'Velocity',
      personality: 'High-energy, motivational, speed-focused',
      avatar: '🐆',
      color: 'from-orange-500 to-red-500'
    },
    turtle: {
      name: 'Zen',
      personality: 'Calm, steady, mindful',
      avatar: '🐢',
      color: 'from-green-500 to-teal-500'
    },
    eagle: {
      name: 'Precision',
      personality: 'Focused, strategic, goal-oriented',
      avatar: '🦅',
      color: 'from-blue-500 to-cyan-500'
    },
    bear: {
      name: 'Titan',
      personality: 'Strong, powerful, endurance-focused',
      avatar: '🐻',
      color: 'from-purple-500 to-indigo-500'
    }
  };

  const currentCoach = aiPersonalities[state.user?.spiritAnimal || 'cheetah'];

  useEffect(() => {
    if (isVisible) {
      // Initialize AI service
      const service = new GeminiAIService();
      setAiService(service);
      
      // Add welcome message
      setMessages([{
        type: 'ai',
        content: `🚀 AI Coach ${currentCoach.name} is now online! I'm powered by advanced AI and ready to help you dominate your fitness journey. What would you like to work on today?`,
        timestamp: new Date()
      }]);
    }
  }, [isVisible, currentCoach.name]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || !aiService || isLoading) return;

    const userMessage = {
      type: 'user' as const,
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);

    try {
      const context = {
        biometrics: {
          heartRate: 75 + Math.random() * 20,
          calories: Math.random() * 100,
          steps: Math.random() * 1000,
          stress: Math.random() * 50,
          energy: 70 + Math.random() * 30,
          focus: 60 + Math.random() * 40,
          workoutIntensity: state.isWorkoutActive ? 60 + Math.random() * 40 : undefined,
          formAccuracy: state.isWorkoutActive ? 80 + Math.random() * 20 : undefined
        },
        workout: {
          currentExercise: state.currentWorkout?.exercises[state.currentExerciseIndex]?.name,
          exerciseType: state.currentWorkout?.exercises[state.currentExerciseIndex]?.skillType,
          duration: state.currentWorkout?.duration,
          difficulty: state.currentWorkout?.difficulty,
          userFitnessLevel: state.user?.fitnessLevel,
          goals: state.user?.goals,
          spiritAnimal: state.user?.spiritAnimal
        },
        userStats: state.userStats,
        mode: coachMode
      };

      console.log('Sending message to AI:', currentInput, context);
      const aiResponse = await aiService.sendMessage(currentInput, context);
      console.log('AI Response received:', aiResponse);

      const aiMessage = {
        type: 'ai' as const,
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI response error:', error);
      const errorMessage = {
        type: 'ai' as const,
        content: "🔥 I'm having trouble connecting right now, but I'm still here to support you! Let's keep pushing forward! 💪",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      // Fallback for demo
      setTimeout(() => {
        setUserInput("How can I improve my workout performance?");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleQuickAction = async (action: string) => {
    if (!aiService) return;

    const quickActions = {
      'analyze': 'Analyze my current performance and biometrics',
      'motivate': 'Give me high-energy motivation for my workout!',
      'optimize': 'How can I optimize my training for better results?',
      'predict': 'Predict my performance and suggest optimal training times',
      'form': 'Check my exercise form and provide feedback',
      'recovery': 'Analyze my recovery and suggest improvements'
    };

    const message = quickActions[action as keyof typeof quickActions];
    if (message) {
      setUserInput(message);
      // Auto-send the message
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      className="fixed bottom-4 right-4 z-50 w-96"
    >
      <InteractiveCard className="p-6 bg-black/95 border-cyan-500/50 backdrop-blur-xl" glowEffect>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              className={`w-14 h-14 bg-gradient-to-r ${currentCoach.color} rounded-full flex items-center justify-center text-2xl relative`}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentCoach.avatar}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h3 className="font-bold text-white">{currentCoach.name}</h3>
              <p className="text-xs text-gray-400">AI Coach • Powered by Gemini</p>
              <div className="flex items-center space-x-1 mt-1">
                <Brain className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-cyan-400">Neural Mode Active</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex space-x-2 mb-4">
          {[
            { id: 'chat', label: 'Chat', icon: MessageCircle },
            { id: 'analysis', label: 'Analysis', icon: TrendingUp },
            { id: 'motivation', label: 'Boost', icon: Zap }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setCoachMode(mode.id as any)}
              className={`flex-1 flex items-center justify-center space-x-1 p-2 rounded-lg text-xs transition-all ${
                coachMode === mode.id 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              <mode.icon className="w-3 h-3" />
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="max-h-48 overflow-y-auto mb-4 space-y-2">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: message.type === 'ai' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3 rounded-lg text-sm ${
                message.type === 'ai' 
                  ? 'bg-gray-800/50 text-gray-300 border-l-2 border-cyan-500' 
                  : 'bg-cyan-500/20 text-cyan-300 ml-8 border-l-2 border-cyan-400'
              }`}
            >
              {message.content}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-gray-800/50 text-gray-300 border-l-2 border-cyan-500 rounded-lg text-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span>AI is thinking...</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder="Ask your AI coach anything..."
            className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50"
            disabled={isLoading}
          />
          <button
            onClick={handleVoiceInput}
            className={`p-2 rounded-lg transition-all ${
              isListening 
                ? 'bg-red-500/20 text-red-400 animate-pulse' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'analyze', label: 'Analyze', icon: TrendingUp },
            { id: 'motivate', label: 'Motivate', icon: Zap },
            { id: 'optimize', label: 'Optimize', icon: Target },
            { id: 'form', label: 'Form Check', icon: Camera },
            { id: 'recovery', label: 'Recovery', icon: Heart },
            { id: 'predict', label: 'Predict', icon: Bot }
          ].map((action) => (
            <motion.button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="flex flex-col items-center space-y-1 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors text-xs text-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              <action.icon className="w-4 h-4" />
              <span>{action.label}</span>
            </motion.button>
          ))}
        </div>
      </InteractiveCard>
    </motion.div>
  );
}