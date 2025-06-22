import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Target, Zap, Trophy, Star, Play, Pause, RotateCcw, Users, Crown, Flame, ArrowLeft } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { InteractiveWorkout } from './InteractiveWorkout';
import { useApp } from '../../contexts/AppContext';
import { exercises } from '../../data/workouts';
import { FloatingLogo } from '../effects/FloatingLogo';

// Simple Fitness Games
function SquatCounter({ onComplete }: { onComplete: (score: number) => void }) {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted) {
      setIsActive(false);
      onComplete(count * 10);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, count, onComplete, gameStarted]);

  const handleSquat = () => {
    if (isActive) {
      setCount(prev => prev + 1);
    }
  };

  const startGame = () => {
    setIsActive(true);
    setGameStarted(true);
    setCount(0);
    setTimeLeft(60);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center p-4">
      <InteractiveCard className="p-8 max-w-md w-full text-center bg-black/50" glowEffect>
        <h2 className="text-3xl font-light text-white mb-6">Squat Challenge</h2>
        
        <div className="mb-8">
          <div className="text-6xl font-light text-cyan-400 mb-2">{count}</div>
          <div className="text-white/60 font-light">Squats</div>
        </div>

        <div className="mb-6">
          <div className="text-2xl font-light text-white mb-2">{timeLeft}s</div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-cyan-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {!gameStarted && (
            <Button onClick={startGame} variant="primary" size="lg" className="w-full">
              Start Challenge
            </Button>
          )}
          
          {isActive && (
            <Button onClick={handleSquat} variant="primary" size="lg" className="w-full">
              Squat! 💪
            </Button>
          )}

          {timeLeft === 0 && gameStarted && (
            <div className="text-center">
              <div className="text-green-400 font-light mb-4">Challenge Complete!</div>
              <div className="text-white/80 font-light">Score: {count * 10} points</div>
              <Button onClick={() => onComplete(count * 10)} variant="primary" className="mt-4">
                Continue
              </Button>
            </div>
          )}
        </div>
      </InteractiveCard>
    </div>
  );
}

function PunchingGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number }>>([]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted) {
      setIsActive(false);
      onComplete(score);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, score, onComplete, gameStarted]);

  React.useEffect(() => {
    if (isActive) {
      const targetInterval = setInterval(() => {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * 70 + 15,
          y: Math.random() * 50 + 25
        };
        setTargets(prev => [...prev.slice(-2), newTarget]);
        
        setTimeout(() => {
          setTargets(prev => prev.filter(t => t.id !== newTarget.id));
        }, 3000);
      }, 1500);

      return () => clearInterval(targetInterval);
    }
  }, [isActive]);

  const hitTarget = (targetId: number) => {
    setTargets(prev => prev.filter(t => t.id !== targetId));
    setScore(prev => prev + 50);
  };

  const startGame = () => {
    setIsActive(true);
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-orange-900 relative overflow-hidden">
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex justify-between text-white">
          <div>Score: {score}</div>
          <div>Time: {timeLeft}s</div>
        </div>
      </div>

      <AnimatePresence>
        {targets.map(target => (
          <motion.button
            key={target.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl hover:bg-red-400 transition-colors"
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
            onClick={() => hitTarget(target.id)}
          >
            🎯
          </motion.button>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <InteractiveCard className="p-4 bg-black/50">
          {!gameStarted && (
            <Button onClick={startGame} variant="primary">
              Start Punching!
            </Button>
          )}
          {timeLeft === 0 && gameStarted && (
            <div className="text-center text-white">
              <div>Game Over!</div>
              <div>Final Score: {score}</div>
              <Button onClick={() => onComplete(score)} variant="primary" className="mt-2">
                Continue
              </Button>
            </div>
          )}
        </InteractiveCard>
      </div>
    </div>
  );
}

function BalanceGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [balance, setBalance] = useState(50);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isActive, setIsActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setBalance(prev => {
          const change = (Math.random() - 0.5) * 8;
          const newBalance = Math.max(0, Math.min(100, prev + change));
          if (newBalance > 40 && newBalance < 60) {
            setScore(s => s + 5);
          }
          return newBalance;
        });
      }, 1000);
    } else if (timeLeft === 0 && gameStarted) {
      setIsActive(false);
      onComplete(score);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, score, onComplete, gameStarted]);

  const adjustBalance = (direction: 'left' | 'right') => {
    if (isActive) {
      setBalance(prev => {
        const adjustment = direction === 'left' ? -8 : 8;
        return Math.max(0, Math.min(100, prev + adjustment));
      });
    }
  };

  const startGame = () => {
    setIsActive(true);
    setGameStarted(true);
    setScore(0);
    setTimeLeft(45);
    setBalance(50);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-teal-900 flex items-center justify-center p-4">
      <InteractiveCard className="p-8 max-w-md w-full text-center bg-black/50" glowEffect>
        <h2 className="text-3xl font-light text-white mb-6">Balance Challenge</h2>
        
        <div className="mb-8">
          <div className="text-4xl font-light text-green-400 mb-2">{score}</div>
          <div className="text-white/60 font-light">Points</div>
        </div>

        <div className="mb-6">
          <div className="text-xl font-light text-white mb-2">{timeLeft}s</div>
          <div className="relative w-full h-4 bg-white/20 rounded-full mb-4">
            <div 
              className="absolute top-0 w-2 h-4 bg-cyan-400 rounded-full transition-all duration-300"
              style={{ left: `${balance}%`, transform: 'translateX(-50%)' }}
            />
            <div className="absolute top-0 left-1/2 w-1 h-4 bg-green-400 transform -translate-x-1/2" />
          </div>
          <div className="text-sm text-white/60 font-light">Keep the bar in the center!</div>
        </div>

        <div className="space-y-4">
          {!gameStarted && (
            <Button onClick={startGame} variant="primary" size="lg" className="w-full">
              Start Balance Challenge
            </Button>
          )}
          
          {isActive && (
            <div className="flex space-x-4">
              <Button onClick={() => adjustBalance('left')} variant="outline" className="flex-1">
                ← Left
              </Button>
              <Button onClick={() => adjustBalance('right')} variant="outline" className="flex-1">
                Right →
              </Button>
            </div>
          )}

          {timeLeft === 0 && gameStarted && (
            <div className="text-center">
              <div className="text-green-400 font-light mb-4">Challenge Complete!</div>
              <div className="text-white/80 font-light">Final Score: {score} points</div>
              <Button onClick={() => onComplete(score)} variant="primary" className="mt-4">
                Continue
              </Button>
            </div>
          )}
        </div>
      </InteractiveCard>
    </div>
  );
}

