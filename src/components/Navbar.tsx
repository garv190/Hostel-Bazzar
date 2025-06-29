import React from 'react';
import { ShoppingBag, Plus, User, Menu, MessageCircle } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  onMenuToggle: () => void;
  onAuthClick: () => void;
  onAddProductClick: () => void;
  currentUser: UserType | null;
}

export default function Navbar({ onMenuToggle, onAuthClick, onAddProductClick, currentUser }: NavbarProps) {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Hostel Bazaar</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={onAddProductClick}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Sell Item</span>
            </button>
            
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700 font-medium">{currentUser.name}</span>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={onMenuToggle}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}