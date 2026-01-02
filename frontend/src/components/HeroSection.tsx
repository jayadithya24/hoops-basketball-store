import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-6">
          Engineered for
          <span className="block text-primary text-glow-purple">Performance</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Premium basketballs crafted with cutting-edge technology for athletes who refuse to settle for anything less than excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products" className="btn-primary inline-flex items-center justify-center">
            Explore Products
          </Link>
          <Link 
            to="/about" 
            className="px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted/50 transition-all duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
