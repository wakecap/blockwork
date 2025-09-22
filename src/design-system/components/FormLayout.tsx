import React from 'react';

export interface FormField {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface FormGroup {
  id: string;
  title: string;
  description?: string;
  sections: FormSection[];
  variant?: 'default' | 'card' | 'bordered';
}

export interface FormLayoutProps {
  groups: FormGroup[];
  variant?: 'default' | 'compact' | 'spacious';
  layout?: 'vertical' | 'horizontal' | 'two-column';
  showSectionNumbers?: boolean;
  className?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  groups,
  variant = 'default',
  layout = 'vertical',
  showSectionNumbers = false,
  className = '',
}) => {
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(groups.flatMap(group => 
      group.sections
        .filter(section => section.defaultExpanded !== false)
        .map(section => `${group.id}-${section.id}`)
    ))
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const variantStyles = {
    default: 'space-y-6',
    compact: 'space-y-4',
    spacious: 'space-y-8',
  };

  const layoutStyles = {
    vertical: '',
    horizontal: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
    'two-column': 'grid grid-cols-1 lg:grid-cols-2 gap-8',
  };

  const groupVariantStyles = {
    default: '',
    card: 'bg-white rounded-lg shadow-sm border border-neutral-200 p-6',
    bordered: 'border border-neutral-200 rounded-lg p-6',
  };

  return (
    <div className={`${variantStyles[variant]} ${layoutStyles[layout]} ${className}`}>
      {groups.map((group, groupIndex) => (
        <div key={group.id} className={groupVariantStyles[group.variant || 'default']}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              {showSectionNumbers && `${groupIndex + 1}. `}{group.title}
            </h2>
            {group.description && (
              <p className="text-sm text-neutral-600">{group.description}</p>
            )}
          </div>

          <div className="space-y-6">
            {group.sections.map((section, sectionIndex) => {
              const sectionId = `${group.id}-${section.id}`;
              const isExpanded = expandedSections.has(sectionId);

              return (
                <div key={section.id} className="border border-neutral-200 rounded-lg">
                  {section.collapsible ? (
                    <button
                      onClick={() => toggleSection(sectionId)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {showSectionNumbers && (
                          <span className="text-sm font-medium text-neutral-500">
                            {groupIndex + 1}.{sectionIndex + 1}
                          </span>
                        )}
                        <h3 className="font-medium text-neutral-900">{section.title}</h3>
                      </div>
                      <svg
                        className={`w-5 h-5 text-neutral-500 transform transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <div className="p-4 border-b border-neutral-200">
                      <div className="flex items-center space-x-3">
                        {showSectionNumbers && (
                          <span className="text-sm font-medium text-neutral-500">
                            {groupIndex + 1}.{sectionIndex + 1}
                          </span>
                        )}
                        <h3 className="font-medium text-neutral-900">{section.title}</h3>
                      </div>
                      {section.description && (
                        <p className="text-sm text-neutral-600 mt-1">{section.description}</p>
                      )}
                    </div>
                  )}

                  {(!section.collapsible || isExpanded) && (
                    <div className="p-4">
                      <div className="space-y-4">
                        {section.fields.map((field) => (
                          <div key={field.id} className="space-y-2">
                            <label htmlFor={field.id} className="block text-sm font-medium text-neutral-700">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {field.children}
                            {field.helpText && (
                              <p className="text-sm text-neutral-500">{field.helpText}</p>
                            )}
                            {field.error && (
                              <p className="text-sm text-red-600">{field.error}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// Pre-built form layouts
export const UserProfileForm: React.FC<{
  onSubmit?: (data: any) => void;
  className?: string;
}> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const groups: FormGroup[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Basic information about yourself',
      variant: 'card',
      sections: [
        {
          id: 'basic',
          title: 'Basic Details',
          fields: [
            {
              id: 'firstName',
              label: 'First Name',
              required: true,
              children: (
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ),
            },
            {
              id: 'lastName',
              label: 'Last Name',
              required: true,
              children: (
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ),
            },
            {
              id: 'email',
              label: 'Email Address',
              required: true,
              children: (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ),
            },
          ],
        },
        {
          id: 'contact',
          title: 'Contact Information',
          collapsible: true,
          fields: [
            {
              id: 'phone',
              label: 'Phone Number',
              children: (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ),
            },
            {
              id: 'location',
              label: 'Location',
              children: (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ),
            },
          ],
        },
      ],
    },
    {
      id: 'professional',
      title: 'Professional Information',
      description: 'Information about your professional background',
      variant: 'card',
      sections: [
        {
          id: 'bio',
          title: 'Biography',
          fields: [
            {
              id: 'bio',
              label: 'Bio',
              helpText: 'Tell us a bit about yourself',
              children: (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ),
            },
            {
              id: 'website',
              label: 'Website',
              children: (
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ),
            },
          ],
        },
      ],
    },
  ];

  return (
    <form onSubmit={handleSubmit} className={className}>
      <FormLayout
        groups={groups}
        variant="spacious"
        showSectionNumbers
      />
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-primary-600 text-white rounded-sm hover:bg-primary-700 transition-colors"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export const SettingsForm: React.FC<{
  onSubmit?: (data: any) => void;
  className?: string;
}> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = React.useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const groups: FormGroup[] = [
    {
      id: 'notifications',
      title: 'Notification Settings',
      variant: 'bordered',
      sections: [
        {
          id: 'preferences',
          title: 'Preferences',
          fields: [
            {
              id: 'notifications',
              label: 'Push Notifications',
              children: (
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
              ),
            },
            {
              id: 'emailUpdates',
              label: 'Email Updates',
              children: (
                <input
                  type="checkbox"
                  checked={formData.emailUpdates}
                  onChange={(e) => setFormData({ ...formData, emailUpdates: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
              ),
            },
          ],
        },
      ],
    },
    {
      id: 'appearance',
      title: 'Appearance & Language',
      variant: 'bordered',
      sections: [
        {
          id: 'theme',
          title: 'Theme',
          fields: [
            {
              id: 'darkMode',
              label: 'Dark Mode',
              children: (
                <input
                  type="checkbox"
                  checked={formData.darkMode}
                  onChange={(e) => setFormData({ ...formData, darkMode: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
              ),
            },
            {
              id: 'language',
              label: 'Language',
              children: (
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              ),
            },
            {
              id: 'timezone',
              label: 'Timezone',
              children: (
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">GMT</option>
                </select>
              ),
            },
          ],
        },
      ],
    },
  ];

  return (
    <form onSubmit={handleSubmit} className={className}>
      <FormLayout
        groups={groups}
        variant="compact"
        layout="two-column"
      />
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-primary-600 text-white rounded-sm hover:bg-primary-700 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
};
