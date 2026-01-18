'use client';

import { useState, useMemo, useEffect } from 'react';
import { Gift, MapPin, ChevronRight, ChevronLeft, ChevronDown, Loader2, RotateCcw } from 'lucide-react';
import { FormData, Step, Gift as GiftType } from '@/types';
import {
  RELATIONSHIPS,
  BUDGETS,
  GIFT_TYPES,
  OCCASIONS,
  AGE_RANGES,
  INTERESTS,
  PERSONALITY_TRAITS,
  MOCK_LOCATIONS,
  INITIAL_FORM_DATA,
  MOCK_GIFTS,
} from '@/lib/constants';
import StepIndicator from './StepIndicator';
import GiftCard from './GiftCard';
import ParameterSummary from './ParameterSummary';

export default function GiftFinder() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [locationQuery, setLocationQuery] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [gifts, setGifts] = useState<GiftType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const filteredLocations = useMemo(() => {
    if (!locationQuery) return [];
    return MOCK_LOCATIONS.filter((loc) =>
      loc.toLowerCase().includes(locationQuery.toLowerCase())
    ).slice(0, 5);
  }, [locationQuery]);

  const handleFieldChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationSelect = (location: string) => {
    setFormData((prev) => ({ ...prev, location }));
    setLocationQuery(location);
    setShowLocationDropdown(false);
  };

  const [ageDropdownOpen, setAgeDropdownOpen] = useState(false);

  const toggleArrayField = (field: 'interests' | 'personalityTraits', value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const isStep1Valid = useMemo(() => {
    return (
      formData.relationship &&
      formData.location &&
      formData.budget &&
      formData.giftType &&
      (formData.occasion && (formData.occasion !== 'custom' || formData.customOccasion))
    );
  }, [formData]);

  const isStep2Valid = useMemo(() => {
    return (
      formData.ageRange &&
      formData.interests.length > 0 &&
      formData.personalityTraits.length > 0
    );
  }, [formData]);

  const handleNext = async () => {
    if (currentStep === 1 && isStep1Valid) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid) {
      setCurrentStep(3);
      await generateGifts();
    }
  };

  const generateGifts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate gift recommendations');
      }

      const data = await response.json();
      setGifts(data.gifts);
    } catch (err) {
      console.error('Error generating gifts:', err);
      setError('Unable to generate personalized recommendations. Showing general gift ideas instead.');
      // Fallback to mock data
      setGifts(MOCK_GIFTS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setFormData(INITIAL_FORM_DATA);
    setLocationQuery('');
    setGifts([]);
    setError(null);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Gift Finder
          </h1>
          <p className="text-gray-600">
            Find the perfect gift with AI-powered recommendations
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Relationship Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Who is this gift for?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {RELATIONSHIPS.map((rel) => (
                    <button
                      key={rel.value}
                      onClick={() => handleFieldChange('relationship', rel.value)}
                      className={`
                        p-3 rounded-xl text-sm font-medium transition-all duration-200
                        flex flex-col items-center gap-1
                        ${
                          formData.relationship === rel.value
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                        }
                      `}
                    >
                      <span className="text-lg">{rel.emoji}</span>
                      <span>{rel.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Where are they located?
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => {
                      setLocationQuery(e.target.value);
                      handleFieldChange('location', e.target.value);
                      setShowLocationDropdown(true);
                    }}
                    onFocus={() => setShowLocationDropdown(true)}
                    onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                    placeholder="Enter city or zip code"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             outline-none transition-all text-gray-800"
                  />
                  {showLocationDropdown && filteredLocations.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      {filteredLocations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleLocationSelect(loc)}
                          className="w-full px-4 py-3 text-left text-gray-700 hover:bg-purple-50 transition-colors"
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Budget Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What&apos;s your budget?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BUDGETS.map((budget) => (
                    <button
                      key={budget.value}
                      onClick={() => handleFieldChange('budget', budget.value)}
                      className={`
                        p-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${
                          formData.budget === budget.value
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                        }
                      `}
                    >
                      {budget.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift Type Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What type of gift?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {GIFT_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleFieldChange('giftType', type.value)}
                      className={`
                        p-4 rounded-xl text-sm font-medium transition-all duration-200
                        flex flex-col items-center gap-2
                        ${
                          formData.giftType === type.value
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                        }
                      `}
                    >
                      <span className="text-xl">{type.emoji}</span>
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What&apos;s the occasion?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {OCCASIONS.map((occasion) => (
                    <button
                      key={occasion.value}
                      onClick={() => handleFieldChange('occasion', occasion.value)}
                      className={`
                        p-3 rounded-xl text-sm font-medium transition-all duration-200
                        flex flex-col items-center gap-1
                        ${
                          formData.occasion === occasion.value
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                        }
                      `}
                    >
                      <span className="text-lg">{occasion.emoji}</span>
                      <span className="text-xs sm:text-sm">{occasion.label}</span>
                    </button>
                  ))}
                </div>
                {formData.occasion === 'custom' && (
                  <input
                    type="text"
                    value={formData.customOccasion}
                    onChange={(e) => handleFieldChange('customOccasion', e.target.value)}
                    placeholder="Enter your occasion"
                    className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl
                             focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             outline-none transition-all text-gray-800"
                  />
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={!isStep1Valid}
                className={`
                  w-full py-4 rounded-xl font-semibold text-white
                  flex items-center justify-center gap-2 transition-all duration-200
                  ${
                    isStep1Valid
                      ? 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                Continue to Personalization
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Age Range Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What&apos;s their age range?
                </label>
                <div className="relative">
                  <button
                    onClick={() => setAgeDropdownOpen(!ageDropdownOpen)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl
                             flex items-center justify-between text-left
                             focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             outline-none transition-all"
                  >
                    <span className={formData.ageRange ? 'text-gray-800' : 'text-gray-400'}>
                      {formData.ageRange
                        ? AGE_RANGES.find((a) => a.value === formData.ageRange)?.label
                        : 'Select age range'}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        ageDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {ageDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      {AGE_RANGES.map((age) => (
                        <button
                          key={age.value}
                          onClick={() => {
                            handleFieldChange('ageRange', age.value);
                            setAgeDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-colors ${
                            formData.ageRange === age.value
                              ? 'bg-purple-100 text-purple-700'
                              : 'text-gray-700 hover:bg-purple-50'
                          }`}
                        >
                          {age.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Interests Multi-select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What are their interests? <span className="font-normal text-gray-500">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest.value}
                      onClick={() => toggleArrayField('interests', interest.value)}
                      className={`
                        p-3 rounded-xl text-sm font-medium transition-all duration-200
                        flex flex-col items-center gap-1
                        ${
                          formData.interests.includes(interest.value)
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                        }
                      `}
                    >
                      <span className="text-lg">{interest.emoji}</span>
                      <span className="text-xs sm:text-sm">{interest.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personality Traits Multi-select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  How would you describe them? <span className="font-normal text-gray-500">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PERSONALITY_TRAITS.map((trait) => (
                    <button
                      key={trait.value}
                      onClick={() => toggleArrayField('personalityTraits', trait.value)}
                      className={`
                        p-3 rounded-xl text-sm font-medium transition-all duration-200
                        flex items-center justify-center gap-2
                        ${
                          formData.personalityTraits.includes(trait.value)
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                        }
                      `}
                    >
                      <span>{trait.emoji}</span>
                      <span>{trait.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 rounded-xl font-semibold text-gray-700
                           bg-gray-100 hover:bg-gray-200
                           flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                  className={`
                    flex-[2] py-4 rounded-xl font-semibold text-white
                    flex items-center justify-center gap-2 transition-all duration-200
                    ${
                      isStep2Valid
                        ? 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 cursor-not-allowed'
                    }
                  `}
                >
                  Find Gift Ideas
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Header with Start Over Button */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Your Gift Recommendations</h2>
                <button
                  onClick={handleStartOver}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600
                           hover:bg-purple-50 rounded-xl transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </button>
              </div>

              {/* Parameter Summary */}
              <ParameterSummary
                formData={formData}
                onFieldChange={handleFieldChange}
                onRegenerate={generateGifts}
                isRegenerating={isLoading}
              />

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-sm text-yellow-800">{error}</p>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Finding perfect gifts...
                  </p>
                  <p className="text-sm text-gray-500">
                    Our AI is analyzing your preferences
                  </p>
                </div>
              )}

              {/* Gift Cards Grid */}
              {!isLoading && gifts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gifts.map((gift, index) => (
                    <GiftCard key={index} gift={gift} />
                  ))}
                </div>
              )}

              {/* Back Button */}
              {!isLoading && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 rounded-xl font-semibold text-gray-700
                             bg-gray-100 hover:bg-gray-200
                             flex items-center gap-2 transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Modify Preferences
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
