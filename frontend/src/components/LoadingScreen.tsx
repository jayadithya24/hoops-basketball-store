import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background tech-grid animate-grid-move ${
        fadeOut ? 'loading-fade-out' : ''
      }`}
    >
      {/* Purple blur effect */}
      <div className="absolute inset-0 purple-blur opacity-50" />
      
      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-primary animate-pulse-glow">
          Hoops
        </h1>
        
        {/* Loading bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-[loading_2s_ease-in-out]" 
               style={{ animation: 'loading 2s ease-in-out forwards' }} />
        </div>
        
        {/* Loading text */}
        <p className="text-muted-foreground text-sm tracking-widest uppercase">
          Loading Experience
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
