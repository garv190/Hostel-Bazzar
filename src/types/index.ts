export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  seller: User;
  location: string;
  createdAt: Date;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  isAvailable: boolean;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  hostel?: string;
  room?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: User;
  recipient: User;
  timestamp: Date;
  productId?: string;
}

export interface ChatRoom {
  id: string;
  participants: User[];
  messages: ChatMessage[];
  productId?: string;
  lastActivity: Date;
}