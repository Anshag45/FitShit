import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Trophy, Timer, Heart, ArrowLeft, Cpu } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { WorkoutVisualization } from '../3d/WorkoutVisualization';
import { ParticleSystem } from '../effects/ParticleSystem';
import GeminiAIService from '../../services/geminiAI';

interface InteractiveWorkoutProps {
  exercise: any;
  onComplete: (score: number) => void;
  onSkip: () => void;
}

export function InteractiveWorkout({ exercise, onComplete, onSkip }: InteractiveWorkoutProps) {
  const [gameState, setGameState] = useState<'ready' | 'active' | 'complete'>('ready');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercise.duration || 60);
  const [repsCompleted, setRepsCompleted] = useState(0);
  const [heartRate, setHeartRate] = useState(75);
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; hit: boolean }>>([]);
  const [combo, setCombo] = useState(0);
  const [showMotivation, setShowMotivation] = useState(false);
  const [aiMotivation, setAiMotivation] = useState('');
  const [aiService, setAiService] = useState<GeminiAIService | null>(null);

  const motivationalPhrases = [
    "PERFECT FORM! 🔥",
    "UNSTOPPABLE! ⚡",
    "BEAST MODE! 💪",
    "LEGENDARY! 👑",
    "CRUSHING IT! 🚀"
  ];

  useEffect(() => {
    try {
      setAiService(new GeminiAIService());
    } catch (error) {
      console.log('AI service not available, using fallback motivation');
    }
  }, []);

  useEffect(() => {
    if (gameState === 'active') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('complete');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const targetSpawner = setInterval(() => {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * 70 + 15,
          y: Math.random() * 50 + 25,
          hit: false
        };
        setTargets(prev => [...prev.slice(-3), newTarget]);
        
        setTimeout(() => {
          setTargets(prev => prev.filter(t => t.id !== newTarget.id));
        }, 4000);
      }, 2000);

      const heartRateSimulator = setInterval(() => {
        setHeartRate(prev => {
          const variation = (Math.random() - 0.5) * 10;
          return Math.max(60, Math.min(180, prev + variation));
        });
      }, 1000);

      const motivationInterval = setInterval(async () => {
        if (aiService) {
          try {
            const motivation = await aiService.generateMotivation({
              currentExercise: exercise.name,
              exerciseType: exercise.skillType,
              difficulty: exercise.difficulty
            });
            setAiMotivation(motivation);
            setShowMotivation(true);
            setTimeout(() => setShowMotivation(false), 3000);
          } catch (error) {
            console.error('AI motivation error:', error);
            const fallbackMotivation = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
            setAiMotivation(fallbackMotivation);
            setShowMotivation(true);
            setTimeout(() => setShowMotivation(false), 2000);
          }
        }
      }, 30000);

      return () => {
        clearInterval(timer);
        clearInterval(targetSpawner);
        clearInterval(heartRateSimulator);
        clearInterval(motivationInterval);
      };
    }
  }, [gameState, aiService, exercise]);

  const handleTargetHit = async (targetId: number) => {
    setTargets(prev => prev.map(t => t.id === targetId ? { ...t, hit: true } : t));
    setRepsCompleted(prev => prev + 1);
    setCombo(prev => prev + 1);
    
    const baseScore = 100;
    const comboBonus = combo * 10;
    const timeBonus = timeLeft > (exercise.duration || 60) * 0.5 ? 50 : 0;
    const totalScore = baseScore + comboBonus + timeBonus;
    
    setScore(prev => prev + totalScore);
    
    if (aiService && combo > 0 && combo % 5 === 0) {
      try {
        const feedback = await aiService.sendMessage(
          `I just hit a ${combo} combo streak! Give me encouraging feedback!`,
          {
            mode: 'motivation',
            workout: { currentExercise: exercise.name }
          }
        );
        setAiMotivation(feedback);
      } catch (error) {
        console.error('AI feedback error:', error);
        setAiMotivation(`🔥 ${combo} COMBO! You're on fire! Keep it going! 💪`);
      }
    } else {
      setAiMotivation(motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]);
    }
    
    setShowMotivation(true);
    setTimeout(() => setShowMotivation(false), 1000);

    setTimeout(() => {
      setTargets(prev => prev.filter(t => t.id !== targetId));
    }, 500);
  };

  const handleStart = async () => {
    setGameState('active');
    setScore(0);
    setRepsCompleted(0);
    setCombo(0);
    setTimeLeft(exercise.duration || 60);

    if (aiService) {
      try {
        const startMotivation = await aiService.sendMessage(
          `I'm starting my ${exercise.name} workout! Give me an energizing start message!`,
          {
            mode: 'motivation',
            workout: { currentExercise: exercise.name, difficulty: exercise.difficulty }
          }
        );
        setAiMotivation(startMotivation);
        setShowMotivation(true);
        setTimeout(() => setShowMotivation(false), 3000);
      } catch (error) {
        console.error('AI start motivation error:', error);
        setAiMotivation("🚀 Let's crush this workout! You've got this, champion! 💪");
        setShowMotivation(true);
        setTimeout(() => setShowMotivation(false), 2000);
      }
    }
  };

  const handleComplete = async () => {
    const finalScore = score + (repsCompleted * 50) + (timeLeft * 10);
    
    if (aiService) {
      try {
        await aiService.sendMessage(
          `I completed my ${exercise.name} workout with ${repsCompleted} reps and scored ${finalScore} points! How did I do?`,
          {
            mode: 'analysis',
            workout: { currentExercise: exercise.name },
            biometrics: { 
              heartRate,
              formAccuracy: 85 + Math.random() * 15,
              workoutIntensity: 70 + Math.random() * 30
            }
          }
        );
      } catch (error) {
        console.error('AI completion feedback error:', error);
      }
    }
    
    onComplete(finalScore);
  };

  const progress = (((exercise.duration || 60) - timeLeft) / (exercise.duration || 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      <ParticleSystem count={500} color="#00d4ff" speed={gameState === 'active' ? 2 : 0.5} />
      
      <motion.button
        onClick={onSkip}
        className="fixed top-6 left-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </motion.button>
      
      {aiService && (
        <motion.div
          className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-white text-sm font-light">AI Coach Active</span>
        </motion.div>
      )}
      
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between">
          <InteractiveCard className="p-3 bg-gray-900/80 border-cyan-500/50" glowEffect>
            <div className="flex items-center space-x-4 text-white">
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">{score.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Score</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{repsCompleted}</div>
                <div className="text-xs text-gray-400">Reps</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-400">{combo}x</div>
                <div className="text-xs text-gray-400">Combo</div>
              </div>
            </div>
          </InteractiveCard>

          <InteractiveCard className="p-3 bg-gray-900/80 border-cyan-500/50" glowEffect>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="font-bold">{heartRate} BPM</span>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <WorkoutVisualization 
          exerciseName={exercise.name} 
          progress={progress} 
          isActive={gameState === 'active'} 
        />
      </div>

      <div className="absolute inset-0 z-15">
        <AnimatePresence>
          {targets.map((target) => (
            <motion.button
              key={target.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: target.hit ? 0 : 1, 
                opacity: target.hit ? 0 : 1,
                rotate: target.hit ? 360 : 0
              }}
              exit={{ scale: 0, opacity: 0 }}
              className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                target.hit 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:scale-110 shadow-lg shadow-cyan-500/50'
              }`}
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              onClick={() => handleTargetHit(target.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {target.hit ? '✓' : <Target className="w-6 h-6" />}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showMotivation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <div className="text-2xl font-bold text-cyan-400 text-center bg-gray-900/80 px-6 py-3 rounded-2xl border border-cyan-500/50 backdrop-blur-lg max-w-md">
              {aiMotivation || motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState === 'ready' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-40"
          >
            <InteractiveCard className="p-8 text-center max-w-md bg-gray-900/95 border-cyan-500/50" glowEffect>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                💪
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">{exercise.name}</h2>
              <p className="text-gray-300 mb-6">
                Hit the targets by performing the exercise! Each perfect rep increases your combo multiplier.
                {aiService && " Your AI coach will provide real-time motivation and feedback!"}
              </p>
              <div className="flex space-x-4">
                <Button
                  onClick={handleStart}
                  variant="cosmic"
                  size="lg"
                  className="flex-1"
                  glowEffect
                >
                  Start Training
                </Button>
                <Button
                  onClick={onSkip}
                  variant="outline"
                  size="lg"
                >
                  Skip
                </Button>
              </div>
            </InteractiveCard>
          </motion.div>
        )}

        {gameState === 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-40"
          >
            <InteractiveCard className="p-8 text-center max-w-md bg-gray-900/95 border-cyan-500/50" glowEffect>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Training Complete!</h2>
              <div className="text-4xl font-bold text-cyan-400 mb-4">{score.toLocaleString()}</div>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <div className="text-green-400 font-bold">{repsCompleted}</div>
                  <div className="text-gray-400">Perfect Reps</div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <div className="text-orange-400 font-bold">{combo}</div>
                  <div className="text-gray-400">Max Combo</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Outstanding performance! You've earned {Math.floor(score / 100) || 50} XP and {Math.floor(score / 200) || 25} coins.
                {aiService && " Your AI coach has analyzed your performance for future improvements!"}
              </p>
              <Button
                onClick={handleComplete}
                variant="legendary"
                size="lg"
                className="w-full"
                glowEffect
              >
                Continue Journey
              </Button>
            </InteractiveCard>
          </motion.div>
        )}
      </AnimatePresence>

      {gameState === 'active' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        >
          <InteractiveCard className="px-6 py-3 bg-gray-900/80 border-cyan-500/50" glowEffect>
            <p className="text-white text-center">
              Perform {exercise.name} and hit the targets! 🎯
              {aiService && " Your AI coach is watching! 🤖"}
            </p>
          </InteractiveCard>
        </motion.div>
      )}
    </div>
  );
}