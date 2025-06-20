import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Trophy, Sparkles, Gamepad2, Users, Plus, Star, Rocket, Shield, Crown, ArrowRight, Play, Globe, Cpu, Brain } from 'lucide-react';
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
        className="pointer-events-none absolute inset-0 mx-auto opacity-40"
        id="canvas"
      />

      {/* Floating Particles */}
      <div className="particle-bg">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 15 + 20}s`
            }}
          />
        ))}
      </div>
      
      {/* Main Content - Optimized for Large Screens */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-[1600px] mx-auto px-8 xl:px-12">
          {/* Header Section */}
          <div className="pt-8 pb-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between"
            >
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl glow-animation"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="w-9 h-9 text-white" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-white font-light text-5xl tracking-wide gradient-text">FitQuest</span>
                  <span className="text-white/60 text-base font-light">Fitness Gaming Revolution</span>
                </div>
              </div>

              {/* Version Badge */}
              <div className="text-white/40 text-sm bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-6 py-3 rounded-full border border-white/20 backdrop-blur-sm">
                v2.5 • Live
              </div>
            </motion.div>
          </div>

          {/* Hero Section - Large Screen Layout */}
          <div className="grid xl:grid-cols-5 gap-16 items-center min-h-[calc(100vh-200px)]">
            {/* Left Content - Takes 3 columns */}
            <div className="xl:col-span-3 space-y-12">
              {/* Main Hero Text */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <h1 className="text-6xl xl:text-8xl 2xl:text-9xl font-light leading-[0.9] tracking-tight text-white">
                    Transform your
                    <br />
                    <span className="gradient-text font-medium">fitness journey</span>
                    <br />
                    into an epic
                    <br />
                    <span className="text-white/90">adventure</span>
                  </h1>
                  
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-8 -right-8 text-cyan-400/30"
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  >
                    <Sparkles className="w-12 h-12" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="max-w-3xl"
                >
                  <p className="text-2xl xl:text-3xl text-white/80 font-light leading-relaxed">
                    Experience the perfect fusion of gaming and fitness. Earn XP, unlock achievements, 
                    compete with friends, and transform every workout into an engaging adventure.
                  </p>
                </motion.div>

                {/* Status Indicator */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
                    </span>
                    <p className="text-lg text-green-400 font-medium">Live & Ready to Play</p>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Globe className="w-5 h-5" />
                    <span className="text-base">10,000+ Active Players</span>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Features Grid - Large Screen */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  {
                    icon: Brain,
                    title: 'AI-Powered Workouts',
                    description: 'Personalized routines that evolve with your progress using advanced machine learning',
                    color: 'from-cyan-400 to-blue-500',
                    bgColor: 'from-cyan-500/10 to-blue-500/10'
                  },
                  {
                    icon: Trophy,
                    title: 'Epic Rewards System',
                    description: 'Level up, earn coins, unlock achievements and compete on global leaderboards',
                    color: 'from-yellow-400 to-orange-500',
                    bgColor: 'from-yellow-500/10 to-orange-500/10'
                  },
                  {
                    icon: Gamepad2,
                    title: 'Interactive Games',
                    description: 'Turn exercises into engaging mini-games with real-time feedback and scoring',
                    color: 'from-purple-400 to-pink-500',
                    bgColor: 'from-purple-500/10 to-pink-500/10'
                  },
                  {
                    icon: Users,
                    title: 'Squad Battles',
                    description: 'Team up with friends for epic challenges and multiplayer fitness competitions',
                    color: 'from-green-400 to-emerald-500',
                    bgColor: 'from-green-500/10 to-emerald-500/10'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    className={`group relative glass-morphism rounded-2xl p-8 hover:scale-105 transition-all duration-300 bg-gradient-to-br ${feature.bgColor}`}
                    whileHover={{ y: -8 }}
                  >
                    <div className="space-y-4">
                      <motion.div 
                        className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-medium text-white text-2xl mb-3">{feature.title}</h3>
                        <p className="text-white/70 text-base font-light leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-col lg:flex-row items-start lg:items-center gap-8"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    onClick={onNext}
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-16 py-8 font-medium tracking-wide flex items-center space-x-6 text-2xl rounded-2xl shadow-2xl border-0 glow-animation"
                  >
                    <Rocket className="w-8 h-8" />
                    <span>Begin Your Quest</span>
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-8 h-8" />
                    </motion.div>
                  </Button>
                </motion.div>
                
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="flex items-center gap-3 text-white/60 font-light"
                  >
                    <Shield className="w-6 h-6 text-green-400" />
                    <span className="text-lg">Free to start • No credit card required</span>
                  </div>
                  <div className="flex items-center gap-6 text-white/50 text-base">
                    <div className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      <span>Instant access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5" />
                      <span>AI-powered</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Enhanced 3D visual area - Takes 2 columns */}
            <div className="xl:col-span-2 relative h-[600px] xl:h-[800px] flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.6, duration: 1.2 }}
                className="relative float-animation"
              >
                {/* Central logo/icon with enhanced design */}
                <motion.div
                  className="w-64 h-64 xl:w-80 xl:h-80 glass-morphism rounded-[3rem] flex items-center justify-center relative overflow-hidden shadow-2xl"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {/* Inner glow effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[3rem]" />
                  <div className="absolute inset-6 bg-gradient-to-tr from-white/10 to-transparent rounded-[2.5rem]" />
                  <Zap className="w-32 h-32 xl:w-40 xl:h-40 text-white relative z-10" />
                  
                  {/* Multiple pulsing rings */}
                  <motion.div
                    className="absolute inset-0 border-2 border-cyan-400/30 rounded-[3rem]"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-4 border border-purple-400/20 rounded-[2.5rem]"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>

                {/* Enhanced orbiting elements */}
                {[
                  { icon: Target, delay: 0, radius: 160, color: 'text-cyan-400', size: 'w-24 h-24' },
                  { icon: Trophy, delay: 1, radius: 160, color: 'text-yellow-400', size: 'w-24 h-24' },
                  { icon: Gamepad2, delay: 2, radius: 160, color: 'text-purple-400', size: 'w-24 h-24' },
                  { icon: Users, delay: 3, radius: 160, color: 'text-green-400', size: 'w-24 h-24' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${item.size} glass-morphism rounded-2xl flex items-center justify-center shadow-lg`}
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
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                      delay: item.delay
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-48px',
                      marginTop: '-48px'
                    }}
                  >
                    <item.icon className={`w-10 h-10 ${item.color}`} />
                  </motion.div>
                ))}

                {/* Enhanced outer ring particles */}
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={`outer-${i}`}
                    className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg"
                    animate={{
                      rotate: [0, 360],
                      x: [
                        Math.cos((i * 15) * Math.PI / 180) * 240,
                        Math.cos((i * 15 + 360) * Math.PI / 180) * 240
                      ],
                      y: [
                        Math.sin((i * 15) * Math.PI / 180) * 240,
                        Math.sin((i * 15 + 360) * Math.PI / 180) * 240
                      ],
                      scale: [0.5, 1.2, 0.5]
                    }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.2
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-8px',
                      marginTop: '-8px'
                    }}
                  />
                ))}

                {/* Additional decorative elements */}
                <motion.div
                  className="absolute -top-12 -right-12 w-8 h-8 text-cyan-400"
                  animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Crown className="w-8 h-8" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-12 -left-12 w-8 h-8 text-purple-400"
                  animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>

                <motion.div
                  className="absolute -top-6 left-1/2 w-6 h-6 text-yellow-400"
                  animate={{ y: [-10, 10, -10], rotate: 180 }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats Section - Large Screen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="grid grid-cols-3 gap-12 py-16 border-t border-white/10"
          >
            {[
              { value: '10K+', label: 'Active Players', icon: Users, description: 'Growing community' },
              { value: '50M+', label: 'Workouts Completed', icon: Zap, description: 'Total sessions' },
              { value: '4.9★', label: 'User Rating', icon: Star, description: 'App store rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center glass-morphism rounded-2xl p-8"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <div className="text-5xl font-light text-white mb-2">{stat.value}</div>
                <div className="text-white/80 text-xl font-medium mb-1">{stat.label}</div>
                <div className="text-white/50 text-base font-light">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </div>
  );
}