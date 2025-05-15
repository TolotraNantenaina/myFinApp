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
        className="bg-white rounded-2xl shadow-lg p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white"
      >
        <h2 className="text-blue-100 text-sm font-medium">Current Balance</h2>
        <div className="mt-2">
          <span className="text-4xl font-bold">
            €{balance.toLocaleString()}
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center p-4 bg-green-100 rounded-xl text-green-700 hover:bg-green-200 transition-colors"
        >
          <PlusIcon className="h-6 w-6 mr-2" />
          <span className="font-medium">Add Income</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center p-4 bg-red-100 rounded-xl text-red-700 hover:bg-red-200 transition-colors"
        >
          <MinusIcon className="h-6 w-6 mr-2" />
          <span className="font-medium">Add Expense</span>
        </motion.button>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer"
          >
            <div>
              <p className="font-medium text-gray-900">Groceries</p>
              <p className="text-sm text-gray-500">Today</p>
            </div>
            <span className="text-red-600 font-medium">-€45.00</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer"
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