import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Target, Zap, Trophy, Star, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { useApp } from '../../contexts/AppContext';

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
      color: 'from-cyan-500 to-purple-500'
    },
    {
      id: 'punch-master',
      name: 'Punch Master',
      description: 'Throw punches to defeat cyber enemies',
      icon: '👊',
      difficulty: 'Hard',
      duration: '5 min',
      calories: 80,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'balance-beam',
      name: 'Balance Beam',
      description: 'Navigate through digital obstacles with balance poses',
      icon: '🧘‍♀️',
      difficulty: 'Easy',
      duration: '4 min',
      calories: 35,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'cardio-runner',
      name: 'Cardio Runner',
      description: 'Run in place to escape the digital void',
      icon: '🏃‍♂️',
      difficulty: 'Hard',
      duration: '6 min',
      calories: 120,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  if (selectedGame) {
    return <GameSession gameId={selectedGame} onExit={() => setSelectedGame(null)} />;
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
                    onClick={() => setSelectedGame(game.id)}
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

function GameSession({ gameId, onExit }: { gameId: string; onExit: () => void }) {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'paused' | 'finished'>('ready');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; hit: boolean }>>([]);

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      const targetInterval = setInterval(() => {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
          hit: false
        };
        setTargets(prev => [...prev.slice(-4), newTarget]);
      }, 2000);

      return () => clearInterval(targetInterval);
    }
  }, [gameState]);

  const handleTargetHit = (targetId: number) => {
    setTargets(prev => prev.map(t => t.id === targetId ? { ...t, hit: true } : t));
    setScore(prev => prev + 100);
    setTimeout(() => {
      setTargets(prev => prev.filter(t => t.id !== targetId));
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Game UI */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between">
          <Button onClick={onExit} variant="ghost" size="sm">
            ← Exit Game
          </Button>
          <div className="flex items-center space-x-6 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">{score.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-400">Time</div>
            </div>
          </div>
          <div className="flex space-x-2">
            {gameState === 'playing' && (
              <Button onClick={() => setGameState('paused')} variant="ghost" size="sm">
                <Pause className="w-4 h-4" />
              </Button>
            )}
            <Button onClick={() => {
              setGameState('ready');
              setScore(0);
              setTimeLeft(180);
              setTargets([]);
            }} variant="ghost" size="sm">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-screen">
        <AnimatePresence>
          {targets.map((target) => (
            <motion.button
              key={target.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: target.hit ? 0 : 1, opacity: target.hit ? 0 : 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                target.hit 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:scale-110'
              }`}
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              onClick={() => handleTargetHit(target.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {target.hit ? '✓' : '🎯'}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Game States */}
      <AnimatePresence>
        {gameState === 'ready' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-30"
          >
            <InteractiveCard className="p-8 text-center max-w-md bg-gray-800/50 border-cyan-500/30" glowEffect>
              <h2 className="text-3xl font-bold text-white mb-4">Squat Challenge</h2>
              <p className="text-gray-300 mb-6">
                Hit the targets by doing squats! Each squat counts as a hit. 
                The faster you squat, the higher your score!
              </p>
              <Button
                onClick={() => setGameState('playing')}
                variant="cosmic"
                size="lg"
                className="w-full"
                glowEffect
              >
                Start Game
              </Button>
            </InteractiveCard>
          </motion.div>
        )}

        {gameState === 'paused' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-30"
          >
            <InteractiveCard className="p-8 text-center bg-gray-800/50 border-cyan-500/30" glowEffect>
              <h2 className="text-2xl font-bold text-white mb-4">Game Paused</h2>
              <div className="flex space-x-4">
                <Button
                  onClick={() => setGameState('playing')}
                  variant="cosmic"
                  className="flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Resume</span>
                </Button>
                <Button onClick={onExit} variant="outline">
                  Exit Game
                </Button>
              </div>
            </InteractiveCard>
          </motion.div>
        )}

        {gameState === 'finished' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-30"
          >
            <InteractiveCard className="p-8 text-center max-w-md bg-gray-800/50 border-cyan-500/30" glowEffect>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Game Complete!</h2>
              <div className="text-4xl font-bold text-cyan-400 mb-4">{score.toLocaleString()}</div>
              <p className="text-gray-300 mb-6">
                Amazing work! You've earned 50 XP and 25 coins for completing this challenge.
              </p>
              <div className="flex space-x-4">
                <Button
                  onClick={() => {
                    setGameState('ready');
                    setScore(0);
                    setTimeLeft(180);
                    setTargets([]);
                  }}
                  variant="cosmic"
                >
                  Play Again
                </Button>
                <Button onClick={onExit} variant="outline">
                  Exit
                </Button>
              </div>
            </InteractiveCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {gameState === 'playing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl px-6 py-3 border border-cyan-500/30">
            <p className="text-white text-center">
              Do a squat to hit the targets! 🏋️‍♀️
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}