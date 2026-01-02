import { Link } from 'react-router-dom';

const products = [
  {
    name: 'Pro Elite',
    description: 'Official game ball for professional leagues',
    price: '$149',
    image: 'https://images.unsplash.com/photo-1494199505258-5f95387f933c?w=400'
  },
  {
    name: 'Pro Training',
    description: 'Engineered for intensive practice sessions',
    price: '$99',
    image: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=400'
  },
  {
    name: 'Pro Street',
    description: 'Built for outdoor durability and performance',
    price: '$79',
    image: 'https://images.unsplash.com/photo-1559692048-79a3f837883d?w=400'
  }
];

const ProSeriesSection = () => {
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
            Professional Series
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Designed for those who compete at the highest level. Every detail engineered for victory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="card-tech group hover:border-primary/50 transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-muted/30 rounded-xl mb-4 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">{product.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{product.price}</span>
                <Link 
                  to="/products" 
                  className="text-sm text-primary hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products" className="btn-primary inline-flex items-center justify-center">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProSeriesSection;
