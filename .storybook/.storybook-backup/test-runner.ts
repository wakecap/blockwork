import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from 'axe-playwright';

const config: TestRunnerConfig = {
  // Hook to run before each test
  async preVisit(page) {
    await injectAxe(page);
  },
  
  // Hook to run after each test
  async postVisit(page) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
  
  // Custom test configuration
  testTimeout: 60000,
  
  // Tags to include/exclude
  tags: {
    include: ['test'],
    exclude: ['docs'],
    skip: ['skip'],
  },
};

export default config;
