import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Target, Zap, Trophy, Star, Play, Pause, RotateCcw, Users, Crown, Flame } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { InteractiveWorkout } from './InteractiveWorkout';
import { useApp } from '../../contexts/AppContext';
import { exercises } from '../../data/workouts';
import { FloatingLogo } from '../effects/FloatingLogo';

export function FitnessGames() {
  const { state, dispatch } = useApp();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'solo' | 'multiplayer' | 'challenges'>('solo');

  const soloGames = [
    {
      id: 'squat-challenge',
      name: 'Squat Challenge',
      description: 'Hit targets by doing squats in rhythm',
      icon: '🏋️‍♀️',
      difficulty: 'Medium',
      duration: '3 min',
      calories: 45,
      color: 'from-white/10 to-white/5',
      exerciseId: '2',
      players: 1,
      type: 'solo'
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
      exerciseId: '1',
      players: 1,
      type: 'solo'
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
      exerciseId: '4',
      players: 1,
      type: 'solo'
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
      exerciseId: '5',
      players: 1,
      type: 'solo'
    },
    {
      id: 'yoga-flow',
      name: 'Zen Flow Master',
      description: 'Follow the flowing patterns with yoga poses',
      icon: '🕉️',
      difficulty: 'Medium',
      duration: '8 min',
      calories: 60,
      color: 'from-white/10 to-white/5',
      exerciseId: '3',
      players: 1,
      type: 'solo'
    },
    {
      id: 'hiit-blaster',
      name: 'HIIT Blaster',
      description: 'Explosive intervals that push your limits',
      icon: '💥',
      difficulty: 'Extreme',
      duration: '10 min',
      calories: 150,
      color: 'from-white/10 to-white/5',
      exerciseId: '6',
      players: 1,
      type: 'solo'
    }
  ];

  const multiplayerGames = [
    {
      id: 'squad-battle',
      name: 'Squad Battle Royale',
      description: 'Team up with friends for epic fitness battles',
      icon: '⚔️',
      difficulty: 'Hard',
      duration: '15 min',
      calories: 200,
      players: '2-8',
      type: 'multiplayer',
      status: 'live'
    },
    {
      id: 'fitness-race',
      name: 'Fitness Race',
      description: 'Race against others in real-time workouts',
      icon: '🏁',
      difficulty: 'Medium',
      duration: '10 min',
      calories: 120,
      players: '2-20',
      type: 'multiplayer',
      status: 'waiting'
    },
    {
      id: 'dance-off',
      name: 'Dance Battle',
      description: 'Show your moves in epic dance competitions',
      icon: '💃',
      difficulty: 'Easy',
      duration: '5 min',
      calories: 80,
      players: '2-10',
      type: 'multiplayer',
      status: 'live'
    }
  ];

  const challenges = [
    {
      id: 'daily-grind',
      name: 'Daily Grind',
      description: 'Complete 5 different exercises today',
      icon: '📅',
      progress: 60,
      reward: '100 XP + 50 Coins',
      timeLeft: '8h 23m',
      type: 'daily'
    },
    {
      id: 'weekly-warrior',
      name: 'Weekly Warrior',
      description: 'Burn 2000 calories this week',
      icon: '🔥',
      progress: 75,
      reward: '500 XP + 200 Coins',
      timeLeft: '2d 14h',
      type: 'weekly'
    },
    {
      id: 'monthly-legend',
      name: 'Monthly Legend',
      description: 'Complete 50 workouts this month',
      icon: '👑',
      progress: 40,
      reward: '2000 XP + 1000 Coins + Legendary Badge',
      timeLeft: '12d 6h',
      type: 'monthly'
    }
  ];

  const handleStartGame = (gameId: string) => {
    const game = [...soloGames, ...multiplayerGames].find(g => g.id === gameId);
    if (game && game.exerciseId) {
      setSelectedGame(gameId);
    } else if (game?.type === 'multiplayer') {
      // Handle multiplayer game logic
      dispatch({ type: 'UPDATE_STATS', payload: {
        xp: state.userStats.xp + 75,
        coins: state.userStats.coins + 35
      }});
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
    const game = soloGames.find(g => g.id === selectedGame);
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

  const renderSoloGames = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {soloGames.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard 
            className="p-6 relative overflow-hidden bg-white/[0.02] border-white/[0.05]"
            hoverScale={1.02}
            glowEffect
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {game.icon}
                </motion.div>
                <div className={`px-3 py-1 rounded-full text-xs font-light ${
                  game.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  game.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  game.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {game.difficulty}
                </div>
              </div>

              <h3 className="text-xl font-light text-white mb-2">{game.name}</h3>
              <p className="text-white/60 text-sm font-light mb-4">{game.description}</p>

              <div className="flex items-center space-x-4 text-sm text-white/60 mb-6">
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span className="font-light">{game.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4" />
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
  );

  const renderMultiplayerGames = () => (
    <div className="space-y-6">
      {multiplayerGames.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard className="p-6 bg-white/[0.02] border-white/[0.05]" glowEffect>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl"
                  whileHover={{ scale: 1.1 }}
                >
                  {game.icon}
                </motion.div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-light text-white">{game.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-light ${
                      game.status === 'live' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {game.status === 'live' ? 'LIVE' : 'WAITING'}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm font-light mb-2">{game.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span className="font-light">{game.players} players</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span className="font-light">{game.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Flame className="w-4 h-4" />
                      <span className="font-light">{game.calories} cal</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleStartGame(game.id)}
                variant={game.status === 'live' ? 'primary' : 'outline'}
                className="flex items-center space-x-2 font-light"
              >
                <Play className="w-4 h-4" />
                <span>{game.status === 'live' ? 'Join Now' : 'Join Queue'}</span>
              </Button>
            </div>
          </InteractiveCard>
        </motion.div>
      ))}
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      {challenges.map((challenge, index) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard className="p-6 bg-white/[0.02] border-white/[0.05]" glowEffect>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">
                  {challenge.icon}
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-1">{challenge.name}</h3>
                  <p className="text-white/60 text-sm font-light">{challenge.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/60 text-sm font-light">Time Left</div>
                <div className="text-white font-light">{challenge.timeLeft}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/80 font-light">Progress</span>
                <span className="text-white/60 font-light">{challenge.progress}%</span>
              </div>
              <div className="w-full bg-white/[0.05] rounded-full h-2">
                <motion.div
                  className="h-full bg-white/20 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${challenge.progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-white/60 text-sm font-light">
                Reward: {challenge.reward}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="font-light"
              >
                View Details
              </Button>
            </div>
          </InteractiveCard>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingLogo />
      
      <div className="relative z-10 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
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

          {/* Tabs */}
          <div className="flex space-x-2 mb-8">
            {[
              { id: 'solo', label: 'Solo Games', icon: Target },
              { id: 'multiplayer', label: 'Multiplayer', icon: Users },
              { id: 'challenges', label: 'Challenges', icon: Trophy }
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                className="flex-1 flex items-center justify-center space-x-2 font-light"
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'solo' && renderSoloGames()}
            {activeTab === 'multiplayer' && renderMultiplayerGames()}
            {activeTab === 'challenges' && renderChallenges()}
          </motion.div>

          {/* Leaderboard */}
          <InteractiveCard className="p-8 mt-12 bg-white/[0.02] border-white/[0.05]" glowEffect>
            <h3 className="text-2xl font-light text-white mb-6 flex items-center">
              <Crown className="w-6 h-6 mr-3 text-white/60" />
              Today's Gaming Champions
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Alex', score: 2450, game: 'Squat Challenge', avatar: '🏆' },
                { name: 'Sarah', score: 2200, game: 'Punch Master', avatar: '🥈' },
                { name: 'Mike', score: 1980, game: 'Cardio Runner', avatar: '🥉' },
                { name: 'You', score: state.userStats.xp || 1750, game: 'Balance Beam', avatar: '🎮' }
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
                  <div className="text-2xl">{player.avatar}</div>
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