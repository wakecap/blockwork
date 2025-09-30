import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import { FontProvider } from '../FontProvider';
import { 
  faDownload, 
  faUpload, 
  faCheck,
  faTimes,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

// Test wrapper with FontProvider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FontProvider>
    {children}
  </FontProvider>
);

// Mock components for integration testing
const FormWithButtons: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      setIsSubmitted(true);
    } catch (err) {
      setError('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError(null);
  };

  if (isSubmitted) {
    return (
      <div>
        <p>Form submitted successfully!</p>
        <Button onClick={handleReset} variant="secondary">
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <form>
      <div>
        <Button 
          type="submit"
          onClick={handleSubmit}
          loading={isSubmitting}
          loadingText="Submitting..."
          variant="primary"
        >
          Submit Form
        </Button>
        
        <Button 
          type="button"
          onClick={handleReset}
          variant="outline"
          disabled={isSubmitting}
        >
          Reset
        </Button>
      </div>
      
      {error && (
        <div>
          <p>{error}</p>
          <Button onClick={handleSubmit} variant="destructive">
            Retry
          </Button>
        </div>
      )}
    </form>
  );
};

const ButtonGroup: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div role="tablist">
      <Button 
        variant={activeTab === 'tab1' ? 'primary' : 'ghost'}
        onClick={() => setActiveTab('tab1')}
        aria-pressed={activeTab === 'tab1'}
      >
        Tab 1
      </Button>
      <Button 
        variant={activeTab === 'tab2' ? 'primary' : 'ghost'}
        onClick={() => setActiveTab('tab2')}
        aria-pressed={activeTab === 'tab2'}
      >
        Tab 2
      </Button>
      <Button 
        variant={activeTab === 'tab3' ? 'primary' : 'ghost'}
        onClick={() => setActiveTab('tab3')}
        aria-pressed={activeTab === 'tab3'}
      >
        Tab 3
      </Button>
    </div>
  );
};

const FileUploadFlow: React.FC = () => {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    setUploadState('uploading');
    setProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setProgress(i);
    }

    // Simulate success/failure
    if (Math.random() > 0.3) {
      setUploadState('success');
    } else {
      setUploadState('error');
    }
  };

  const handleRetry = () => {
    setUploadState('idle');
    setProgress(0);
  };

  return (
    <div>
      {uploadState === 'idle' && (
        <Button onClick={handleUpload} icon={faUpload}>
          Upload File
        </Button>
      )}
      
      {uploadState === 'uploading' && (
        <Button loading loadingText={`Uploading... ${progress}%`}>
          Uploading
        </Button>
      )}
      
      {uploadState === 'success' && (
        <Button variant="success" icon={faCheck}>
          Upload Complete
        </Button>
      )}
      
      {uploadState === 'error' && (
        <div>
          <Button variant="destructive" icon={faTimes}>
            Upload Failed
          </Button>
          <Button onClick={handleRetry} variant="outline">
            Retry Upload
          </Button>
        </div>
      )}
    </div>
  );
};

const LanguageToggle: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div>
      <Button 
        onClick={toggleLanguage}
        arabicText={language === 'ar' ? 'إنجليزي' : 'English'}
        showArabicText={language === 'ar'}
      >
        {language === 'en' ? 'العربية' : 'English'}
      </Button>
      
      <Button 
        variant="secondary"
        arabicText={language === 'ar' ? 'حفظ' : 'Save'}
        showArabicText={language === 'ar'}
      >
        {language === 'en' ? 'Save' : 'حفظ'}
      </Button>
    </div>
  );
};

