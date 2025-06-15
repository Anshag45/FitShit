import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Sword, Trophy, Flame, Target, Crown, Plus, Play } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { ProgressBar } from '../common/ProgressBar';
import { useApp } from '../../contexts/AppContext';

export function SquadBattles() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'battles' | 'squad' | 'leaderboard'>('battles');

  const mockSquads = [
    {
      id: '1',
      name: 'Cyber Warriors',
      members: 5,
      totalCalories: 12450,
      rank: 1,
      isUserSquad: true,
      avatar: '⚡'
    },
    {
      id: '2',
      name: 'Digital Guardians',
      members: 4,
      totalCalories: 11200,
      rank: 2,
      isUserSquad: false,
      avatar: '🌟'
    },
    {
      id: '3',
      name: 'Neon Titans',
      members: 6,
      totalCalories: 10800,
      rank: 3,
      isUserSquad: false,
      avatar: '🚀'
    }
  ];

  const mockBattles = [
    {
      id: '1',
      name: 'Weekly Calorie Burn',
      description: 'Burn the most calories as a squad this week',
      timeLeft: '2d 14h',
      progress: 75,
      reward: { xp: 500, coins: 200 },
      participants: 24,
      isLive: true,
      isActive: false
    },
    {
      id: '2',
      name: 'Workout Streak Challenge',
      description: 'Maintain the longest combined workout streak',
      timeLeft: '5d 8h',
      progress: 60,
      reward: { xp: 300, coins: 150 },
      participants: 18,
      isLive: true,
      isActive: false
    }
  ];

  const mockMembers = [
    { name: 'Alex', level: 15, calories: 3200, isOnline: true, avatar: '👨‍💻' },
    { name: 'Sarah', level: 12, calories: 2800, isOnline: true, avatar: '👩‍💻' },
    { name: 'Mike', level: 18, calories: 3450, isOnline: false, avatar: '🧑‍💻' },
    { name: 'Emma', level: 14, calories: 2900, isOnline: true, avatar: '👩‍💻' },
    { name: 'You', level: state.userStats.level, calories: 2100, isOnline: true, avatar: '🎮' }
  ];

  const handleJoinBattle = (battleId: string) => {
    const battle = mockBattles.find(b => b.id === battleId);
    if (battle) {
      battle.isActive = true;
      dispatch({ type: 'UPDATE_STATS', payload: {
        xp: state.userStats.xp + 50,
        coins: state.userStats.coins + 25
      }});
    }
  };

  const renderBattles = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-white mb-3">Active Squad Battles</h2>
        <p className="text-white/60 font-light">Compete with other squads in epic challenges</p>
      </div>

      {mockBattles.map((battle, index) => (
        <motion.div
          key={battle.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard className="p-8 bg-white/[0.02] border-white/[0.05]" glowEffect>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-light text-white">{battle.name}</h3>
                  {battle.isLive && (
                    <span className="px-3 py-1 bg-white/10 text-white text-xs rounded-full font-light">
                      LIVE
                    </span>
                  )}
                  {battle.isActive && (
                    <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-light">
                      JOINED
                    </span>
                  )}
                </div>
                <p className="text-white/60 mb-4 font-light">{battle.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-white/60 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="font-light">{battle.participants} squads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span className="font-light">{battle.timeLeft} left</span>
                  </div>
                </div>

                <div className="w-full bg-white/[0.05] rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-white/20 transition-all duration-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${battle.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              <div className="ml-8 text-right">
                <div className="text-white/60 text-sm mb-2 font-light">Rewards</div>
                <div className="text-white font-light">{battle.reward.xp} XP</div>
                <div className="text-white font-light">{battle.reward.coins} Coins</div>
                
                {!battle.isActive && (
                  <Button
                    onClick={() => handleJoinBattle(battle.id)}
                    variant="primary"
                    size="sm"
                    className="mt-4 flex items-center space-x-2 font-light"
                  >
                    <Play className="w-3 h-3" />
                    <span>Join Battle</span>
                  </Button>
                )}
              </div>
            </div>
          </InteractiveCard>
        </motion.div>
      ))}
    </div>
  );

  const renderSquad = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-white mb-3">Your Squad</h2>
        <p className="text-white/60 font-light">Cyber Warriors - Rank #1</p>
      </div>

      <InteractiveCard className="p-8 mb-8 bg-white/[0.02] border-white/[0.05]" glowEffect>
        <div className="text-center">
          <div className="text-6xl mb-6">⚡</div>
          <h3 className="text-3xl font-light text-white mb-6">Cyber Warriors</h3>
          <div className="flex items-center justify-center space-x-12 text-sm">
            <div className="text-center">
              <div className="text-3xl font-light text-white">12,450</div>
              <div className="text-white/60 font-light">Total Calories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-white">5</div>
              <div className="text-white/60 font-light">Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-white">#1</div>
              <div className="text-white/60 font-light">Rank</div>
            </div>
          </div>
        </div>
      </InteractiveCard>

      <div className="space-y-4">
        {mockMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <InteractiveCard className="p-6 bg-white/[0.02] border-white/[0.05]" hoverScale={1.01}>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="text-2xl">{member.avatar}</div>
                  {member.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-black" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-light text-white">{member.name}</span>
                    <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full font-light">
                      Lv.{member.level}
                    </span>
                  </div>
                  <div className="text-sm text-white/60 font-light">{member.calories} calories this week</div>
                </div>
                {member.name === 'You' && (
                  <Crown className="w-5 h-5 text-white/60" />
                )}
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="w-full flex items-center justify-center space-x-2 font-light">
        <Plus className="w-4 h-4" />
        <span>Invite Friends</span>
      </Button>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-white mb-3">Squad Leaderboard</h2>
        <p className="text-white/60 font-light">Top performing squads this week</p>
      </div>

      {mockSquads.map((squad, index) => (
        <motion.div
          key={squad.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard 
            className={`p-6 bg-white/[0.02] border-white/[0.05] ${squad.isUserSquad ? 'ring-1 ring-white/20' : ''}`}
            glowEffect={squad.isUserSquad}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-light ${
                  squad.rank === 1 ? 'bg-white text-black' :
                  squad.rank === 2 ? 'bg-white/20 text-white' :
                  squad.rank === 3 ? 'bg-white/15 text-white' :
                  'bg-white/10 text-white'
                }`}>
                  {squad.rank}
                </div>
                <div className="text-2xl">{squad.avatar}</div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-light text-white">{squad.name}</span>
                  {squad.isUserSquad && (
                    <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full font-light">
                      Your Squad
                    </span>
                  )}
                </div>
                <div className="text-sm text-white/60 font-light">{squad.members} members</div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-light text-white">{squad.totalCalories.toLocaleString()}</div>
                <div className="text-xs text-white/60 font-light">calories</div>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen p-4">
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
            <Sword className="w-10 h-10 text-black" />
          </motion.div>
          <h1 className="text-6xl font-light text-white mb-4">Squad Battles</h1>
          <p className="text-white/60 font-light text-xl">Team up and dominate the digital realm together</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          {[
            { id: 'battles', label: 'Battles', icon: Sword },
            { id: 'squad', label: 'My Squad', icon: Users },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
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
          {activeTab === 'battles' && renderBattles()}
          {activeTab === 'squad' && renderSquad()}
          {activeTab === 'leaderboard' && renderLeaderboard()}
        </motion.div>
      </motion.div>
    </div>
  );
}