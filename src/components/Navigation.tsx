import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, ChartBarIcon, CreditCardIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, href: '/' },
    { name: 'Statistics', icon: ChartBarIcon, href: '/statistics' },
    { name: 'Transactions', icon: CreditCardIcon, href: '/transactions' },
    { name: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex flex-col items-center p-4 relative ${
                  isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute inset-0 bg-blue-100 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className="h-6 w-6 relative z-10" />
                  <span className="text-xs mt-1 relative z-10">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;