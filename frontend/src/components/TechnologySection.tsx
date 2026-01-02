import { Grip, Shield, Zap } from 'lucide-react';

const technologies = [
  {
    icon: Grip,
    title: 'Advanced Grip',
    description: 'Micro-channel surface technology provides exceptional ball control in any condition.'
  },
  {
    icon: Shield,
    title: 'Durable Core',
    description: 'Reinforced butyl bladder maintains consistent air pressure throughout the game.'
  },
  {
    icon: Zap,
    title: 'Responsive Touch',
    description: 'Composite leather panels deliver premium feel and responsive feedback.'
  }
];

const TechnologySection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Tech grid background */}
      <div className="absolute inset-0 tech-grid" />
      
      {/* Purple blur */}
      <div className="absolute inset-0 purple-blur" />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Technology
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every Hoops basketball is engineered with proprietary technology that sets new standards for performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.title}
              className="card-tech group hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <tech.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{tech.title}</h3>
              <p className="text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
