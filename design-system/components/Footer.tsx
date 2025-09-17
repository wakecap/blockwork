import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'github' | 'youtube' | 'discord';
  href: string;
  label: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface FooterProps {
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  companyName?: string;
  copyrightText?: string;
  variant?: 'default' | 'minimal' | 'extended' | 'dark';
  showBackToTop?: boolean;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  sections = [],
  socialLinks = [],
  contactInfo = {},
  companyName = 'Company Name',
  copyrightText,
  variant = 'default',
  showBackToTop = true,
  className = '',
}) => {
  const [showBackToTopButton, setShowBackToTopButton] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTopButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (platform: string) => {
    // Use available icons for social platforms
    switch (platform) {
      case 'twitter':
      case 'facebook':
      case 'linkedin':
      case 'instagram':
      case 'github':
      case 'youtube':
      case 'discord':
      default:
        return faEnvelope; // Fallback to envelope icon
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-neutral-50 border-t border-neutral-200';
      case 'extended':
        return 'bg-neutral-900 text-white';
      case 'dark':
        return 'bg-neutral-950 text-white';
      default:
        return 'bg-white border-t border-neutral-200';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'extended':
      case 'dark':
        return 'text-neutral-300';
      default:
        return 'text-neutral-600';
    }
  };

  const getHeadingColor = () => {
    switch (variant) {
      case 'extended':
      case 'dark':
        return 'text-white';
      default:
        return 'text-neutral-900';
    }
  };

  const getLinkColor = () => {
    switch (variant) {
      case 'extended':
      case 'dark':
        return 'text-neutral-300 hover:text-white';
      default:
        return 'text-neutral-600 hover:text-neutral-900';
    }
  };

  const getSocialLinkColor = () => {
    switch (variant) {
      case 'extended':
      case 'dark':
        return 'text-neutral-400 hover:text-white';
      default:
        return 'text-neutral-500 hover:text-neutral-700';
    }
  };

  const renderMinimalFooter = () => (
    <div className="py-8 text-center">
      <div className="mb-4">
        {socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mx-2 text-xl ${getSocialLinkColor()} transition-colors`}
            aria-label={social.label}
          >
            <FontAwesomeIcon icon={getSocialIcon(social.platform)} />
          </a>
        ))}
      </div>
      <p className={`text-sm ${getTextColor()}`}>
        © {new Date().getFullYear()} {companyName}. {copyrightText || 'All rights reserved.'}
      </p>
    </div>
  );

  const renderDefaultFooter = () => (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Company Info */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${getHeadingColor()}`}>
            {companyName}
          </h3>
          <p className={`text-sm ${getTextColor()} mb-4`}>
            Building amazing experiences for users around the world.
          </p>
          {socialLinks.length > 0 && (
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-lg ${getSocialLinkColor()} transition-colors`}
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={getSocialIcon(social.platform)} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Sections */}
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className={`text-lg font-semibold mb-4 ${getHeadingColor()}`}>
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className={`text-sm ${getLinkColor()} transition-colors`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      {(contactInfo.email || contactInfo.phone || contactInfo.address) && (
        <div className="border-t border-neutral-200 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.email && (
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className={`w-4 h-4 ${getTextColor()}`} />
                <a href={`mailto:${contactInfo.email}`} className={`text-sm ${getLinkColor()}`}>
                  {contactInfo.email}
                </a>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faPhone} className={`w-4 h-4 ${getTextColor()}`} />
                <a href={`tel:${contactInfo.phone}`} className={`text-sm ${getLinkColor()}`}>
                  {contactInfo.phone}
                </a>
              </div>
            )}
            {contactInfo.address && (
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className={`w-4 h-4 ${getTextColor()}`} />
                <span className={`text-sm ${getTextColor()}`}>
                  {contactInfo.address}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Copyright */}
      <div className="border-t border-neutral-200 pt-8 text-center">
        <p className={`text-sm ${getTextColor()}`}>
          © {new Date().getFullYear()} {companyName}. {copyrightText || 'All rights reserved.'}
        </p>
      </div>
    </div>
  );

  const renderExtendedFooter = () => (
    <div className="py-16">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Company Info */}
        <div>
          <h3 className={`text-2xl font-bold mb-6 ${getHeadingColor()}`}>
            {companyName}
          </h3>
          <p className={`text-lg ${getTextColor()} mb-6 leading-relaxed`}>
            We're passionate about creating innovative solutions that help businesses grow and succeed in the digital age.
          </p>
          {socialLinks.length > 0 && (
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl ${getSocialLinkColor()} transition-colors hover:scale-110`}
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={getSocialIcon(social.platform)} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className={`text-lg font-semibold mb-4 ${getHeadingColor()}`}>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className={`text-sm ${getLinkColor()} transition-colors`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      {(contactInfo.email || contactInfo.phone || contactInfo.address) && (
        <div className="border-t border-neutral-700 pt-12 mb-12">
          <h4 className={`text-xl font-semibold mb-6 ${getHeadingColor()}`}>
            Get in Touch
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.email && (
              <div className="text-center">
                <FontAwesomeIcon icon={faEnvelope} className={`w-6 h-6 ${getTextColor()} mb-3`} />
                <h5 className={`font-medium mb-2 ${getHeadingColor()}`}>Email</h5>
                <a href={`mailto:${contactInfo.email}`} className={`text-sm ${getLinkColor()}`}>
                  {contactInfo.email}
                </a>
              </div>
            )}
            {contactInfo.phone && (
              <div className="text-center">
                <FontAwesomeIcon icon={faPhone} className={`w-6 h-6 ${getTextColor()} mb-3`} />
                <h5 className={`font-medium mb-2 ${getHeadingColor()}`}>Phone</h5>
                <a href={`tel:${contactInfo.phone}`} className={`text-sm ${getLinkColor()}`}>
                  {contactInfo.phone}
                </a>
              </div>
            )}
            {contactInfo.address && (
              <div className="text-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className={`w-6 h-6 ${getTextColor()} mb-3`} />
                <h5 className={`font-medium mb-2 ${getHeadingColor()}`}>Address</h5>
                <span className={`text-sm ${getTextColor()}`}>
                  {contactInfo.address}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Copyright */}
      <div className="border-t border-neutral-700 pt-8 text-center">
        <p className={`text-sm ${getTextColor()}`}>
          © {new Date().getFullYear()} {companyName}. {copyrightText || 'All rights reserved.'}
        </p>
      </div>
    </div>
  );

  return (
    <footer className={`${getVariantClasses()} ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {variant === 'minimal' && renderMinimalFooter()}
        {variant === 'default' && renderDefaultFooter()}
        {variant === 'extended' && renderExtendedFooter()}
        {variant === 'dark' && renderExtendedFooter()}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && showBackToTopButton && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            variant === 'extended' || variant === 'dark'
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
          }`}
          aria-label="Back to top"
        >
          <FontAwesomeIcon icon={faArrowUp} className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};

// Pre-built footer components
export const SimpleFooter: React.FC<{
  companyName?: string;
  socialLinks?: SocialLink[];
  className?: string;
}> = ({ companyName = 'Company Name', socialLinks = [], className = '' }) => {
  return (
    <Footer
      variant="minimal"
      companyName={companyName}
      socialLinks={socialLinks}
      className={className}
    />
  );
};

export const BusinessFooter: React.FC<{
  companyName?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  className?: string;
}> = ({ companyName = 'Company Name', sections = [], socialLinks = [], contactInfo = {}, className = '' }) => {
  return (
    <Footer
      variant="default"
      companyName={companyName}
      sections={sections}
      socialLinks={socialLinks}
      contactInfo={contactInfo}
      className={className}
    />
  );
};

export const MarketingFooter: React.FC<{
  companyName?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  className?: string;
}> = ({ companyName = 'Company Name', sections = [], socialLinks = [], contactInfo = {}, className = '' }) => {
  return (
    <Footer
      variant="extended"
      companyName={companyName}
      sections={sections}
      socialLinks={socialLinks}
      contactInfo={contactInfo}
      className={className}
    />
  );
};
