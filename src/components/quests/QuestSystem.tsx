import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Star, Lock, Play, Trophy, Coins } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { ProgressBar } from '../common/ProgressBar';
import { useApp } from '../../contexts/AppContext';
import { quests } from '../../data/quests';

export function QuestSystem() {
  const { state, dispatch } = useApp();
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const currentQuest = selectedQuest ? quests.find(q => q.id === selectedQuest) : null;

  const handleStartQuest = (questId: string) => {
    dispatch({ type: 'START_QUEST', payload: questId });
    setSelectedQuest(questId);
  };

  const handleStartChapter = (chapterId: string) => {
    // Start the workout associated with this chapter
    const chapter = currentQuest?.chapters.find(c => c.id === chapterId);
    if (chapter) {
      // This would trigger the workout session
      console.log('Starting chapter workout:', chapter.workoutId);
    }
  };

  if (selectedQuest && currentQuest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Quest Header */}
          <InteractiveCard className="p-6 mb-6 relative overflow-hidden" glowEffect>
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${currentQuest.backgroundImage})` }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Button 
                  onClick={() => setSelectedQuest(null)}
                  variant="ghost"
                  size="sm"
                >
                  ← Back to Quests
                </Button>
                <div className="flex items-center space-x-2 text-white/80">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">{currentQuest.duration} days</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2">{currentQuest.name}</h1>
              <p className="text-white/80 mb-4">{currentQuest.description}</p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">{currentQuest.rewards.xp} XP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">{currentQuest.rewards.coins} Coins</span>
                </div>
              </div>
            </div>
          </InteractiveCard>

          {/* Quest Progress */}
          <InteractiveCard className="p-6 mb-6" glowEffect>
            <h3 className="text-xl font-bold text-white mb-4">Quest Progress</h3>
            <ProgressBar
              progress={(activeChapter / currentQuest.chapters.length) * 100}
              color="cosmic"
              animated
              glowEffect
              showLabel
              label={`Chapter ${activeChapter + 1} of ${currentQuest.chapters.length}`}
            />
          </InteractiveCard>

          {/* Chapters */}
          <div className="space-y-4">
            {currentQuest.chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InteractiveCard 
                  className={`p-6 ${index <= activeChapter ? 'border-green-400/50' : 'border-white/20'}`}
                  glowEffect={index === activeChapter}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div 
                        className="w-16 h-16 bg-cover bg-center rounded-xl"
                        style={{ backgroundImage: `url(${chapter.unlockImage})` }}
                      />
                      {index > activeChapter && (
                        <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{chapter.name}</h4>
                      <p className="text-white/70 text-sm mb-2">{chapter.description}</p>
                      <p className="text-white/60 text-xs italic">{chapter.storyText}</p>
                    </div>
                    
                    {index === activeChapter && (
                      <Button
                        onClick={() => handleStartChapter(chapter.id)}
                        variant="cosmic"
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start</span>
                      </Button>
                    )}
                    
                    {index < activeChapter && (
                      <div className="text-green-400 text-sm font-bold">Completed ✓</div>
                    )}
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Map className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Epic Quests</h1>
          <p className="text-white/70">Embark on legendary adventures through space and time</p>
        </div>

        <div className="grid gap-6">
          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <InteractiveCard 
                className="p-6 relative overflow-hidden"
                hoverScale={1.02}
                glowEffect
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: `url(${quest.backgroundImage})` }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{quest.name}</h3>
                      <p className="text-white/80 mb-4">{quest.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm mb-4">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-white">{quest.duration} days</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-white">{quest.rewards.xp} XP</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Coins className="w-4 h-4 text-yellow-400" />
                          <span className="text-white">{quest.rewards.coins} Coins</span>
                        </div>
                      </div>
                      
                      <div className="text-white/60 text-sm">
                        {quest.chapters.length} chapters • {quest.theme} theme
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleStartQuest(quest.id)}
                      variant="legendary"
                      size="lg"
                      className="ml-4"
                      glowEffect
                    >
                      Begin Quest
                    </Button>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}