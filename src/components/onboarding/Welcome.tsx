import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Trophy, Sparkles, Gamepad2, Users, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { renderCanvas } from '../ui/canvas';

interface WelcomeProps {
  onNext: () => void;
}

export function Welcome({ onNext }: WelcomeProps) {
  useEffect(() => {
    // Initialize the interactive canvas
    const timer = setTimeout(() => {
      renderCanvas();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Interactive Canvas Background */}
      <canvas
        className="pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      />
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-4 mb-12"
            >
              <motion.div
                className="w-12 h-12 bg-white rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Zap className="w-7 h-7 text-black" />
              </motion.div>
              <span className="text-white font-light text-3xl tracking-wide">FitQuest</span>
              <div className="text-white/40 text-sm bg-white/10 px-3 py-1 rounded border border-white/20">25</div>
            </motion.div>

            {/* Hero Section with Enhanced Design */}
            <div className="mb-10 mt-4 md:mt-6">
              <div className="px-2">
                <div className="relative mx-auto h-full max-w-7xl border border-white/10 p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20 rounded-2xl bg-white/[0.02] backdrop-blur-sm">
                  <Plus
                    strokeWidth={4}
                    className="absolute -left-5 -top-5 h-10 w-10 text-white/20"
                  />
                  <Plus
                    strokeWidth={4}
                    className="absolute -bottom-5 -left-5 h-10 w-10 text-white/20"
                  />
                  <Plus
                    strokeWidth={4}
                    className="absolute -right-5 -top-5 h-10 w-10 text-white/20"
                  />
                  <Plus
                    strokeWidth={4}
                    className="absolute -bottom-5 -right-5 h-10 w-10 text-white/20"
                  />
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex select-none flex-col px-3 py-2 text-center text-5xl font-light leading-none tracking-tight md:flex-col md:text-8xl lg:flex-row lg:text-8xl text-white"
                  >
                    Transform your fitness into an epic adventure
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-1 mt-6"
                  >
                    <span className="relative flex h-3 w-3 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <p className="text-xs text-green-500 font-light">Available Now</p>
                  </motion.div>
                </div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 text-2xl md:text-2xl text-white font-light text-center"
              >
                Welcome to your creative fitness playground! Level up with{" "}
                <span className="text-white font-bold">AI-powered workouts</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-white/60 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg text-center font-light"
              >
                Level up your workouts with AI-powered routines, earn rewards, 
                compete with friends, and turn every exercise into an engaging game.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              {[
                {
                  icon: Target,
                  title: 'AI-Powered Workouts',
                  description: 'Personalized routines that evolve with your progress'
                },
                {
                  icon: Trophy,
                  title: 'Epic Rewards System',
                  description: 'Level up, earn coins, unlock achievements'
                },
                {
                  icon: Gamepad2,
                  title: 'Interactive Games',
                  description: 'Turn exercises into engaging mini-games'
                },
                {
                  icon: Users,
                  title: 'Squad Battles',
                  description: 'Team up with friends for epic challenges'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-start space-x-4 bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/[0.05] hover:bg-white/[0.04] transition-all duration-300 group"
                >
                  <motion.div 
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-light text-white text-xl mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="grid grid-cols-3 gap-8 mb-12"
            >
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">10K+</div>
                <div className="text-white/60 text-sm font-light">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">50M+</div>
                <div className="text-white/60 text-sm font-light">Workouts Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">4.9★</div>
                <div className="text-white/60 text-sm font-light">User Rating</div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  onClick={onNext}
                  variant="default"
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 px-12 py-6 font-light tracking-wide flex items-center space-x-4 text-xl"
                >
                  <span>Begin Your Quest</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl"
                  >
                    →
                  </motion.span>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
                className="text-white/60 font-light text-center sm:text-left"
              >
                <div className="text-sm">Free to start</div>
                <div className="text-xs">No credit card required</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Enhanced visual area */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.0, duration: 1 }}
              className="relative"
            >
              {/* Central logo/icon */}
              <motion.div
                className="w-40 h-40 bg-white/[0.03] backdrop-blur-sm rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
                <Zap className="w-20 h-20 text-white relative z-10" />
              </motion.div>

              {/* Orbiting elements */}
              {[
                { icon: Target, delay: 0, radius: 100, size: 16 },
                { icon: Trophy, delay: 1, radius: 100, size: 16 },
                { icon: Gamepad2, delay: 2, radius: 100, size: 16 },
                { icon: Users, delay: 3, radius: 100, size: 16 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute w-16 h-16 bg-white/[0.05] backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    x: [
                      Math.cos((index * 90 + 0) * Math.PI / 180) * item.radius,
                      Math.cos((index * 90 + 90) * Math.PI / 180) * item.radius,
                      Math.cos((index * 90 + 180) * Math.PI / 180) * item.radius,
                      Math.cos((index * 90 + 270) * Math.PI / 180) * item.radius,
                      Math.cos((index * 90 + 360) * Math.PI / 180) * item.radius
                    ],
                    y: [
                      Math.sin((index * 90 + 0) * Math.PI / 180) * item.radius,
                      Math.sin((index * 90 + 90) * Math.PI / 180) * item.radius,
                      Math.sin((index * 90 + 180) * Math.PI / 180) * item.radius,
                      Math.sin((index * 90 + 270) * Math.PI / 180) * item.radius,
                      Math.sin((index * 90 + 360) * Math.PI / 180) * item.radius
                    ]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: item.delay
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-32px',
                    marginTop: '-32px'
                  }}
                >
                  <item.icon className={`w-${item.size/4} h-${item.size/4} text-white`} />
                </motion.div>
              ))}

              {/* Outer ring particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`outer-${i}`}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  animate={{
                    rotate: [0, 360],
                    x: [
                      Math.cos((i * 30) * Math.PI / 180) * 160,
                      Math.cos((i * 30 + 360) * Math.PI / 180) * 160
                    ],
                    y: [
                      Math.sin((i * 30) * Math.PI / 180) * 160,
                      Math.sin((i * 30 + 360) * Math.PI / 180) * 160
                    ]
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-4px',
                    marginTop: '-4px'
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}