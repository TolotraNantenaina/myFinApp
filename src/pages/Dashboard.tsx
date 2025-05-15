import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [balance, setBalance] = useState(1000);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-morphism rounded-3xl shadow-glass p-8 bg-gradient-to-br from-blue-500/90 to-blue-600/90 text-white"
      >
        <h2 className="text-blue-50 text-sm font-medium uppercase tracking-wider">Current Balance</h2>
        <div className="mt-3">
          <span className="text-5xl font-bold tracking-tight">
            €{balance.toLocaleString()}
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center p-6 glass-morphism rounded-2xl text-green-700 hover:bg-green-50/50 transition-all card-hover"
        >
          <PlusIcon className="h-6 w-6 mr-3" />
          <span className="font-semibold">Add Income</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center p-6 glass-morphism rounded-2xl text-red-700 hover:bg-red-50/50 transition-all card-hover"
        >
          <MinusIcon className="h-6 w-6 mr-3" />
          <span className="font-semibold">Add Expense</span>
        </motion.button>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-morphism rounded-3xl shadow-glass p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Recent Transactions
        </h2>
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 glass-morphism rounded-xl cursor-pointer card-hover"
          >
            <div>
              <p className="font-medium text-gray-900">Groceries</p>
              <p className="text-sm text-gray-500">Today</p>
            </div>
            <span className="text-red-600 font-medium">-€45.00</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 glass-morphism rounded-xl cursor-pointer card-hover"
          >
            <div>
              <p className="font-medium text-gray-900">Salary</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
            <span className="text-green-600 font-medium">+€2,500.00</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;