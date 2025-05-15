import React from 'react';
import { motion } from 'framer-motion';

const Transactions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index % 2 === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {index % 2 === 0 ? '-' : '+'}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {index % 2 === 0 ? 'Expense' : 'Income'} #{index + 1}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`font-medium ${
                index % 2 === 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {index % 2 === 0 ? '-' : '+'}€{((index + 1) * 50).toFixed(2)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transactions;