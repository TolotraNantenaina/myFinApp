import React from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Currency</span>
              <select className="rounded-lg border-gray-300 bg-gray-50 px-4 py-2">
                <option>EUR (€)</option>
                <option>USD ($)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Language</span>
              <select className="rounded-lg border-gray-300 bg-gray-50 px-4 py-2">
                <option>English</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Daily Reminders</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium"
              >
                Enable
              </motion.button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Low Balance Alerts</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium"
              >
                Enable
              </motion.button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-medium"
            >
              Add New Category
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;