import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About Us
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            We're on a mission to create the world's finest basketballs, combining traditional craftsmanship with cutting-edge technology.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="card-tech">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2004 by former professional basketball players, Hoops began with a simple vision: to create basketballs that perform at the highest level while inspiring the next generation of athletes.
              </p>
              <p>
                What started in a small workshop has grown into a global brand trusted by professional leagues, college programs, and recreational players worldwide. Our commitment to quality remains unchanged—every basketball we produce undergoes rigorous testing to ensure it meets our exacting standards.
              </p>
              <p>
                Today, Hoops continues to push the boundaries of basketball technology while staying true to our roots. We believe that the perfect basketball can make the difference between a good game and a great one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-50" />
        <div className="absolute inset-0 purple-blur opacity-30" />
        
        <div className="relative z-10 container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Excellence',
                description: 'We never compromise on quality. Every product represents our highest standards.'
              },
              {
                title: 'Innovation',
                description: 'We constantly push boundaries, integrating new technologies to enhance performance.'
              },
              {
                title: 'Community',
                description: 'We support basketball at all levels, from youth programs to professional leagues.'
              }
            ].map((value) => (
              <div key={value.title} className="card-tech text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our love for basketball and innovation.
          </p>
          <a href="/contact" className="btn-primary inline-flex items-center justify-center">
            View Open Positions
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default About;
