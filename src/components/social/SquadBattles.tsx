import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Sword, Trophy, Flame, Target, Crown, Plus } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { ProgressBar } from '../common/ProgressBar';
import { useApp } from '../../contexts/AppContext';

export function SquadBattles() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'battles' | 'squad' | 'leaderboard'>('battles');

  const mockSquads = [
    {
      id: '1',
      name: 'Cosmic Warriors',
      members: 5,
      totalCalories: 12450,
      rank: 1,
      isUserSquad: true,
      avatar: '⚡'
    },
    {
      id: '2',
      name: 'Galaxy Guardians',
      members: 4,
      totalCalories: 11200,
      rank: 2,
      isUserSquad: false,
      avatar: '🌟'
    },
    {
      id: '3',
      name: 'Stellar Titans',
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
      isLive: true
    },
    {
      id: '2',
      name: 'Workout Streak Challenge',
      description: 'Maintain the longest combined workout streak',
      timeLeft: '5d 8h',
      progress: 60,
      reward: { xp: 300, coins: 150 },
      participants: 18,
      isLive: true
    }
  ];

  const mockMembers = [
    { name: 'Alex', level: 15, calories: 3200, isOnline: true, avatar: '👨‍🚀' },
    { name: 'Sarah', level: 12, calories: 2800, isOnline: true, avatar: '👩‍🚀' },
    { name: 'Mike', level: 18, calories: 3450, isOnline: false, avatar: '🧑‍🚀' },
    { name: 'Emma', level: 14, calories: 2900, isOnline: true, avatar: '👩‍🚀' },
    { name: 'You', level: state.userStats.level, calories: 2100, isOnline: true, avatar: '🚀' }
  ];

  const renderBattles = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Active Squad Battles</h2>
        <p className="text-white/70">Compete with other squads in epic challenges</p>
      </div>

      {mockBattles.map((battle, index) => (
        <motion.div
          key={battle.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard className="p-6" glowEffect>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{battle.name}</h3>
                  {battle.isLive && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                      LIVE
                    </span>
                  )}
                </div>
                <p className="text-white/80 mb-3">{battle.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-white/70 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{battle.participants} squads</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{battle.timeLeft} left</span>
                  </div>
                </div>

                <ProgressBar
                  progress={battle.progress}
                  color="cosmic"
                  animated
                  showLabel
                  label={`${battle.progress}% Complete`}
                />
              </div>
              
              <div className="ml-4 text-right">
                <div className="text-white/60 text-sm mb-1">Rewards</div>
                <div className="text-yellow-400 font-bold">{battle.reward.xp} XP</div>
                <div className="text-green-400 font-bold">{battle.reward.coins} Coins</div>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>
      ))}
    </div>
  );

  const renderSquad = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Your Squad</h2>
        <p className="text-white/70">Cosmic Warriors - Rank #1</p>
      </div>

      <InteractiveCard className="p-6 mb-6" glowEffect>
        <div className="text-center">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-2xl font-bold text-white mb-2">Cosmic Warriors</h3>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">12,450</div>
              <div className="text-white/60">Total Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">5</div>
              <div className="text-white/60">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">#1</div>
              <div className="text-white/60">Rank</div>
            </div>
          </div>
        </div>
      </InteractiveCard>

      <div className="space-y-3">
        {mockMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <InteractiveCard className="p-4" hoverScale={1.02}>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="text-2xl">{member.avatar}</div>
                  {member.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{member.name}</span>
                    <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full">
                      Lv.{member.level}
                    </span>
                  </div>
                  <div className="text-sm text-white/70">{member.calories} calories this week</div>
                </div>
                {member.name === 'You' && (
                  <Crown className="w-5 h-5 text-yellow-400" />
                )}
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Invite Friends</span>
      </Button>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Squad Leaderboard</h2>
        <p className="text-white/70">Top performing squads this week</p>
      </div>

      {mockSquads.map((squad, index) => (
        <motion.div
          key={squad.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard 
            className={`p-4 ${squad.isUserSquad ? 'ring-2 ring-purple-400/50' : ''}`}
            glowEffect={squad.isUserSquad}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  squad.rank === 1 ? 'bg-yellow-500 text-white' :
                  squad.rank === 2 ? 'bg-gray-400 text-white' :
                  squad.rank === 3 ? 'bg-orange-500 text-white' :
                  'bg-white/20 text-white'
                }`}>
                  {squad.rank}
                </div>
                <div className="text-2xl">{squad.avatar}</div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">{squad.name}</span>
                  {squad.isUserSquad && (
                    <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full">
                      Your Squad
                    </span>
                  )}
                </div>
                <div className="text-sm text-white/70">{squad.members} members</div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-white">{squad.totalCalories.toLocaleString()}</div>
                <div className="text-xs text-white/60">calories</div>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
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
            className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Sword className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Squad Battles</h1>
          <p className="text-white/70">Team up and dominate the galaxy together</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'battles', label: 'Battles', icon: Sword },
            { id: 'squad', label: 'My Squad', icon: Users },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              variant={activeTab === tab.id ? 'cosmic' : 'ghost'}
              className="flex-1 flex items-center justify-center space-x-2"
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