export function FitnessGames() {
  const { state, dispatch } = useApp();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'solo' | 'multiplayer' | 'challenges'>('solo');

  const soloGames = [
    {
      id: 'squat-challenge',
      name: 'Squat Challenge',
      description: 'Count your squats in 60 seconds',
      icon: '🏋️‍♀️',
      difficulty: 'Medium',
      duration: '1 min',
      calories: 45,
      color: 'from-white/10 to-white/5',
      type: 'simple',
      players: 1
    },
    {
      id: 'punch-master',
      name: 'Punch Master',
      description: 'Hit targets with punching motions',
      icon: '👊',
      difficulty: 'Hard',
      duration: '30 sec',
      calories: 80,
      color: 'from-white/10 to-white/5',
      type: 'simple',
      players: 1
    },
    {
      id: 'balance-beam',
      name: 'Balance Master',
      description: 'Keep your balance in the center',
      icon: '🧘‍♀️',
      difficulty: 'Easy',
      duration: '45 sec',
      calories: 35,
      color: 'from-white/10 to-white/5',
      type: 'simple',
      players: 1
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
      type: 'interactive',
      players: 1
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
      exerciseId: '8',
      type: 'interactive',
      players: 1
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
      exerciseId: '2',
      type: 'interactive',
      players: 1
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
    const game = soloGames.find(g => g.id === gameId);
    if (game) {
      setSelectedGame(gameId);
    }
  };

  const handleGameComplete = (score: number) => {
    const xpEarned = Math.floor(score / 10) || 50;
    const coinsEarned = Math.floor(score / 20) || 25;
    
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

  // Render specific games
  if (selectedGame) {
    const game = soloGames.find(g => g.id === selectedGame);
    
    if (game?.type === 'simple') {
      switch (selectedGame) {
        case 'squat-challenge':
          return <SquatCounter onComplete={handleGameComplete} />;
        case 'punch-master':
          return <PunchingGame onComplete={handleGameComplete} />;
        case 'balance-beam':
          return <BalanceGame onComplete={handleGameComplete} />;
      }
    }
    
    if (game?.type === 'interactive' && game.exerciseId) {
      const exercise = exercises.find(e => e.id === game.exerciseId);
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
                onClick={() => {
                  dispatch({ type: 'UPDATE_STATS', payload: {
                    xp: state.userStats.xp + 75,
                    coins: state.userStats.coins + 35
                  }});
                }}
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
                onClick={() => {
                  dispatch({ type: 'UPDATE_STATS', payload: {
                    xp: state.userStats.xp + 25,
                    coins: state.userStats.coins + 10
                  }});
                }}
              >
                Participate
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
                { name: 'Mike', score: 1980, game: 'Balance Master', avatar: '🥉' },
                { name: 'You', score: state.userStats.xp || 1750, game: 'Fitness Games', avatar: '🎮' }
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