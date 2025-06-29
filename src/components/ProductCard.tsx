import React from 'react';
import { MapPin, Heart, Star, Clock } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food':
        return '🍜';
      case 'snacks':
        return '🍿';
      case 'beverages':
        return '☕';
      case 'personal-care':
        return '🧴';
      case 'stationery':
        return '📝';
      default:
        return '📦';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(product.condition)}`}>
          {product.condition}
        </div>
        <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
          {getCategoryIcon(product.category)} {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>2h ago</span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={product.seller.avatar}
            alt={product.seller.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600">{product.seller.name}</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>{product.location}</span>
        </div>
      </div>
    </div>
  );
}