import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface RememberMeToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function RememberMeToggle({ checked, onChange, label = "Remember me" }: RememberMeToggleProps) {
  return (
    <motion.div
      className="flex items-center space-x-3 cursor-pointer"
      onClick={() => onChange(!checked)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        <motion.div
          className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
            checked 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400' 
              : 'bg-white/10 border-white/30'
          }`}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: checked ? 1 : 0, 
              opacity: checked ? 1 : 0 
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
      </div>
      <span className="text-white/80 font-medium select-none">{label}</span>
    </motion.div>
  );
}