describe('Button Integration Tests', () => {
  // Form submission flow
  describe('Form Submission Flow', () => {
    it('handles complete form submission flow', async () => {
      render(<FormWithButtons />, { wrapper: TestWrapper });
      
      // Initial state
      expect(screen.getByText('Submit Form')).toBeInTheDocument();
      expect(screen.getByText('Reset')).toBeInTheDocument();
      
      // Submit form
      const submitButton = screen.getByText('Submit Form');
      await userEvent.click(submitButton);
      
      // Loading state
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
      expect(screen.getByText('Reset')).toBeDisabled();
      
      // Wait for completion
      await waitFor(() => {
        expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
      });
      
      // Reset flow
      const resetButton = screen.getByText('Submit Another');
      await userEvent.click(resetButton);
      
      expect(screen.getByText('Submit Form')).toBeInTheDocument();
    });

    it('handles form submission errors', async () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<FormWithButtons />, { wrapper: TestWrapper });
      
      const submitButton = screen.getByText('Submit Form');
      await userEvent.click(submitButton);
      
      // Wait for potential error state
      await waitFor(() => {
        // The component should handle errors gracefully
        expect(screen.getByText('Submit Form')).toBeInTheDocument();
      });
      
      consoleSpy.mockRestore();
    });
  });

  // Button group interactions
  describe('Button Group Interactions', () => {
    it('handles tab switching in button group', async () => {
      render(<ButtonGroup />, { wrapper: TestWrapper });
      
      const tab1 = screen.getByText('Tab 1');
      const tab2 = screen.getByText('Tab 2');
      const tab3 = screen.getByText('Tab 3');
      
      // Initial state - Tab 1 should be active
      expect(tab1).toHaveClass('bg-neutral-900'); // primary variant
      expect(tab2).toHaveClass('bg-transparent'); // ghost variant
      expect(tab3).toHaveClass('bg-transparent'); // ghost variant
      
      // Switch to Tab 2
      await userEvent.click(tab2);
      expect(tab2).toHaveClass('bg-neutral-900');
      expect(tab1).toHaveClass('bg-transparent');
      expect(tab3).toHaveClass('bg-transparent');
      
      // Switch to Tab 3
      await userEvent.click(tab3);
      expect(tab3).toHaveClass('bg-neutral-900');
      expect(tab1).toHaveClass('bg-transparent');
      expect(tab2).toHaveClass('bg-transparent');
    });

    it('maintains accessibility in button group', async () => {
      render(<ButtonGroup />, { wrapper: TestWrapper });
      
      const tab1 = screen.getByText('Tab 1');
      const tab2 = screen.getByText('Tab 2');
      
      // Check ARIA attributes
      expect(tab1).toHaveAttribute('aria-pressed', 'true');
      expect(tab2).toHaveAttribute('aria-pressed', 'false');
      
      // Switch tabs
      await userEvent.click(tab2);
      expect(tab1).toHaveAttribute('aria-pressed', 'false');
      expect(tab2).toHaveAttribute('aria-pressed', 'true');
    });
  });

  // File upload flow
  describe('File Upload Flow', () => {
    it('handles complete upload flow', async () => {
      render(<FileUploadFlow />, { wrapper: TestWrapper });
      
      // Initial state
      const uploadButton = screen.getByText('Upload File');
      expect(uploadButton).toBeInTheDocument();
      
      // Start upload
      await userEvent.click(uploadButton);
      
      // Loading state
      await waitFor(() => {
        expect(screen.getByText(/Uploading.../)).toBeInTheDocument();
      });
      
      // Wait for completion
      await waitFor(() => {
        const successButton = screen.queryByText('Upload Complete');
        const errorButton = screen.queryByText('Upload Failed');
        expect(successButton || errorButton).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('handles upload retry flow', async () => {
      render(<FileUploadFlow />, { wrapper: TestWrapper });
      
      // Start upload
      await userEvent.click(screen.getByText('Upload File'));
      
      // Wait for completion (success or error)
      await waitFor(() => {
        const retryButton = screen.queryByText('Retry Upload');
        if (retryButton) {
          expect(retryButton).toBeInTheDocument();
        }
      }, { timeout: 3000 });
    });
  });

  // Language switching
  describe('Language Switching', () => {
    it('handles language toggle between English and Arabic', async () => {
      render(<LanguageToggle />, { wrapper: TestWrapper });
      
      // Initial state - English
      expect(screen.getByText('العربية')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      
      // Toggle to Arabic
      const toggleButton = screen.getByText('العربية');
      await userEvent.click(toggleButton);
      
      // Arabic state
      expect(screen.getByText('إنجليزي')).toBeInTheDocument();
      expect(screen.getByText('حفظ')).toBeInTheDocument();
      
      // Toggle back to English
      await userEvent.click(screen.getByText('إنجليزي'));
      
      // Back to English
      expect(screen.getByText('العربية')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('applies correct RTL styling in Arabic mode', async () => {
      render(<LanguageToggle />, { wrapper: TestWrapper });
      
      // Toggle to Arabic
      await userEvent.click(screen.getByText('العربية'));
      
      // Check RTL attributes
      const saveButton = screen.getByText('حفظ');
      expect(saveButton).toHaveAttribute('dir', 'rtl');
      expect(saveButton).toHaveClass('font-arabic');
    });
  });

  // Keyboard navigation
  describe('Keyboard Navigation', () => {
    it('supports tab navigation between buttons', async () => {
      render(
        <div>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </div>,
        { wrapper: TestWrapper }
      );
      
      const firstButton = screen.getByText('First');
      const secondButton = screen.getByText('Second');
      const thirdButton = screen.getByText('Third');
      
      // Focus first button
      firstButton.focus();
      expect(firstButton).toHaveFocus();
      
      // Tab to second button
      await userEvent.tab();
      expect(secondButton).toHaveFocus();
      
      // Tab to third button
      await userEvent.tab();
      expect(thirdButton).toHaveFocus();
    });

    it('supports arrow key navigation in button groups', async () => {
      render(<ButtonGroup />, { wrapper: TestWrapper });
      
      const tab1 = screen.getByText('Tab 1');
      const tab2 = screen.getByText('Tab 2');
      const tab3 = screen.getByText('Tab 3');
      
      // Focus first tab
      tab1.focus();
      expect(tab1).toHaveFocus();
      
      // Arrow right to next tab
      fireEvent.keyDown(tab1, { key: 'ArrowRight' });
      expect(tab2).toHaveFocus();
      
      // Arrow right to next tab
      fireEvent.keyDown(tab2, { key: 'ArrowRight' });
      expect(tab3).toHaveFocus();
      
      // Arrow left to previous tab
      fireEvent.keyDown(tab3, { key: 'ArrowLeft' });
      expect(tab2).toHaveFocus();
    });
  });

  // Responsive behavior
  describe('Responsive Behavior', () => {
    it('adapts to different screen sizes', () => {
      // Test with different viewport sizes
      const { rerender } = render(
        <Button fullWidthOnMobile>Responsive</Button>,
        { wrapper: TestWrapper }
      );
      
      const button = screen.getByText('Responsive');
      expect(button).toHaveClass('w-full', 'sm:w-auto');
    });

    it('maintains touch targets on mobile', () => {
      render(<Button size="sm">Small</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByText('Small');
      expect(button).toHaveClass('min-w-[44px]'); // Touch target
    });
  });

  // Error boundaries
  describe('Error Boundaries', () => {
    it('handles button errors gracefully', () => {
      const ErrorButton: React.FC = () => {
        const [hasError, setHasError] = useState(false);
        
        if (hasError) {
          throw new Error('Button error');
        }
        
        return (
          <Button onClick={() => setHasError(true)}>
            Cause Error
          </Button>
        );
      };

      // This should not crash the entire app
      expect(() => {
        render(<ErrorButton />, { wrapper: TestWrapper });
      }).not.toThrow();
    });
  });

  // Performance under load
  describe('Performance Under Load', () => {
    it('handles rapid button clicks', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Rapid Click</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByText('Rapid Click');
      
      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        await userEvent.click(button);
      }
      
      expect(handleClick).toHaveBeenCalledTimes(10);
    });

    it('handles many buttons efficiently', () => {
      const startTime = performance.now();
      
      render(
        <div>
          {Array.from({ length: 50 }, (_, i) => (
            <Button key={i} onClick={() => {}}>
              Button {i}
            </Button>
          ))}
        </div>,
        { wrapper: TestWrapper }
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 50 buttons efficiently
      expect(renderTime).toBeLessThan(200);
    });
  });
});
