import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Button } from '../common/Button';
import { BackButton } from '../common/BackButton';

interface UserInfoProps {
  onNext: (data: { name: string; age: number; email: string }) => void;
  onBack: () => void;
}

export function UserInfo({ onNext, onBack }: UserInfoProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.email) {
      onNext({
        name: formData.name,
        age: parseInt(formData.age),
        email: formData.email
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          <BackButton onClick={onBack} className="absolute top-8 left-8" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <User className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Tell us about yourself</h2>
              <p className="text-white/70">Let's personalize your epic journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Hero Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your hero name"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your age"
                  min="13"
                  max="100"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <Button 
                  type="submit" 
                  size="lg"
                  variant="cosmic"
                  className="w-full"
                  glowEffect
                >
                  Continue Quest
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}