import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Target, Zap, Trophy, Star, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { InteractiveWorkout } from './InteractiveWorkout';
import { useApp } from '../../contexts/AppContext';
import { exercises } from '../../data/workouts';

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
      color: 'from-cyan-500 to-purple-500',
      exerciseId: '2' // Maps to Galactic Squats
    },
    {
      id: 'punch-master',
      name: 'Punch Master',
      description: 'Throw punches to defeat cyber enemies',
      icon: '👊',
      difficulty: 'Hard',
      duration: '5 min',
      calories: 80,
      color: 'from-red-500 to-orange-500',
      exerciseId: '1' // Maps to Cosmic Push-ups
    },
    {
      id: 'balance-beam',
      name: 'Balance Beam',
      description: 'Navigate through digital obstacles with balance poses',
      icon: '🧘‍♀️',
      difficulty: 'Easy',
      duration: '4 min',
      calories: 35,
      color: 'from-green-500 to-emerald-500',
      exerciseId: '4' // Maps to Stellar Plank
    },
    {
      id: 'cardio-runner',
      name: 'Cardio Runner',
      description: 'Run in place to escape the digital void',
      icon: '🏃‍♂️',
      difficulty: 'Hard',
      duration: '6 min',
      calories: 120,
      color: 'from-blue-500 to-cyan-500',
      exerciseId: '5' // Maps to Solar Jumping Jacks
    }
  ];

  const handleStartGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      setSelectedGame(gameId);
    }
  };

  const handleGameComplete = (score: number) => {
    // Award XP and coins based on score
    const xpEarned = Math.floor(score / 100);
    const coinsEarned = Math.floor(score / 200);
    
    dispatch({ type: 'UPDATE_STATS', payload: {
      xp: state.userStats.xp + xpEarned,
      coins: state.userStats.coins + coinsEarned,
      totalWorkouts: state.userStats.totalWorkouts + 1
    }});
    
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
          onSkip={() => setSelectedGame(null)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Gamepad2 className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Fitness Games</h1>
          <p className="text-gray-300">Turn your workout into an epic gaming adventure</p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InteractiveCard 
                className="p-6 relative overflow-hidden bg-gray-800/30 border-gray-600/30"
                hoverScale={1.03}
                glowEffect
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {game.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{game.name}</h3>
                        <p className="text-gray-300 text-sm">{game.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{game.difficulty}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-4 h-4" />
                      <span>{game.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>{game.calories} cal</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleStartGame(game.id)}
                    variant="cosmic"
                    className="w-full flex items-center justify-center space-x-2"
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
        <InteractiveCard className="p-6 mt-8 bg-gray-800/30 border-gray-600/30" glowEffect>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-cyan-400" />
            Today's Leaderboard
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Alex', score: 2450, game: 'Squat Challenge' },
              { name: 'Sarah', score: 2200, game: 'Punch Master' },
              { name: 'Mike', score: 1980, game: 'Cardio Runner' },
              { name: 'You', score: 1750, game: 'Balance Beam' }
            ].map((player, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-4 p-3 rounded-lg ${
                  player.name === 'You' ? 'bg-cyan-500/20 border border-cyan-400/30' : 'bg-gray-800/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-500' :
                  'bg-gray-600'
                } text-white`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white">{player.name}</div>
                  <div className="text-sm text-gray-400">{player.game}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{player.score.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">points</div>
                </div>
              </motion.div>
            ))}
          </div>
        </InteractiveCard>
      </motion.div>
    </div>
  );
}