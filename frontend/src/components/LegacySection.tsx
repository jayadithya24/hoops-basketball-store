const LegacySection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Blue blur at bottom */}
      <div className="absolute inset-0 blue-blur" />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
          A Legacy of Excellence
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          For over two decades, Hoops has been the choice of champions. From street courts to professional arenas, our basketballs have been part of countless victories, records, and unforgettable moments in the sport's history.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '20+', label: 'Years' },
            { value: '50M+', label: 'Balls Sold' },
            { value: '100+', label: 'Countries' },
            { value: '500+', label: 'Pro Athletes' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
