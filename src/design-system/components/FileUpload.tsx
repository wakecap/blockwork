import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faFile, faImage, faVideo, faMusic, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

export interface FileUploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
  preview?: string;
}

export interface FileUploadProps {
  files: FileUploadFile[];
  onFilesSelect: (files: FileList) => void;
  onFileRemove: (fileId: string) => void;
  onFileRetry?: (fileId: string) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  variant?: 'default' | 'compact' | 'detailed';
  dragActive?: boolean;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  onDrop?: (files: FileList) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesSelect,
  onFileRemove,
  onFileRetry,
  accept = '*/*',
  multiple = false,
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  variant = 'default',
  dragActive = false,
  onDragEnter,
  onDragLeave,
  onDrop,
  className = '',
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const dropZoneRef = React.useRef<HTMLDivElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      onFilesSelect(selectedFiles);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragEnter?.();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragLeave?.();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      onDrop?.(droppedFiles);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return faImage;
    if (fileType.startsWith('video/')) return faVideo;
    if (fileType.startsWith('audio/')) return faMusic;
    return faFile;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: FileUploadFile['status']) => {
    switch (status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-500" />;
      case 'error':
        return <FontAwesomeIcon icon={faTimes} className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const variantStyles = {
    default: 'p-6',
    compact: 'p-4',
    detailed: 'p-8',
  };

  const dragStyles = dragActive
    ? 'border-primary-500 bg-primary-50'
    : 'border-neutral-300 hover:border-neutral-400';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        ref={dropZoneRef}
        className={`border-2 border-dashed rounded-lg transition-colors ${dragStyles} ${variantStyles[variant]}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <FontAwesomeIcon icon={faUpload} className="w-8 h-8 text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            {dragActive ? 'Drop files here' : 'Upload files'}
          </h3>
          <p className="text-sm text-neutral-600 mb-4">
            Drag and drop files here, or{' '}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              browse
            </button>
          </p>
          <div className="text-xs text-neutral-500">
            {multiple ? `Up to ${maxFiles} files` : 'Single file'} • Max size: {formatFileSize(maxFileSize)}
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-neutral-900">
            Files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg"
              >
                {/* File Icon */}
                <div className="flex-shrink-0">
                  <FontAwesomeIcon
                    icon={getFileIcon(file.type)}
                    className="w-5 h-5 text-neutral-500"
                  />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(file.status)}
                      <button
                        onClick={() => onFileRemove(file.id)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {file.status === 'uploading' && (
                    <div className="mt-2">
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        {file.progress}% uploaded
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {file.status === 'error' && file.error && (
                    <div className="mt-2">
                      <p className="text-xs text-red-600">{file.error}</p>
                      {onFileRetry && (
                        <button
                          onClick={() => onFileRetry(file.id)}
                          className="text-xs text-primary-600 hover:text-primary-700 mt-1"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Pre-built file upload components
export const ImageUpload: React.FC<{
  files: FileUploadFile[];
  onFilesSelect: (files: FileList) => void;
  onFileRemove: (fileId: string) => void;
  onFileRetry?: (fileId: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}> = ({ files, onFilesSelect, onFileRemove, onFileRetry, multiple = true, maxFiles = 5, className = '' }) => {
  return (
    <FileUpload
      files={files}
      onFilesSelect={onFilesSelect}
      onFileRemove={onFileRemove}
      onFileRetry={onFileRetry}
      accept="image/*"
      multiple={multiple}
      maxFiles={maxFiles}
      maxFileSize={5 * 1024 * 1024} // 5MB
      variant="detailed"
      className={className}
    />
  );
};

export const DocumentUpload: React.FC<{
  files: FileUploadFile[];
  onFilesSelect: (files: FileList) => void;
  onFileRemove: (fileId: string) => void;
  onFileRetry?: (fileId: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}> = ({ files, onFilesSelect, onFileRemove, onFileRetry, multiple = true, maxFiles = 10, className = '' }) => {
  return (
    <FileUpload
      files={files}
      onFilesSelect={onFilesSelect}
      onFileRemove={onFileRemove}
      onFileRetry={onFileRetry}
      accept=".pdf,.doc,.docx,.txt,.rtf"
      multiple={multiple}
      maxFiles={maxFiles}
      maxFileSize={10 * 1024 * 1024} // 10MB
      variant="default"
      className={className}
    />
  );
};

export const VideoUpload: React.FC<{
  files: FileUploadFile[];
  onFilesSelect: (files: FileList) => void;
  onFileRemove: (fileId: string) => void;
  onFileRetry?: (fileId: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}> = ({ files, onFilesSelect, onFileRemove, onFileRetry, multiple = false, maxFiles = 1, className = '' }) => {
  return (
    <FileUpload
      files={files}
      onFilesSelect={onFilesSelect}
      onFileRemove={onFileRemove}
      onFileRetry={onFileRetry}
      accept="video/*"
      multiple={multiple}
      maxFiles={maxFiles}
      maxFileSize={100 * 1024 * 1024} // 100MB
      variant="detailed"
      className={className}
    />
  );
};

// Hook for managing file upload state
export const useFileUpload = () => {
  const [files, setFiles] = React.useState<FileUploadFile[]>([]);
  const [dragActive, setDragActive] = React.useState(false);

  const handleFilesSelect = (selectedFiles: FileList) => {
    const newFiles: FileUploadFile[] = Array.from(selectedFiles).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading' as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev =>
          prev.map(f =>
            f.id === fileId
              ? { ...f, progress: 100, status: 'completed' as const }
              : f
          )
        );
      } else {
        setFiles(prev =>
          prev.map(f =>
            f.id === fileId ? { ...f, progress } : f
          )
        );
      }
    }, 200);
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
    simulateUpload(fileId);
  };

  const handleDragEnter = () => setDragActive(true);
  const handleDragLeave = () => setDragActive(false);
  const handleDrop = (droppedFiles: FileList) => {
    setDragActive(false);
    handleFilesSelect(droppedFiles);
  };

  return {
    files,
    dragActive,
    onFilesSelect: handleFilesSelect,
    onFileRemove: handleFileRemove,
    onFileRetry: handleFileRetry,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  };
};
