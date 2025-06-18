import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Brain, Eye, Zap, TrendingUp, Target, AlertCircle, Cpu, BarChart3 } from 'lucide-react';
import { InteractiveCard } from '../common/InteractiveCard';
import { useApp } from '../../contexts/AppContext';
import GeminiAIService from '../../services/geminiAI';

export function AITracker() {
  const { state } = useApp();
  const [biometrics, setBiometrics] = useState({
    heartRate: 72,
    calories: 0,
    steps: 0,
    stress: 25,
    energy: 85,
    focus: 78,
    recovery: 92,
    form: 88
  });

  const [realTimeData, setRealTimeData] = useState({
    reps: 0,
    sets: 0,
    currentExercise: 'Rest',
    intensity: 0,
    formAccuracy: 100
  });

  const [aiInsights, setAiInsights] = useState([
    "🧠 Neural pattern analysis shows optimal focus window in 15 minutes",
    "💪 Muscle activation is 15% higher than last session",
    "⚡ Energy levels suggest you can push 10% harder today",
    "🎯 Form consistency improved by 23% this week"
  ]);

  const [aiService, setAiService] = useState<GeminiAIService | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Initialize AI service if API key exists
    const apiKey = localStorage.getItem('gemini_api_key');
    if (apiKey) {
      setAiService(new GeminiAIService(apiKey));
    }
  }, []);

  useEffect(() => {
    // Simulate real-time biometric updates
    const interval = setInterval(() => {
      setBiometrics(prev => ({
        ...prev,
        heartRate: Math.max(60, Math.min(180, prev.heartRate + (Math.random() - 0.5) * 8)),
        calories: prev.calories + Math.random() * 2,
        steps: prev.steps + Math.floor(Math.random() * 3),
        stress: Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 5)),
        energy: Math.max(0, Math.min(100, prev.energy + (Math.random() - 0.5) * 3)),
        focus: Math.max(0, Math.min(100, prev.focus + (Math.random() - 0.5) * 4))
      }));

      if (state.isWorkoutActive) {
        setRealTimeData(prev => ({
          ...prev,
          intensity: Math.max(0, Math.min(100, prev.intensity + (Math.random() - 0.5) * 10)),
          formAccuracy: Math.max(70, Math.min(100, prev.formAccuracy + (Math.random() - 0.5) * 5)),
          reps: prev.reps + (Math.random() > 0.7 ? 1 : 0)
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isWorkoutActive]);

  useEffect(() => {
    // Generate AI insights every 30 seconds
    if (aiService) {
      const insightInterval = setInterval(async () => {
        setIsAnalyzing(true);
        try {
          const insight = await aiService.provideBiometricInsights(biometrics);
          setAiInsights(prev => [insight, ...prev.slice(0, 3)]);
        } catch (error) {
          console.error('AI insight error:', error);
        } finally {
          setIsAnalyzing(false);
        }
      }, 30000);

      return () => clearInterval(insightInterval);
    }
  }, [aiService, biometrics]);

  const getHeartRateZone = (hr: number) => {
    if (hr < 100) return { zone: 'Rest', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (hr < 120) return { zone: 'Fat Burn', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (hr < 140) return { zone: 'Cardio', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (hr < 160) return { zone: 'Peak', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    return { zone: 'Max', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const hrZone = getHeartRateZone(biometrics.heartRate);

  const generateAIRecommendation = async () => {
    if (!aiService) return;
    
    setIsAnalyzing(true);
    try {
      const recommendation = await aiService.sendMessage(
        "Based on my current biometrics and workout data, what specific recommendations do you have for optimizing my performance right now?",
        {
          biometrics,
          workout: {
            currentExercise: state.currentWorkout?.exercises[state.currentExerciseIndex]?.name,
            exerciseType: state.currentWorkout?.exercises[state.currentExerciseIndex]?.skillType,
            userFitnessLevel: state.user?.fitnessLevel
          },
          userStats: state.userStats,
          mode: 'analysis'
        }
      );
      
      setAiInsights(prev => [`🤖 AI Recommendation: ${recommendation}`, ...prev.slice(0, 2)]);
    } catch (error) {
      console.error('AI recommendation error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Biometrics */}
      <InteractiveCard className="p-6 bg-white/[0.02] border-white/[0.05]" glowEffect>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-light text-white">AI Biometric Tracker</h3>
            <p className="text-white/60 text-sm font-light">Real-time health monitoring with AI insights</p>
          </div>
          {aiService && (
            <motion.button
              onClick={generateAIRecommendation}
              disabled={isAnalyzing}
              className="ml-auto p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Cpu className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            className={`p-4 rounded-xl ${hrZone.bg} border border-white/10`}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Heart className={`w-5 h-5 ${hrZone.color}`} />
              <span className="text-white/80 text-sm font-light">Heart Rate</span>
            </div>
            <div className={`text-2xl font-light ${hrZone.color}`}>
              {Math.round(biometrics.heartRate)}
            </div>
            <div className="text-xs text-white/60 font-light">{hrZone.zone} Zone</div>
          </motion.div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-white/80 text-sm font-light">Calories</span>
            </div>
            <div className="text-2xl font-light text-orange-400">
              {Math.round(biometrics.calories)}
            </div>
            <div className="text-xs text-white/60 font-light">kcal burned</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-white/80 text-sm font-light">Energy</span>
            </div>
            <div className="text-2xl font-light text-green-400">
              {Math.round(biometrics.energy)}%
            </div>
            <div className="text-xs text-white/60 font-light">optimal level</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span className="text-white/80 text-sm font-light">Focus</span>
            </div>
            <div className="text-2xl font-light text-cyan-400">
              {Math.round(biometrics.focus)}%
            </div>
            <div className="text-xs text-white/60 font-light">concentration</div>
          </div>
        </div>

        {/* Workout Tracking */}
        {state.isWorkoutActive && (
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
            <h4 className="text-white font-light mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-cyan-400" />
              Live Workout Analysis
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-light text-white">{realTimeData.reps}</div>
                <div className="text-xs text-white/60 font-light">Reps Detected</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-light text-white">{realTimeData.intensity}%</div>
                <div className="text-xs text-white/60 font-light">Intensity</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-light text-white">{Math.round(realTimeData.formAccuracy)}%</div>
                <div className="text-xs text-white/60 font-light">Form Score</div>
              </div>
            </div>
          </div>
        )}
      </InteractiveCard>

      {/* AI Insights */}
      <InteractiveCard className="p-6 bg-white/[0.02] border-white/[0.05]" glowEffect>
        <h3 className="text-xl font-light text-white mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-cyan-400" />
          AI Performance Insights
          {isAnalyzing && (
            <motion.div
              className="ml-2 w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </h3>
        <div className="space-y-3">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-white/[0.02] border border-white/10 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm font-light">{insight}</span>
            </motion.div>
          ))}
        </div>
      </InteractiveCard>

      {/* Performance Metrics */}
      <InteractiveCard className="p-6 bg-white/[0.02] border-white/[0.05]" glowEffect>
        <h3 className="text-xl font-light text-white mb-4 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3 text-cyan-400" />
          Performance Analytics
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/80 font-light">Workout Intensity</span>
              <span className="text-white/60 font-light">{realTimeData.intensity}%</span>
            </div>
            <div className="w-full bg-white/[0.05] rounded-full h-2">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${realTimeData.intensity}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/80 font-light">Form Accuracy</span>
              <span className="text-white/60 font-light">{Math.round(realTimeData.formAccuracy)}%</span>
            </div>
            <div className="w-full bg-white/[0.05] rounded-full h-2">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${realTimeData.formAccuracy}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
      </InteractiveCard>

      {/* Recovery Analysis */}
      <InteractiveCard className="p-6 bg-white/[0.02] border-white/[0.05]" glowEffect>
        <h3 className="text-xl font-light text-white mb-4">Recovery Analysis</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/80 font-light">Muscle Recovery</span>
              <span className="text-white/60 font-light">{biometrics.recovery}%</span>
            </div>
            <div className="w-full bg-white/[0.05] rounded-full h-2">
              <motion.div
                className="h-full bg-green-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${biometrics.recovery}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/80 font-light">Stress Level</span>
              <span className="text-white/60 font-light">{Math.round(biometrics.stress)}%</span>
            </div>
            <div className="w-full bg-white/[0.05] rounded-full h-2">
              <motion.div
                className="h-full bg-orange-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${biometrics.stress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
      </InteractiveCard>
    </div>
  );
}