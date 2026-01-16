'use client';

import { Check } from 'lucide-react';
import { Step } from '@/types';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { number: 1, label: 'Basic Info' },
  { number: 2, label: 'Personalize' },
  { number: 3, label: 'Results' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  text-sm font-semibold transition-all duration-300
                  ${
                    currentStep > step.number
                      ? 'bg-purple-600 text-white'
                      : currentStep === step.number
                      ? 'bg-purple-600 text-white ring-4 ring-purple-200'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`
                  mt-2 text-xs font-medium
                  ${currentStep >= step.number ? 'text-purple-600' : 'text-gray-400'}
                `}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  w-16 sm:w-24 h-1 mx-2 rounded transition-all duration-300
                  ${currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
