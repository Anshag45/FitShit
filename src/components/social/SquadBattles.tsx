import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Sword, Trophy, Flame, Target, Crown, Plus, Play, MessageCircle, Share2, Zap, Send } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { ProgressBar } from '../common/ProgressBar';
import { useApp } from '../../contexts/AppContext';

export function SquadBattles() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'battles' | 'squad' | 'leaderboard'>('battles');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Alex', avatar: '👨‍💻', message: 'Great workout today team! 💪', time: '2 minutes ago' },
    { id: 2, user: 'Sarah', avatar: '👩‍💻', message: 'Let\'s crush tomorrow\'s challenge!', time: '5 minutes ago' },
    { id: 3, user: 'Mike', avatar: '🧑‍💻', message: 'Just hit a new PR! 🔥', time: '10 minutes ago' },
    { id: 4, user: 'Emma', avatar: '👩‍💻', message: 'Squad goals! We\'re unstoppable! ⚡', time: '15 minutes ago' }
  ]);

  const mockSquads = [
    {
      id: '1',
      name: 'Cyber Warriors',
      members: 5,
      totalCalories: 12450,
      rank: 1,
      isUserSquad: true,
      avatar: '⚡',
      winStreak: 7,
      trophies: 2340,
      weeklyCalories: 3200,
      change: '+15%'
    },
    {
      id: '2',
      name: 'Digital Guardians',
      members: 4,
      totalCalories: 11200,
      rank: 2,
      isUserSquad: false,
      avatar: '🌟',
      winStreak: 3,
      trophies: 2100,
      weeklyCalories: 2800,
      change: '+8%'
    },
    {
      id: '3',
      name: 'Neon Titans',
      members: 6,
      totalCalories: 10800,
      rank: 3,
      isUserSquad: false,
      avatar: '🚀',
      winStreak: 5,
      trophies: 1980,
      weeklyCalories: 2700,
      change: '+12%'
    }
  ];

  const mockBattles = [
    {
      id: '1',
      name: 'Weekly Calorie Burn Championship',
      description: 'Burn the most calories as a squad this week',
      timeLeft: '2d 14h',
      progress: 75,
      reward: { xp: 500, coins: 200, trophies: 50 },
      participants: 24,
      isLive: true,
      isActive: false,
      type: 'weekly',
      prize: '1000 Coins + Legendary Badge'
    },
    {
      id: '2',
      name: 'Workout Streak Challenge',
      description: 'Maintain the longest combined workout streak',
      timeLeft: '5d 8h',
      progress: 60,
      reward: { xp: 300, coins: 150, trophies: 30 },
      participants: 18,
      isLive: true,
      isActive: false,
      type: 'challenge',
      prize: '500 Coins + Streak Master Badge'
    }
  ];

  const mockMembers = [
    { name: 'Alex', level: 15, calories: 3200, isOnline: true, avatar: '👨‍💻', contribution: 28, streak: 12, status: 'Working out' },
    { name: 'Sarah', level: 12, calories: 2800, isOnline: true, avatar: '👩‍💻', contribution: 24, streak: 8, status: 'Online' },
    { name: 'Mike', level: 18, calories: 3450, isOnline: false, avatar: '🧑‍💻', contribution: 30, streak: 15, status: 'Offline' },
    { name: 'Emma', level: 14, calories: 2900, isOnline: true, avatar: '👩‍💻', contribution: 25, streak: 10, status: 'In game' },
    { name: 'You', level: state.userStats.level, calories: 2100, isOnline: true, avatar: '🎮', contribution: 18, streak: state.userStats.streak, status: 'Online' }
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

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: 'You',
        avatar: '🎮',
        message: chatMessage,
        time: 'Just now'
      };
      setChatMessages([newMessage, ...chatMessages]);
      setChatMessage('');
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
                  <div className="flex space-x-2">
                    {battle.isLive && (
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-light animate-pulse">
                        LIVE
                      </span>
                    )}
                    {battle.isActive && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-light">
                        JOINED
                      </span>
                    )}
                  </div>
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
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4" />
                    <span className="font-light">{battle.prize}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80 font-light">Squad Progress</span>
                    <span className="text-white/60 font-light">{battle.progress}%</span>
                  </div>
                  <ProgressBar
                    progress={battle.progress}
                    color="cosmic"
                    animated
                    glowEffect
                  />
                </div>
              </div>
              
              <div className="ml-8 text-right">
                <div className="text-white/60 text-sm mb-2 font-light">Rewards</div>
                <div className="text-white font-light">{battle.reward.xp} XP</div>
                <div className="text-white font-light">{battle.reward.coins} Coins</div>
                <div className="text-white font-light">{battle.reward.trophies} Trophies</div>
                
                <div className="flex space-x-2 mt-4">
                  {!battle.isActive && (
                    <Button
                      onClick={() => handleJoinBattle(battle.id)}
                      variant="primary"
                      size="sm"
                      className="flex items-center space-x-2 font-light"
                    >
                      <Play className="w-3 h-3" />
                      <span>Join Battle</span>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 font-light"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>Share</span>
                  </Button>
                </div>
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
        <div className="text-center mb-8">
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
            <div className="text-center">
              <div className="text-3xl font-light text-white">7</div>
              <div className="text-white/60 font-light">Win Streak</div>
            </div>
          </div>
        </div>

        {/* Working Squad Chat */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 mb-6">
          <h4 className="text-white font-light mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-cyan-400" />
            Squad Chat
            <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              {mockMembers.filter(m => m.isOnline).length} online
            </span>
          </h4>
          
          <div className="max-h-48 overflow-y-auto mb-4 space-y-3">
            {chatMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start space-x-3 p-3 bg-white/[0.02] rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                <div className="text-lg">{msg.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white/80 text-sm font-medium">{msg.user}</span>
                    <span className="text-white/40 text-xs">{msg.time}</span>
                  </div>
                  <div className="text-white/70 text-sm">{msg.message}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-white/[0.02] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder-white/40"
            />
            <Button 
              onClick={handleSendMessage}
              variant="primary" 
              size="sm"
              className="flex items-center space-x-2"
              disabled={!chatMessage.trim()}
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </Button>
          </div>
        </div>
      </InteractiveCard>

      {/* Squad Members */}
      <div className="space-y-4">
        <h4 className="text-xl font-light text-white mb-4">Squad Members</h4>
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
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-light text-white">{member.name}</span>
                    <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full font-light">
                      Lv.{member.level}
                    </span>
                    {member.streak > 10 && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full font-light">
                        🔥 {member.streak} streak
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full font-light ${
                      member.status === 'Working out' ? 'bg-red-500/20 text-red-400' :
                      member.status === 'In game' ? 'bg-purple-500/20 text-purple-400' :
                      member.status === 'Online' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                  <div className="text-sm text-white/60 font-light">
                    {member.calories} calories • {member.contribution}% contribution
                  </div>
                </div>
                {member.name === 'You' && (
                  <Crown className="w-5 h-5 text-yellow-400" />
                )}
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-white mb-3">Global Leaderboard</h2>
        <p className="text-white/60 font-light">Top performing squads this week</p>
      </div>

      {/* Leaderboard Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <InteractiveCard className="p-6 text-center bg-white/[0.02] border-white/[0.05]" glowEffect>
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-light text-white">#{mockSquads.find(s => s.isUserSquad)?.rank}</div>
          <div className="text-white/60 text-sm font-light">Your Squad Rank</div>
        </InteractiveCard>
        
        <InteractiveCard className="p-6 text-center bg-white/[0.02] border-white/[0.05]" glowEffect>
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-light text-white">12,450</div>
          <div className="text-white/60 text-sm font-light">Total Calories</div>
        </InteractiveCard>
        
        <InteractiveCard className="p-6 text-center bg-white/[0.02] border-white/[0.05]" glowEffect>
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-2xl font-light text-white">+15%</div>
          <div className="text-white/60 text-sm font-light">Weekly Growth</div>
        </InteractiveCard>
      </div>

      {/* Enhanced Leaderboard */}
      {mockSquads.map((squad, index) => (
        <motion.div
          key={squad.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <InteractiveCard 
            className={`p-6 bg-white/[0.02] border-white/[0.05] ${squad.isUserSquad ? 'ring-1 ring-cyan-400/30' : ''}`}
            glowEffect={squad.isUserSquad}
            hoverScale={1.02}
          >
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-light text-xl ${
                  squad.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' :
                  squad.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-black' :
                  squad.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-black' :
                  'bg-white/10 text-white'
                }`}>
                  {squad.rank === 1 ? '👑' : squad.rank}
                </div>
                <div className="text-4xl">{squad.avatar}</div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-light text-white text-xl">{squad.name}</span>
                  {squad.isUserSquad && (
                    <span className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full font-light">
                      Your Squad
                    </span>
                  )}
                  {squad.winStreak > 5 && (
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-light">
                      🔥 {squad.winStreak} wins
                    </span>
                  )}
                  <span className={`text-xs px-3 py-1 rounded-full font-light ${
                    squad.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {squad.change}
                  </span>
                </div>
                <div className="text-sm text-white/60 font-light mb-2">
                  {squad.members} members • {squad.trophies} trophies
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(squad.weeklyCalories / 4000) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-light text-white">{squad.totalCalories.toLocaleString()}</div>
                <div className="text-xs text-white/60 font-light">total calories</div>
                <div className="text-lg font-light text-cyan-400 mt-1">{squad.weeklyCalories}</div>
                <div className="text-xs text-white/60 font-light">this week</div>
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
        className="max-w-6xl mx-auto"
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