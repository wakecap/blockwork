import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blockwork Design System</h1>
          <p className="text-xl text-gray-600 mb-12">
            A comprehensive design system built with React, TypeScript, and Tailwind CSS
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to the Design System
            </h2>
            <p className="text-gray-600 mb-6">
              This application showcases our component library. For detailed component documentation
              and interactive examples, please visit our Storybook.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="http://localhost:6006"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Storybook
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
