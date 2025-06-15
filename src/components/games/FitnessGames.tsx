import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Target, Zap, Trophy, Star, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { InteractiveWorkout } from './InteractiveWorkout';
import { useApp } from '../../contexts/AppContext';
import { exercises } from '../../data/workouts';
import { FloatingLogo } from '../effects/FloatingLogo';

export function FitnessGames() {
  const { state, dispatch } = useApp();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'squat-challenge',
      name: 'Squat Challenge',
      description: 'Hit targets by doing squats in rhythm',
      icon: '🏋️‍♀️',
      difficulty: 'Medium',
      duration: '3 min',
      calories: 45,
      color: 'from-white/10 to-white/5',
      exerciseId: '2'
    },
    {
      id: 'punch-master',
      name: 'Punch Master',
      description: 'Throw punches to defeat cyber enemies',
      icon: '👊',
      difficulty: 'Hard',
      duration: '5 min',
      calories: 80,
      color: 'from-white/10 to-white/5',
      exerciseId: '1'
    },
    {
      id: 'balance-beam',
      name: 'Balance Beam',
      description: 'Navigate through digital obstacles with balance poses',
      icon: '🧘‍♀️',
      difficulty: 'Easy',
      duration: '4 min',
      calories: 35,
      color: 'from-white/10 to-white/5',
      exerciseId: '4'
    },
    {
      id: 'cardio-runner',
      name: 'Cardio Runner',
      description: 'Run in place to escape the digital void',
      icon: '🏃‍♂️',
      difficulty: 'Hard',
      duration: '6 min',
      calories: 120,
      color: 'from-white/10 to-white/5',
      exerciseId: '5'
    }
  ];

  const handleStartGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      setSelectedGame(gameId);
    }
  };

  const handleGameComplete = (score: number) => {
    const xpEarned = Math.floor(score / 100) || 50;
    const coinsEarned = Math.floor(score / 200) || 25;
    
    dispatch({ type: 'UPDATE_STATS', payload: {
      xp: state.userStats.xp + xpEarned,
      coins: state.userStats.coins + coinsEarned,
      totalWorkouts: state.userStats.totalWorkouts + 1
    }});
    
    setSelectedGame(null);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    const exercise = exercises.find(e => e.id === game?.exerciseId);
    
    if (exercise) {
      return (
        <InteractiveWorkout
          exercise={exercise}
          onComplete={handleGameComplete}
          onSkip={handleBackToGames}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingLogo />
      
      <div className="relative z-10 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <Gamepad2 className="w-10 h-10 text-black" />
            </motion.div>
            <h1 className="text-6xl font-light text-white mb-4">Fitness Games</h1>
            <p className="text-white/60 font-light text-xl">Turn your workout into an epic gaming adventure</p>
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InteractiveCard 
                  className="p-8 relative overflow-hidden bg-white/[0.02] border-white/[0.05]"
                  hoverScale={1.02}
                  glowEffect
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          {game.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-light text-white mb-2">{game.name}</h3>
                          <p className="text-white/60 text-sm font-light">{game.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-white/60 mb-6">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span className="font-light">{game.difficulty}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-light">{game.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4" />
                        <span className="font-light">{game.calories} cal</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleStartGame(game.id)}
                      variant="primary"
                      className="w-full flex items-center justify-center space-x-2 font-light"
                      glowEffect
                    >
                      <Play className="w-4 h-4" />
                      <span>Start Game</span>
                    </Button>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>

          {/* Leaderboard */}
          <InteractiveCard className="p-8 bg-white/[0.02] border-white/[0.05]" glowEffect>
            <h3 className="text-2xl font-light text-white mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-white/60" />
              Today's Leaderboard
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Alex', score: 2450, game: 'Squat Challenge' },
                { name: 'Sarah', score: 2200, game: 'Punch Master' },
                { name: 'Mike', score: 1980, game: 'Cardio Runner' },
                { name: 'You', score: state.userStats.xp || 1750, game: 'Balance Beam' }
              ].map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl ${
                    player.name === 'You' ? 'bg-white/[0.05] border border-white/10' : 'bg-white/[0.02]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-light ${
                    index === 0 ? 'bg-white text-black' :
                    index === 1 ? 'bg-white/20 text-white' :
                    index === 2 ? 'bg-white/15 text-white' :
                    'bg-white/10 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-light text-white">{player.name}</div>
                    <div className="text-sm text-white/60 font-light">{player.game}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-light text-white">{player.score.toLocaleString()}</div>
                    <div className="text-xs text-white/60 font-light">points</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </InteractiveCard>
        </motion.div>
      </div>
    </div>
  );
}