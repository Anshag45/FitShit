import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Trophy, Sparkles, Gamepad2, Users, Plus, Star, Rocket, Shield, Crown } from 'lucide-react';
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
        className="pointer-events-none absolute inset-0 mx-auto opacity-60"
        id="canvas"
      />

      {/* Floating Particles */}
      <div className="particle-bg">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          />
        ))}
      </div>
      
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
                className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl glow-animation"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-white font-light text-4xl tracking-wide gradient-text">FitQuest</span>
                <span className="text-white/60 text-sm font-light">Fitness Gaming Revolution</span>
              </div>
              <div className="text-white/40 text-sm bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                v2.5
              </div>
            </motion.div>

            {/* Hero Section with Enhanced Design */}
            <div className="mb-12 mt-4 md:mt-6">
              <div className="px-2">
                <div className="relative mx-auto h-full max-w-7xl glass-morphism p-8 md:px-16 md:py-24 rounded-3xl">
                  {/* Corner decorations */}
                  <Plus strokeWidth={3} className="absolute -left-6 -top-6 h-12 w-12 text-cyan-400/60" />
                  <Plus strokeWidth={3} className="absolute -bottom-6 -left-6 h-12 w-12 text-purple-400/60" />
                  <Plus strokeWidth={3} className="absolute -right-6 -top-6 h-12 w-12 text-pink-400/60" />
                  <Plus strokeWidth={3} className="absolute -bottom-6 -right-6 h-12 w-12 text-orange-400/60" />
                  
                  {/* Floating icons */}
                  <motion.div
                    className="absolute top-4 right-4 text-cyan-400/40"
                    animate={{ rotate: 360, y: [-10, 10, -10] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Star className="w-6 h-6" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4 text-purple-400/40"
                    animate={{ rotate: -360, y: [10, -10, 10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-5xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight text-white mb-8"
                  >
                    Transform your
                    <br />
                    <span className="gradient-text font-medium">fitness journey</span>
                    <br />
                    into an epic
                    <br />
                    <span className="text-white/90">adventure</span>
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-2 mt-8"
                  >
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                    </span>
                    <p className="text-sm text-green-400 font-medium">Live & Ready to Play</p>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-12 text-center"
              >
                <h2 className="text-2xl md:text-3xl text-white font-light mb-4">
                  Welcome to the future of fitness! Level up with{" "}
                  <span className="gradient-text font-medium">AI-powered workouts</span>
                </h2>

                <p className="mx-auto max-w-3xl px-6 text-lg text-white/70 font-light leading-relaxed">
                  Experience the perfect fusion of gaming and fitness. Earn XP, unlock achievements, 
                  compete with friends, and transform every workout into an engaging adventure.
                </p>
              </motion.div>
            </div>

            {/* Enhanced Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              {[
                {
                  icon: Target,
                  title: 'AI-Powered Workouts',
                  description: 'Personalized routines that evolve with your progress',
                  color: 'from-cyan-400 to-blue-500',
                  bgColor: 'from-cyan-500/10 to-blue-500/10'
                },
                {
                  icon: Trophy,
                  title: 'Epic Rewards System',
                  description: 'Level up, earn coins, unlock achievements',
                  color: 'from-yellow-400 to-orange-500',
                  bgColor: 'from-yellow-500/10 to-orange-500/10'
                },
                {
                  icon: Gamepad2,
                  title: 'Interactive Games',
                  description: 'Turn exercises into engaging mini-games',
                  color: 'from-purple-400 to-pink-500',
                  bgColor: 'from-purple-500/10 to-pink-500/10'
                },
                {
                  icon: Users,
                  title: 'Squad Battles',
                  description: 'Team up with friends for epic challenges',
                  color: 'from-green-400 to-emerald-500',
                  bgColor: 'from-green-500/10 to-emerald-500/10'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className={`group relative glass-morphism rounded-2xl p-6 hover:scale-105 transition-all duration-300 bg-gradient-to-br ${feature.bgColor}`}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-white text-xl mb-2">{feature.title}</h3>
                      <p className="text-white/70 text-sm font-light leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
            
            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="grid grid-cols-3 gap-8 mb-12"
            >
              {[
                { value: '10K+', label: 'Active Players', icon: Users },
                { value: '50M+', label: 'Workouts Completed', icon: Zap },
                { value: '4.9★', label: 'User Rating', icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center glass-morphism rounded-2xl p-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-3xl font-light text-white mb-2">{stat.value}</div>
                  <div className="text-white/60 text-sm font-light">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  onClick={onNext}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-12 py-6 font-medium tracking-wide flex items-center space-x-4 text-xl rounded-2xl shadow-2xl border-0 glow-animation"
                >
                  <Rocket className="w-6 h-6" />
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
                transition={{ delay: 1.8 }}
                className="text-white/60 font-light text-center sm:text-left"
              >
                <div className="text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  Free to start
                </div>
                <div className="text-xs">No credit card required</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Enhanced 3D visual area */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="relative float-animation"
            >
              {/* Central logo/icon with enhanced design */}
              <motion.div
                className="w-48 h-48 glass-morphism rounded-[2rem] flex items-center justify-center relative overflow-hidden shadow-2xl"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Inner glow effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[2rem]" />
                <div className="absolute inset-4 bg-gradient-to-tr from-white/10 to-transparent rounded-[1.5rem]" />
                <Zap className="w-24 h-24 text-white relative z-10" />
                
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400/30 rounded-[2rem]"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Enhanced orbiting elements */}
              {[
                { icon: Target, delay: 0, radius: 120, color: 'text-cyan-400' },
                { icon: Trophy, delay: 1, radius: 120, color: 'text-yellow-400' },
                { icon: Gamepad2, delay: 2, radius: 120, color: 'text-purple-400' },
                { icon: Users, delay: 3, radius: 120, color: 'text-green-400' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute w-20 h-20 glass-morphism rounded-2xl flex items-center justify-center shadow-lg"
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
                    marginLeft: '-40px',
                    marginTop: '-40px'
                  }}
                >
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </motion.div>
              ))}

              {/* Enhanced outer ring particles */}
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={`outer-${i}`}
                  className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg"
                  animate={{
                    rotate: [0, 360],
                    x: [
                      Math.cos((i * 22.5) * Math.PI / 180) * 180,
                      Math.cos((i * 22.5 + 360) * Math.PI / 180) * 180
                    ],
                    y: [
                      Math.sin((i * 22.5) * Math.PI / 180) * 180,
                      Math.sin((i * 22.5 + 360) * Math.PI / 180) * 180
                    ],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-6px',
                    marginTop: '-6px'
                  }}
                />
              ))}

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-6 h-6 text-cyan-400"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Crown className="w-6 h-6" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-8 -left-8 w-6 h-6 text-purple-400"
                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </div>
  );
}