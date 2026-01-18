'use client';

import { useState } from 'react';
import { ChevronDown, Edit2, X, Check } from 'lucide-react';
import { FormData } from '@/types';
import {
  RELATIONSHIPS,
  BUDGETS,
  GIFT_TYPES,
  OCCASIONS,
  AGE_RANGES,
  INTERESTS,
  PERSONALITY_TRAITS,
} from '@/lib/constants';

interface ParameterSummaryProps {
  formData: FormData;
  onFieldChange: (field: keyof FormData, value: string | string[]) => void;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

type EditingField = keyof FormData | null;

export default function ParameterSummary({
  formData,
  onFieldChange,
  onRegenerate,
  isRegenerating = false,
}: ParameterSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const handleEdit = (field: keyof FormData) => {
    setEditingField(field);
  };

  const handleSave = () => {
    setEditingField(null);
    setHasChanges(true);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const getDisplayValue = (field: keyof FormData): string => {
    const value = formData[field];

    switch (field) {
      case 'relationship':
        return RELATIONSHIPS.find(r => r.value === value)?.label || '';
      case 'budget':
        return BUDGETS.find(b => b.value === value)?.label || '';
      case 'giftType':
        return GIFT_TYPES.find(g => g.value === value)?.label || '';
      case 'occasion':
        if (value === 'custom') return formData.customOccasion || 'Custom';
        return OCCASIONS.find(o => o.value === value)?.label || '';
      case 'ageRange':
        return AGE_RANGES.find(a => a.value === value)?.label || '';
      case 'interests':
        return (value as string[])
          .map(v => INTERESTS.find(i => i.value === v)?.label)
          .filter(Boolean)
          .join(', ');
      case 'personalityTraits':
        return (value as string[])
          .map(v => PERSONALITY_TRAITS.find(p => p.value === v)?.label)
          .filter(Boolean)
          .join(', ');
      case 'location':
        return value as string;
      default:
        return value as string;
    }
  };

  const getEmoji = (field: keyof FormData): string => {
    const value = formData[field];

    switch (field) {
      case 'relationship':
        return RELATIONSHIPS.find(r => r.value === value)?.emoji || '👤';
      case 'giftType':
        return GIFT_TYPES.find(g => g.value === value)?.emoji || '🎁';
      case 'occasion':
        return OCCASIONS.find(o => o.value === value)?.emoji || '🎉';
      default:
        return '';
    }
  };

  const renderEditModal = () => {
    if (!editingField) return null;

    const handleArrayToggle = (value: string) => {
      const currentArray = formData[editingField] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      onFieldChange(editingField, newArray);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit {editingField.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </h3>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {/* Relationship */}
            {editingField === 'relationship' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {RELATIONSHIPS.map((rel) => (
                  <button
                    key={rel.value}
                    onClick={() => onFieldChange('relationship', rel.value)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center gap-1 ${
                      formData.relationship === rel.value
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    <span className="text-lg">{rel.emoji}</span>
                    <span>{rel.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Location */}
            {editingField === 'location' && (
              <input
                type="text"
                value={formData.location}
                onChange={(e) => onFieldChange('location', e.target.value)}
                placeholder="Enter city or zip code"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-800"
                autoFocus
              />
            )}

            {/* Budget */}
            {editingField === 'budget' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BUDGETS.map((budget) => (
                  <button
                    key={budget.value}
                    onClick={() => onFieldChange('budget', budget.value)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      formData.budget === budget.value
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    {budget.label}
                  </button>
                ))}
              </div>
            )}

            {/* Gift Type */}
            {editingField === 'giftType' && (
              <div className="grid grid-cols-3 gap-2">
                {GIFT_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => onFieldChange('giftType', type.value)}
                    className={`p-4 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center gap-2 ${
                      formData.giftType === type.value
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    <span className="text-xl">{type.emoji}</span>
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Occasion */}
            {editingField === 'occasion' && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {OCCASIONS.map((occasion) => (
                    <button
                      key={occasion.value}
                      onClick={() => onFieldChange('occasion', occasion.value)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center gap-1 ${
                        formData.occasion === occasion.value
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                      }`}
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
                    onChange={(e) => onFieldChange('customOccasion', e.target.value)}
                    placeholder="Enter your occasion"
                    className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-800"
                  />
                )}
              </>
            )}

            {/* Age Range */}
            {editingField === 'ageRange' && (
              <div className="space-y-2">
                {AGE_RANGES.map((age) => (
                  <button
                    key={age.value}
                    onClick={() => onFieldChange('ageRange', age.value)}
                    className={`w-full px-4 py-3 text-left rounded-xl transition-colors ${
                      formData.ageRange === age.value
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'bg-gray-50 text-gray-700 hover:bg-purple-50'
                    }`}
                  >
                    {age.label}
                  </button>
                ))}
              </div>
            )}

            {/* Interests */}
            {editingField === 'interests' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest.value}
                    onClick={() => handleArrayToggle(interest.value)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center gap-1 ${
                      formData.interests.includes(interest.value)
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    <span className="text-lg">{interest.emoji}</span>
                    <span className="text-xs sm:text-sm">{interest.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Personality Traits */}
            {editingField === 'personalityTraits' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PERSONALITY_TRAITS.map((trait) => (
                  <button
                    key={trait.value}
                    onClick={() => handleArrayToggle(trait.value)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      formData.personalityTraits.includes(trait.value)
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    <span>{trait.emoji}</span>
                    <span>{trait.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 rounded-xl font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ParameterItem = ({ label, field, icon }: { label: string; field: keyof FormData; icon?: string }) => (
    <div className="flex items-start justify-between gap-3 py-2">
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
        <div className="text-sm text-gray-800 font-medium flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <span className="truncate">{getDisplayValue(field)}</span>
        </div>
      </div>
      <button
        onClick={() => handleEdit(field)}
        className="p-2 hover:bg-purple-50 rounded-lg transition-colors flex-shrink-0"
        title={`Edit ${label}`}
      >
        <Edit2 className="w-4 h-4 text-purple-600" />
      </button>
    </div>
  );

  return (
    <>
      <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-100/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">✨</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800">Your Preferences</h3>
              <p className="text-xs text-gray-600">Click any field to edit</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Content */}
        {isExpanded && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y md:divide-y-0 divide-gray-200">
              {/* Left Column */}
              <div className="space-y-1">
                <ParameterItem
                  label="Recipient"
                  field="relationship"
                  icon={getEmoji('relationship')}
                />
                <ParameterItem label="Location" field="location" icon="📍" />
                <ParameterItem label="Budget" field="budget" icon="💰" />
                <ParameterItem
                  label="Gift Type"
                  field="giftType"
                  icon={getEmoji('giftType')}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-1 pt-4 md:pt-0">
                <ParameterItem
                  label="Occasion"
                  field="occasion"
                  icon={getEmoji('occasion')}
                />
                <ParameterItem label="Age Range" field="ageRange" icon="🎂" />
                <ParameterItem label="Interests" field="interests" icon="❤️" />
                <ParameterItem label="Personality" field="personalityTraits" icon="✨" />
              </div>
            </div>

            {/* Regenerate Button */}
            {hasChanges && (
              <div className="mt-6 pt-4 border-t border-purple-200">
                <button
                  onClick={() => {
                    onRegenerate();
                    setHasChanges(false);
                  }}
                  disabled={isRegenerating}
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isRegenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <span>🔄</span>
                      Regenerate Recommendations
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {renderEditModal()}
    </>
  );
}
