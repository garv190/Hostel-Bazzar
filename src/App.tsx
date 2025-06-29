import React, { useState, useEffect } from 'react';
import { MessageCircle, ShoppingBag, Plus, Search, Menu, X, User, LogOut, Settings, Heart, Star, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ChatWindow from './components/ChatWindow';
import ProductModal from './components/ProductModal';
import AuthModal from './components/AuthModal';
import AddProductModal from './components/AddProductModal';
import { Product, User as UserType } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Mock data for small hostel items
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Maggi Noodles - 12 Pack',
      description: 'Fresh pack of 12 Maggi noodles, perfect for late night cravings and quick meals',
      price: 120,
      images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'],
      category: 'food',
      seller: { id: '1', name: 'Rahul Sharma', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
      location: 'Hostel A, Room 204',
      createdAt: new Date(),
      condition: 'excellent',
      isAvailable: true
    },
    {
      id: '2',
      title: 'Lays Chips - Family Pack',
      description: 'Large family pack of Lays chips, various flavors available',
      price: 80,
      images: ['https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg'],
      category: 'snacks',
      seller: { id: '2', name: 'Priya Singh', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
      location: 'Hostel B, Room 312',
      createdAt: new Date(),
      condition: 'good',
      isAvailable: true
    },
    {
      id: '3',
      title: 'Colgate Toothpaste',
      description: 'New Colgate toothpaste tube, 200g, mint fresh',
      price: 45,
      images: ['https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg'],
      category: 'personal-care',
      seller: { id: '3', name: 'Amit Kumar', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' },
      location: 'Hostel C, Room 156',
      createdAt: new Date(),
      condition: 'excellent',
      isAvailable: true
    },
    {
      id: '4',
      title: 'Instant Coffee Sachets',
      description: 'Nescafe instant coffee sachets - 20 pieces, perfect for study sessions',
      price: 150,
      images: ['https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'],
      category: 'beverages',
      seller: { id: '4', name: 'Sneha Patel', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg' },
      location: 'Hostel D, Room 089',
      createdAt: new Date(),
      condition: 'excellent',
      isAvailable: true
    },
    {
      id: '5',
      title: 'Parle-G Biscuits',
      description: 'Pack of 6 Parle-G biscuit packets, classic taste',
      price: 60,
      images: ['https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg'],
      category: 'snacks',
      seller: { id: '1', name: 'Rahul Sharma', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
      location: 'Hostel A, Room 204',
      createdAt: new Date(),
      condition: 'excellent',
      isAvailable: true
    },
    {
      id: '6',
      title: 'Head & Shoulders Shampoo',
      description: 'Anti-dandruff shampoo, 400ml bottle, barely used',
      price: 180,
      images: ['https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'],
      category: 'personal-care',
      seller: { id: '2', name: 'Priya Singh', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
      location: 'Hostel B, Room 312',
      createdAt: new Date(),
      condition: 'good',
      isAvailable: true
    },
    {
      id: '7',
      title: 'Kurkure Snacks',
      description: 'Spicy Kurkure snacks, multiple flavors available',
      price: 25,
      images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'],
      category: 'snacks',
      seller: { id: '3', name: 'Amit Kumar', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' },
      location: 'Hostel C, Room 156',
      createdAt: new Date(),
      condition: 'excellent',
      isAvailable: true
    },
    {
      id: '8',
      title: 'Red Bull Energy Drink',
      description: 'Energy drink for exam preparation and late night studies',
      price: 125,
      images: ['https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'],
      category: 'beverages',
      seller: { id: '4', name: 'Sneha Patel', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg' },
      location: 'Hostel D, Room 089',
      createdAt: new Date(),
      condition: 'excellent',
      isAvailable: true
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingBag },
    { id: 'food', name: 'Food', icon: ShoppingBag },
    { id: 'snacks', name: 'Snacks', icon: ShoppingBag },
    { id: 'beverages', name: 'Beverages', icon: ShoppingBag },
    { id: 'personal-care', name: 'Personal Care', icon: ShoppingBag },
    { id: 'stationery', name: 'Stationery', icon: ShoppingBag }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onAddProductClick={() => setIsAddProductModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Hostel Bazaar
            </h1>
            <p className="text-xl sm:text-2xl mb-8 opacity-90">
              Buy and sell everyday essentials within your hostel community
            </p>
            <p className="text-lg mb-8 opacity-80">
              From Maggi to toothpaste, find everything you need for hostel life
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for Maggi, chips, toothpaste..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or category filters</p>
          </div>
        )}
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onChatClick={() => {
            setSelectedProduct(null);
            setIsChatOpen(true);
          }}
        />
      )}

      {isChatOpen && (
        <ChatWindow onClose={() => setIsChatOpen(false)} />
      )}

      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={(user) => {
            setCurrentUser(user);
            setIsAuthModalOpen(false);
          }}
        />
      )}

      {isAddProductModalOpen && (
        <AddProductModal
          onClose={() => setIsAddProductModalOpen(false)}
          onAdd={(product) => {
            setProducts([...products, { ...product, id: Date.now().toString() }]);
            setIsAddProductModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;