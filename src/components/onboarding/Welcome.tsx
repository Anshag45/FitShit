import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Trophy, Sparkles, Gamepad2, Users } from 'lucide-react';
import { Button } from '../common/Button';
import { FloatingTriangles } from '../effects/FloatingTriangles';

interface WelcomeProps {
  onNext: () => void;
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingTriangles />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="text-white/60 text-sm font-light tracking-wide hover:text-white transition-colors cursor-pointer">FEATURES</div>
            <div className="text-white/60 text-sm font-light tracking-wide hover:text-white transition-colors cursor-pointer">WORKOUTS</div>
            <div className="text-white/60 text-sm font-light tracking-wide hover:text-white transition-colors cursor-pointer">GAMES</div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Zap className="w-5 h-5 text-black" />
            </motion.div>
            <span className="text-white font-light text-xl tracking-wide">FitQuest</span>
            <div className="text-white/40 text-xs bg-white/10 px-2 py-1 rounded border border-white/20">25</div>
          </motion.div>
          
          <div className="flex items-center space-x-8">
            <div className="text-white/60 text-sm font-light tracking-wide hover:text-white transition-colors cursor-pointer">WATCH DEMO</div>
            <div className="text-white/60 text-sm font-light tracking-wide hover:text-white transition-colors cursor-pointer">SIGN UP</div>
            <div className="text-white/60 text-sm font-light tracking-wide hover:text-white transition-colors cursor-pointer">LOGIN</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-7xl lg:text-8xl font-light text-white mb-8 leading-none tracking-tight"
            >
              FitQuest's one-day
              <br />
              event for fitness
              <br />
              and gaming leaders
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/70 font-light mb-12 leading-relaxed"
            >
              Transform your fitness journey into an epic gaming adventure. 
              Level up, earn rewards, and compete with friends in the ultimate 
              gamified fitness experience.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
              {[
                {
                  icon: Target,
                  title: 'AI-Powered Workouts',
                  description: 'Personalized routines that evolve with you'
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
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start space-x-4 bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/[0.05] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-light text-white text-lg mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm font-light">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-2 gap-8 mb-12"
            >
              <div>
                <div className="text-white/60 text-sm font-light tracking-wide mb-2">NEW YORK CITY</div>
                <div className="text-white/60 text-sm font-light tracking-wide">AND ONLINE</div>
              </div>
              <div>
                <div className="text-white/60 text-sm font-light tracking-wide mb-2">JUNE 25, 2025</div>
                <div className="text-white/60 text-sm font-light tracking-wide">THE GLASSHOUSE</div>
              </div>
            </motion.div>

            {/* Pricing & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex items-end space-x-16"
            >
              <div>
                <div className="text-white/60 text-sm font-light tracking-wide mb-2">ONLINE</div>
                <div className="text-white/60 text-sm font-light tracking-wide">FREE</div>
              </div>
              <div>
                <div className="text-white/60 text-sm font-light tracking-wide mb-2">IN-PERSON TICKETS</div>
                <div className="text-white/60 text-sm font-light tracking-wide">$600</div>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  onClick={onNext}
                  variant="primary"
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 px-8 py-4 font-light tracking-wide flex items-center space-x-3"
                  glowEffect
                >
                  <span>BEGIN YOUR QUEST</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Enhanced visual area */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="relative"
            >
              {/* Central logo/icon */}
              <motion.div
                className="w-32 h-32 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Zap className="w-16 h-16 text-white" />
              </motion.div>

              {/* Orbiting elements */}
              {[
                { icon: Target, delay: 0, radius: 80 },
                { icon: Trophy, delay: 1, radius: 80 },
                { icon: Gamepad2, delay: 2, radius: 80 },
                { icon: Users, delay: 3, radius: 80 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"
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
                    marginLeft: '-24px',
                    marginTop: '-24px'
                  }}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </motion.div>
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