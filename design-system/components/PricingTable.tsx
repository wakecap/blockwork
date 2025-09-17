import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faStar, faCrown } from '@fortawesome/free-solid-svg-icons';

export interface PricingFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: {
    amount: number;
    currency?: string;
    period?: string;
    originalAmount?: number;
  };
  features: PricingFeature[];
  isPopular?: boolean;
  isRecommended?: boolean;
  badge?: string;
  cta: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
}

export interface PricingTableProps {
  plans: PricingPlan[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  showPeriodToggle?: boolean;
  periods?: Array<{ value: string; label: string; discount?: number }>;
  onPeriodChange?: (period: string) => void;
  selectedPeriod?: string;
  showFeatureComparison?: boolean;
  className?: string;
}

export const PricingTable: React.FC<PricingTableProps> = ({
  plans,
  layout = 'horizontal',
  showPeriodToggle = false,
  periods = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly', discount: 20 },
  ],
  onPeriodChange,
  selectedPeriod = 'monthly',
  showFeatureComparison = true,
  className = '',
}) => {
  const [currentPeriod, setCurrentPeriod] = React.useState(selectedPeriod);

  const handlePeriodChange = (period: string) => {
    setCurrentPeriod(period);
    onPeriodChange?.(period);
  };

  const getPeriodDiscount = (period: string) => {
    return periods.find(p => p.value === period)?.discount || 0;
  };

  const getPriceWithDiscount = (plan: PricingPlan) => {
    const discount = getPeriodDiscount(currentPeriod);
    if (discount > 0) {
      const discountedPrice = plan.price.amount * (1 - discount / 100);
      return {
        current: discountedPrice,
        original: plan.price.amount,
        discount,
      };
    }
    return {
      current: plan.price.amount,
      original: plan.price.amount,
      discount: 0,
    };
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col space-y-6';
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      default:
        return 'flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6';
    }
  };

  const getPlanClasses = (plan: PricingPlan) => {
    let baseClasses = 'relative bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200';
    
    if (plan.isPopular) {
      baseClasses += ' border-primary-500 ring-2 ring-primary-100';
    }
    
    if (plan.isRecommended) {
      baseClasses += ' border-primary-500 bg-primary-50';
    }
    
    return `${baseClasses} ${plan.className || ''}`;
  };

  const renderPeriodToggle = () => {
    if (!showPeriodToggle) return null;

    return (
      <div className="flex justify-center mb-8">
        <div className="bg-neutral-100 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => handlePeriodChange(period.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPeriod === period.value
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {period.label}
              {period.discount && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Save {period.discount}%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderPlan = (plan: PricingPlan) => {
    const pricing = getPriceWithDiscount(currentPeriod);
    const currency = plan.price.currency || '$';
    const period = plan.price.period || 'month';

    return (
      <div key={plan.id} className={getPlanClasses(plan)}>
        {/* Popular Badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>
          </div>
        )}

        {/* Recommended Badge */}
        {plan.isRecommended && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center">
              <FontAwesomeIcon icon={faCrown} className="w-3 h-3 mr-1" />
              Recommended
            </span>
          </div>
        )}

        {/* Custom Badge */}
        {plan.badge && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-neutral-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {plan.badge}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">{plan.name}</h3>
          {plan.description && (
            <p className="text-neutral-600 text-sm">{plan.description}</p>
          )}
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-neutral-900">{currency}</span>
            <span className="text-5xl font-bold text-neutral-900 ml-1">
              {pricing.current.toFixed(pricing.current % 1 === 0 ? 0 : 2)}
            </span>
            <span className="text-lg text-neutral-600 ml-1">/{period}</span>
          </div>
          
          {pricing.discount > 0 && (
            <div className="mt-2">
              <span className="text-sm text-neutral-500 line-through">
                {currency}{plan.price.amount}/{period}
              </span>
              <span className="ml-2 text-sm text-green-600 font-medium">
                Save {pricing.discount}%
              </span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mb-6">
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  {feature.included ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`w-4 h-4 ${
                        feature.highlight ? 'text-green-500' : 'text-neutral-400'
                      }`}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4 text-neutral-300" />
                  )}
                </div>
                <span
                  className={`ml-3 text-sm ${
                    feature.included
                      ? feature.highlight
                        ? 'text-green-700 font-medium'
                        : 'text-neutral-700'
                      : 'text-neutral-400'
                  }`}
                  title={feature.tooltip}
                >
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={plan.cta.onClick}
            className={`w-full px-6 py-3 font-semibold rounded-lg transition-colors ${
              plan.cta.variant === 'secondary'
                ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                : plan.cta.variant === 'outline'
                ? 'bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {plan.cta.label}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      {renderPeriodToggle()}
      
      <div className={getLayoutClasses()}>
        {plans.map(renderPlan)}
      </div>
    </div>
  );
};

// Pre-built pricing table components
export const SimplePricingTable: React.FC<{
  plans: PricingPlan[];
  className?: string;
}> = ({ plans, className = '' }) => {
  return (
    <PricingTable
      plans={plans}
      layout="horizontal"
      showPeriodToggle={true}
      className={className}
    />
  );
};

export const GridPricingTable: React.FC<{
  plans: PricingPlan[];
  showPeriodToggle?: boolean;
  className?: string;
}> = ({ plans, showPeriodToggle = true, className = '' }) => {
  return (
    <PricingTable
      plans={plans}
      layout="grid"
      showPeriodToggle={showPeriodToggle}
      className={className}
    />
  );
};

export const SAASPricing: React.FC<{
  plans: PricingPlan[];
  className?: string;
}> = ({ plans, className = '' }) => {
  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          Choose the right plan for your business
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Start free and scale as you grow. All plans include our core features.
        </p>
      </div>
      
      <PricingTable
        plans={plans}
        layout="horizontal"
        showPeriodToggle={true}
        periods={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'yearly', label: 'Yearly', discount: 20 },
        ]}
      />
    </div>
  );
};
