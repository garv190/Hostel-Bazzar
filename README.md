# Bhav Tol 🏠🛒

A modern marketplace application designed specifically for hostel communities, where students can buy and sell everyday essentials like Maggi noodles, chips, toothpaste, and other small items. Built with React frontend and Java Spring Boot backend with real-time chat functionality.



## 🌟 Features

### 🛍️ Marketplace
- **Buy & Sell**: List and purchase everyday hostel essentials
- **Categories**: Food, Snacks, Beverages, Personal Care, Stationery
- **Search & Filter**: Find items by name, category, or hostel location
- **Product Details**: High-quality images, descriptions, and seller information
- **Condition Tracking**: Excellent, Good, Fair, Poor condition indicators

### 💬 Real-time Chat
- **WebSocket Integration**: Instant messaging between buyers and sellers
- **Product-specific Chats**: Discuss items directly with sellers
- **Chat History**: Persistent conversation storage
- **Online Status**: See who's currently available

### 🔐 Authentication & Security
- **JWT Authentication**: Secure login and registration
- **Password Encryption**: BCrypt password hashing
- **User Profiles**: Hostel and room information
- **Authorization**: Protected routes and API endpoints

### 🏠 Hostel-Focused
- **Location-based**: Filter products by hostel and room
- **Small Items**: Focus on everyday essentials students actually need
- **Student-friendly**: Affordable pricing and quick transactions

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **Java 17** with Spring Boot 3.2
- **Spring Security** for authentication
- **Spring WebSocket** for real-time chat
- **Spring Data JPA** for database operations
- **H2 Database** (development) / MySQL (production)
- **JWT** for token-based authentication

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Java 17** or higher
- **Maven** 3.6 or higher

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies and run**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. **Backend will start on**: `http://localhost:8080`

4. **Access H2 Database Console**: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: `password`

### Frontend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Frontend will start on**: `http://localhost:5173`




## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Products
- `GET /api/products` - Get all available products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?keyword={keyword}` - Search products
- `GET /api/products/hostel/{hostel}` - Get products by hostel
- `POST /api/products` - Create new product (authenticated)
- `PUT /api/products/{id}` - Update product (authenticated)
- `DELETE /api/products/{id}` - Delete product (authenticated)

### Chat
- `POST /api/chat/send` - Send message (authenticated)
- `GET /api/chat/conversation/{userId}` - Get conversation (authenticated)
- `GET /api/chat/partners` - Get chat partners (authenticated)
- `GET /api/chat/unread` - Get unread messages (authenticated)

### WebSocket
- **Endpoint**: `/ws`
- **Topic**: `/topic/public`
- **Send**: `/app/chat.sendMessage`

## 🎨 Sample Data

The application comes with pre-loaded sample data including:

### Users
- Rahul Sharma (Hostel A, Room 204)
- Priya Singh (Hostel B, Room 312)
- Amit Kumar (Hostel C, Room 156)
- Sneha Patel (Hostel D, Room 089)

### Products
- **Food**: Maggi Noodles, Instant Coffee
- **Snacks**: Lays Chips, Parle-G Biscuits, Kurkure
- **Beverages**: Red Bull Energy Drink
- **Personal Care**: Colgate Toothpaste, Head & Shoulders Shampoo

## 🔧 Configuration

### Database Configuration
For production, update `application.properties`:

```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/hostel_bazaar
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

### JWT Configuration
```properties
hostelbazaar.app.jwtSecret=your-secret-key
hostelbazaar.app.jwtExpirationMs=86400000
```

## 🚀 Deployment

### Backend Deployment
1. **Build the application**:
   
   mvn clean package
 

2. **Run the JAR file**:
   
   java -jar target/hostel-bazaar-backend-0.0.1-SNAPSHOT.jar
  

### Frontend Deployment
1. **Build for production**:
   
   npm run build
  



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- WebSocket connection may need manual refresh in development
- Image upload functionality is placeholder (uses default images)
- Email notifications not implemented

## 🔮 Future Enhancements

- [ ] Image upload functionality
- [ ] Push notifications
- [ ] Payment integration
- [ ] Rating and review system
- [ ] Advanced search filters
- [ ] Mobile app development
- [ ] Email notifications
- [ ] Product wishlist
- [ ] Bulk messaging


