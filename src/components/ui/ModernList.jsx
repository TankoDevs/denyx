import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ModernList.css';

export const ModernList = ({ 
  children, 
  layout = 'list', // 'list' or 'grid'
  className = '',
  stagger = 0.1
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger
      }
    }
  };

  const containerClass = layout === 'grid' ? 'modern-grid-container' : 'modern-list-container';

  return (
    <motion.div 
      className={`${containerClass} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </motion.div>
  );
};

export const ModernListItem = ({ 
  children, 
  variant = 'default', // 'product', 'row', 'cart', 'content'
  onClick,
  className = '',
  delay = 0
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      scale: 0.95, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  const variantClass = {
    product: 'modern-product-card',
    row: 'modern-list-row',
    cart: 'modern-cart-item',
    content: 'modern-content-item',
    default: ''
  }[variant];

  return (
    <motion.div
      layout
      variants={itemVariants}
      whileHover="hover"
      className={`modern-item ${variantClass} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

export const EmptyState = ({ icon: Icon, title, message, children }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="modern-empty-state"
  >
    {Icon && <Icon size={48} className="modern-empty-icon" />}
    <h3>{title}</h3>
    <p style={{ color: 'var(--color-text-muted)' }}>{message}</p>
    {children}
  </motion.div>
);

export const SkeletonItem = ({ variant = 'row' }) => (
  <div className={`modern-item modern-${variant}-card skeleton`} style={{ minHeight: variant === 'row' ? '80px' : '350px' }}>
    {/* Just a skeleton block */}
  </div>
);
