import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload, ImageUpload, DocumentUpload, VideoUpload, useFileUpload } from '../components/FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Forms & Data Entry/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A file upload component with drag & drop functionality, progress tracking, and various file type support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed'],
    },
    multiple: {
      control: { type: 'boolean' },
    },
    showPresets: {
      control: { type: 'boolean' },
    },
    showInput: {
      control: { type: 'boolean' },
    },
    showPreview: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { files, dragActive, onFilesSelect, onFileRemove, onFileRetry, onDragEnter, onDragLeave, onDrop } = useFileUpload();

    return (
      <FileUpload
        files={files}
        onFilesSelect={onFilesSelect}
        onFileRemove={onFileRemove}
        onFileRetry={onFileRetry}
        dragActive={dragActive}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="w-full max-w-2xl"
      />
    );
  },
};

export const Compact: Story = {
  render: () => {
    const { files, dragActive, onFilesSelect, onFileRemove, onFileRetry, onDragEnter, onDragLeave, onDrop } = useFileUpload();

    return (
      <FileUpload
        files={files}
        onFilesSelect={onFilesSelect}
        onFileRemove={onFileRemove}
        onFileRetry={onFileRetry}
        dragActive={dragActive}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        variant="compact"
        className="w-full max-w-2xl"
      />
    );
  },
};

export const Detailed: Story = {
  render: () => {
    const { files, dragActive, onFilesSelect, onFileRemove, onFileRetry, onDragEnter, onDragLeave, onDrop } = useFileUpload();

    return (
      <FileUpload
        files={files}
        onFilesSelect={onFilesSelect}
        onFileRemove={onFileRemove}
        onFileRetry={onFileRetry}
        dragActive={dragActive}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        variant="detailed"
        className="w-full max-w-2xl"
      />
    );
  },
};

export const SingleFile: Story = {
  render: () => {
    const { files, dragActive, onFilesSelect, onFileRemove, onFileRetry, onDragEnter, onDragLeave, onDrop } = useFileUpload();

    return (
      <FileUpload
        files={files}
        onFilesSelect={onFilesSelect}
        onFileRemove={onFileRemove}
        onFileRetry={onFileRetry}
        dragActive={dragActive}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        multiple={false}
        maxFiles={1}
        className="w-full max-w-2xl"
      />
    );
  },
};

export const WithCustomAccept: Story = {
  render: () => {
    const { files, dragActive, onFilesSelect, onFileRemove, onFileRetry, onDragEnter, onDragLeave, onDrop } = useFileUpload();

    return (
      <FileUpload
        files={files}
        onFilesSelect={onFilesSelect}
        onFileRemove={onFileRemove}
        onFileRetry={onFileRetry}
        dragActive={dragActive}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        accept=".pdf,.doc,.docx,.txt"
        maxFileSize={5 * 1024 * 1024} // 5MB
        className="w-full max-w-2xl"
      />
    );
  },
};

// Pre-built file upload components
export const ImageUploadExample: Story = {
  render: () => {
    const { files, dragActive, onFilesSelect, onFileRemove, onFileRetry, onDragEnter, onDragLeave, onDrop } = useFileUpload();

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Upload Images</h2>
        <ImageUpload
          files={files}
          onFilesSelect={onFilesSelect}
          onFileRemove={onFileRemove}
          onFileRetry={onFileRetry}
          dragActive={dragActive}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          multiple={true}
          maxFiles={5}
        />
      </div>
    );
  },
};

export const DocumentUploadExample: Story = {
  render: () => {
    const { files, dragActive, onFilesSelect, onFileRemove, onFileRetry, onDragEnter, onDragLeave, onDrop } = useFileUpload();

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Upload Documents</h2>
        <DocumentUpload
          files={files}
          onFilesSelect={onFilesSelect}
          onFileRemove={onFileRemove}
          onFileRetry={onFileRetry}
          dragActive={dragActive}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          multiple={true}
          maxFiles={10}
        />
      </div>
    );
  },
};

export const VideoUploadExample: Story = {
  render: () => {
    const { files, dragActive, onFilesSelect, onFileRemove, onFileRetry, onDragEnter, onDragLeave, onDrop } = useFileUpload();

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Upload Video</h2>
        <VideoUpload
          files={files}
          onFilesSelect={onFilesSelect}
          onFileRemove={onFileRemove}
          onFileRetry={onFileRetry}
          dragActive={dragActive}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          multiple={false}
          maxFiles={1}
        />
      </div>
    );
  },
};

export const WithExistingFiles: Story = {
  render: () => {
    const [files, setFiles] = React.useState([
      {
        id: '1',
        name: 'document.pdf',
        size: 1024 * 1024, // 1MB
        type: 'application/pdf',
        progress: 100,
        status: 'completed' as const,
      },
      {
        id: '2',
        name: 'image.jpg',
        size: 512 * 1024, // 512KB
        type: 'image/jpeg',
        progress: 75,
        status: 'uploading' as const,
      },
      {
        id: '3',
        name: 'large-file.zip',
        size: 50 * 1024 * 1024, // 50MB
        type: 'application/zip',
        progress: 0,
        status: 'error' as const,
        error: 'File too large',
      },
    ]);

    const handleFilesSelect = (selectedFiles: FileList) => {
      const newFiles = Array.from(selectedFiles).map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading' as const,
      }));
      setFiles(prev => [...prev, ...newFiles]);
    };

    const handleFileRemove = (fileId: string) => {
      setFiles(prev => prev.filter(f => f.id !== fileId));
    };

    const handleFileRetry = (fileId: string) => {
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? { ...f, progress: 0, status: 'uploading' as const, error: undefined }
            : f
        )
      );
    };

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">File Upload with Existing Files</h2>
        <FileUpload
          files={files}
          onFilesSelect={handleFilesSelect}
          onFileRemove={handleFileRemove}
          onFileRetry={handleFileRetry}
          multiple={true}
          maxFiles={10}
          maxFileSize={100 * 1024 * 1024} // 100MB
        />
      </div>
    );
  },
};

export const PhotoGalleryUpload: Story = {
  render: () => {
    const { files, dragActive, onFilesSelect, onFileRemove, onFileRetry, onDragEnter, onDragLeave, onDrop } = useFileUpload();

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Photo Gallery Upload</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Upload Photos</h3>
            <ImageUpload
              files={files}
              onFilesSelect={onFilesSelect}
              onFileRemove={onFileRemove}
              onFileRetry={onFileRetry}
              dragActive={dragActive}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              multiple={true}
              maxFiles={10}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Upload Requirements</h3>
            <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Maximum 10 photos per upload</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Supported formats: JPG, PNG, GIF</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Maximum file size: 5MB per photo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Recommended resolution: 1920x1080 or higher</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
