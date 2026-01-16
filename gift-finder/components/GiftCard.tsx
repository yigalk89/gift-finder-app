import { Gift } from '@/types';
import { ExternalLink } from 'lucide-react';

interface GiftCardProps {
  gift: Gift;
}

export default function GiftCard({ gift }: GiftCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-purple-100">
      {/* Emoji and Name */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{gift.emoji}</span>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{gift.name}</h3>
          <p className="text-2xl font-bold text-purple-600">{gift.price}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 min-h-[60px]">{gift.description}</p>

      {/* Shop */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">Available at:</p>
        <p className="text-sm font-semibold text-gray-700">{gift.shop}</p>
      </div>

      {/* Category Badge */}
      {gift.category && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
            {gift.category}
          </span>
        </div>
      )}

      {/* View & Purchase Button */}
      <button
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        onClick={() => {
          // In a real app, this would link to the shop or search for the product
          const searchQuery = encodeURIComponent(`${gift.name} ${gift.shop}`);
          window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
        }}
      >
        <span>View & Purchase</span>
        <ExternalLink size={18} />
      </button>
    </div>
  );
}
