// Import TopNavigator from the dist build output
// @ts-expect-error - dist build output
import { TopNavigator } from "../dist/design-system/components/TopNavigator.js";
import "../dist/styles.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* TopNavigator Component from dist folder */}
      <TopNavigator />

      {/* Playground content area */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              TopNavigator Component Playground
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Testing the TopNavigator component from the dist build output
            </p>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Build Output Test</h2>
              <p className="text-gray-600 mb-6">
                The TopNavigator component above is imported from the{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">dist/</code> folder, which contains
                the built and packaged version of the component.
              </p>
              <p className="text-gray-600 mb-6">
                This allows you to test how the component will work when consumed as a package.
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
