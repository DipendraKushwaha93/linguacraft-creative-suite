import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Languages, Shuffle, Info } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Languages },
    { path: '/translator', label: 'Translator', icon: Languages },
    { path: '/randomizer', label: 'Randomizer', icon: Shuffle },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"
            >
              <Languages className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LinguaCraft
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-primary rounded-lg"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-2 rounded-lg ${
                    isActive ? 'bg-gradient-primary text-primary-foreground' : 'text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
