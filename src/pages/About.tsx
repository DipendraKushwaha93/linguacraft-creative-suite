import { motion } from 'framer-motion';
import { Code, Heart, Zap, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const technologies = [
    { name: 'React 18', description: 'Modern UI library with hooks' },
    { name: 'Vite', description: 'Lightning-fast build tool' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'TypeScript', description: 'Type-safe JavaScript' },
    { name: 'Framer Motion', description: 'Smooth animations' },
    { name: 'React Router', description: 'Client-side routing' },
  ];

  const features = [
    {
      icon: Code,
      title: 'Modern Stack',
      description: 'Built with the latest web technologies for optimal performance and developer experience.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Powered by Vite for instant hot module replacement and optimized production builds.',
    },
    {
      icon: Heart,
      title: 'User-Focused',
      description: 'Designed with simplicity and usability in mind, making language tools accessible to everyone.',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">LinguaCraft</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A modern web application showcasing React best practices, beautiful UI design, and powerful language tools.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
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
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-card rounded-2xl p-8 border border-border shadow-card mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                className="bg-secondary/50 rounded-lg p-4 border border-border"
              >
                <h3 className="font-semibold text-foreground mb-1">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-gradient-primary rounded-2xl p-8 text-center shadow-glow"
        >
          <h2 className="text-2xl font-bold text-primary-foreground mb-4">
            Open Source & Customizable
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            This project demonstrates modern React development patterns including hooks (useState, useEffect, useCallback),
            component composition, and responsive design. Feel free to explore the code and customize it for your needs.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </a>
          </Button>
        </motion.div>

        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-12 bg-secondary/50 rounded-lg p-8 border border-border"
        >
          <h3 className="text-xl font-semibold mb-4">🚀 Getting Started</h3>
          <div className="space-y-3 text-muted-foreground">
            <div className="bg-muted/50 rounded p-4 font-mono text-sm">
              <div className="mb-2"># Install dependencies</div>
              <div className="text-foreground">npm install</div>
            </div>
            <div className="bg-muted/50 rounded p-4 font-mono text-sm">
              <div className="mb-2"># Start development server</div>
              <div className="text-foreground">npm run dev</div>
            </div>
            <div className="bg-muted/50 rounded p-4 font-mono text-sm">
              <div className="mb-2"># Build for production</div>
              <div className="text-foreground">npm run build</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm">
              <strong>📝 Note:</strong> To use the translator feature, you'll need to add your RapidAPI key.
              Check the setup instructions on the Translator page for more details.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
