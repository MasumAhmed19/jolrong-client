'use client';
import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"];

const opacity: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
};

const customEase = [0.76, 0, 0.24, 1] as const;

const slideUp: Variants = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: customEase, delay: 0.2 },
  },
};

const Preloader1 = () => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateDimensions = () => {
      setDimension({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
    return () => clearTimeout(timeout);
  }, [index]);

  // Don't render until we're on the client and have dimensions
  if (!isClient || dimension.width === 0) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#141516',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        color: 'white',
        fontSize: '4rem',
        fontWeight: 'bold'
      }}>
        Hello
      </div>
    );
  }

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${
    dimension.height + 300
  } 0 ${dimension.height} L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${
    dimension.height
  } L0 0`;

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: customEase },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: customEase, delay: 0.3 },
    },
  };

  return (
    <motion.div 
      variants={slideUp} 
      initial="initial" 
      exit="exit" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#141516',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}
    >
      <motion.p 
        variants={opacity} 
        initial="initial" 
        animate="enter"
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: 'white',
          margin: 0,
          position: 'relative',
          zIndex: 1000,
          userSelect: 'none',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <span></span>
        {words[index]}
      </motion.p>
      <svg 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
        width={dimension.width} 
        height={dimension.height} 
        viewBox={`0 0 ${dimension.width} ${dimension.height}`} 
        preserveAspectRatio="none"
      >
        <motion.path 
          variants={curve} 
          initial="initial" 
          exit="exit" 
          style={{ fill: '#141516' }}
        />
      </svg>
    </motion.div>
  );
};

export default Preloader1;