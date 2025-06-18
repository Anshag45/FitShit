import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Star, Lock, Play, Trophy, Coins, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { InteractiveCard } from '../common/InteractiveCard';
import { ProgressBar } from '../common/ProgressBar';
import { useApp } from '../../contexts/AppContext';
import { quests } from '../../data/quests';

export function QuestSystem() {
  const { state, dispatch } = useApp();
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [questProgress, setQuestProgress] = useState<Record<string, number>>({});

  const currentQuest = selectedQuest ? quests.find(q => q.id === selectedQuest) : null;

  const handleStartQuest = (questId: string) => {
    dispatch({ type: 'START_QUEST', payload: questId });
    setSelectedQuest(questId);
    setActiveChapter(0);
    if (!questProgress[questId]) {
      setQuestProgress(prev => ({ ...prev, [questId]: 0 }));
    }
  };

  const handleStartChapter = (chapterId: string) => {
    const chapter = currentQuest?.chapters.find(c => c.id === chapterId);
    if (chapter && currentQuest) {
      // Simulate starting the workout
      console.log('Starting chapter workout:', chapter.workoutId);
      
      // Mark chapter as completed and move to next
      const newProgress = Math.min(activeChapter + 1, currentQuest.chapters.length);
      setActiveChapter(newProgress);
      setQuestProgress(prev => ({ 
        ...prev, 
        [currentQuest.id]: (newProgress / currentQuest.chapters.length) * 100 
      }));

      // Award XP and coins for completing chapter
      dispatch({ type: 'UPDATE_STATS', payload: {
        xp: state.userStats.xp + 100,
        coins: state.userStats.coins + 50
      }});

      // If quest is complete, award bonus rewards
      if (newProgress === currentQuest.chapters.length) {
        dispatch({ type: 'UPDATE_STATS', payload: {
          xp: state.userStats.xp + currentQuest.rewards.xp,
          coins: state.userStats.coins + currentQuest.rewards.coins
        }});
      }
    }
  };

  const handleBackToQuests = () => {
    setSelectedQuest(null);
    setActiveChapter(0);
  };

  if (selectedQuest && currentQuest) {
    const progress = questProgress[currentQuest.id] || 0;
    const isCompleted = progress >= 100;

    return (
      <div className="min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Quest Header */}
          <InteractiveCard className="p-6 mb-6 relative overflow-hidden bg-white/[0.02] border-white/[0.05]" glowEffect>
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${currentQuest.backgroundImage})` }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Button 
                  onClick={handleBackToQuests}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Quests</span>
                </Button>
                <div className="flex items-center space-x-2 text-white/60">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-light">{currentQuest.duration} days</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-light text-white mb-2">{currentQuest.name}</h1>
              <p className="text-white/60 mb-4 font-light">{currentQuest.description}</p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-light">{currentQuest.rewards.xp} XP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-light">{currentQuest.rewards.coins} Coins</span>
                </div>
                {isCompleted && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-light">Completed!</span>
                  </div>
                )}
              </div>
            </div>
          </InteractiveCard>

          {/* Quest Progress */}
          <InteractiveCard className="p-6 mb-6 bg-white/[0.02] border-white/[0.05]" glowEffect>
            <h3 className="text-xl font-light text-white mb-4">Quest Progress</h3>
            <ProgressBar
              progress={progress}
              color="cosmic"
              animated
              glowEffect
              showLabel
              label={`Chapter ${activeChapter} of ${currentQuest.chapters.length}`}
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
                  className={`p-6 bg-white/[0.02] ${
                    index < activeChapter ? 'border-green-400/50' : 
                    index === activeChapter ? 'border-cyan-400/50' : 
                    'border-white/[0.05]'
                  }`}
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
                      {index < activeChapter && (
                        <div className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-light text-white mb-1">{chapter.name}</h4>
                      <p className="text-white/60 text-sm mb-2 font-light">{chapter.description}</p>
                      <p className="text-white/40 text-xs italic font-light">{chapter.storyText}</p>
                    </div>
                    
                    {index === activeChapter && !isCompleted && (
                      <Button
                        onClick={() => handleStartChapter(chapter.id)}
                        variant="primary"
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Chapter</span>
                      </Button>
                    )}
                    
                    {index < activeChapter && (
                      <div className="text-green-400 text-sm font-light">Completed ✓</div>
                    )}

                    {index > activeChapter && (
                      <div className="text-white/40 text-sm font-light">Locked</div>
                    )}
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>

          {/* Completion Rewards */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6"
            >
              <InteractiveCard className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50" glowEffect>
                <div className="text-center">
                  <h3 className="text-2xl font-light text-white mb-4">🎉 Quest Completed!</h3>
                  <p className="text-white/80 mb-4 font-light">You've successfully completed the {currentQuest.name} quest!</p>
                  <div className="flex items-center justify-center space-x-6">
                    <div className="text-center">
                      <div className="text-xl font-light text-green-400">{currentQuest.rewards.xp}</div>
                      <div className="text-sm text-white/60 font-light">XP Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-light text-yellow-400">{currentQuest.rewards.coins}</div>
                      <div className="text-sm text-white/60 font-light">Coins Earned</div>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Map className="w-10 h-10 text-black" />
          </motion.div>
          <h1 className="text-4xl font-light text-white mb-2">Epic Quests</h1>
          <p className="text-white/60 font-light">Embark on legendary adventures through digital realms</p>
        </div>

        <div className="grid gap-6">
          {quests.map((quest, index) => {
            const progress = questProgress[quest.id] || 0;
            const isCompleted = progress >= 100;
            
            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <InteractiveCard 
                  className="p-6 relative overflow-hidden bg-white/[0.02] border-white/[0.05]"
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
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-light text-white">{quest.name}</h3>
                          {isCompleted && (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-light">
                              COMPLETED
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 mb-4 font-light">{quest.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm mb-4">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-cyan-400" />
                            <span className="text-white font-light">{quest.duration} days</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-cyan-400" />
                            <span className="text-white font-light">{quest.rewards.xp} XP</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Coins className="w-4 h-4 text-cyan-400" />
                            <span className="text-white font-light">{quest.rewards.coins} Coins</span>
                          </div>
                        </div>
                        
                        <div className="text-white/40 text-sm font-light">
                          {quest.chapters.length} chapters • {quest.theme} theme
                        </div>

                        {progress > 0 && (
                          <div className="mt-4">
                            <ProgressBar
                              progress={progress}
                              color="cosmic"
                              animated
                              showLabel
                              label={`${Math.round(progress)}% Complete`}
                            />
                          </div>
                        )}
                      </div>
                      
                      <Button
                        onClick={() => handleStartQuest(quest.id)}
                        variant={isCompleted ? "outline" : "primary"}
                        size="lg"
                        className="ml-4"
                        glowEffect={!isCompleted}
                      >
                        {isCompleted ? "View Quest" : progress > 0 ? "Continue Quest" : "Begin Quest"}
                      </Button>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}