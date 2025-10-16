import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Languages, Shuffle, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    {
      icon: Languages,
      title: 'Real-time Translation',
      description: 'Translate text between multiple languages instantly with AI-powered accuracy.',
    },
    {
      icon: Shuffle,
      title: 'String Generator',
      description: 'Generate secure random strings for passwords, tokens, and unique identifiers.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern React and optimized for speed and performance.',
    },
    {
      icon: Globe,
      title: 'Universal Access',
      description: 'Works seamlessly across all devices and platforms.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-secondary" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-8 shadow-glow"
            >
              <Languages className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                LinguaCraft
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your ultimate toolkit for language translation and text generation.
              Powered by cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/translator">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow">
                  <Languages className="w-5 h-5 mr-2" />
                  Try Translator
                </Button>
              </Link>
              <Link to="/randomizer">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Shuffle className="w-5 h-5 mr-2" />
                  String Generator
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for modern language and text processing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-glow transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center shadow-glow"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Explore our powerful language tools and experience the future of text processing.
            </p>
            <Link to="/translator">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
