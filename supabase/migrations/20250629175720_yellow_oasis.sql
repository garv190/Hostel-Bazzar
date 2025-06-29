-- Insert sample users
INSERT INTO users (name, email, password, hostel, room, phone, avatar, created_at, updated_at) VALUES
('Rahul Sharma', 'rahul@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Hostel A', '204', '9876543210', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', NOW(), NOW()),
('Priya Singh', 'priya@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Hostel B', '312', '9876543211', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', NOW(), NOW()),
('Amit Kumar', 'amit@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Hostel C', '156', '9876543212', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg', NOW(), NOW()),
('Sneha Patel', 'sneha@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Hostel D', '089', '9876543213', 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg', NOW(), NOW());

-- Insert sample products (small hostel items)
INSERT INTO products (title, description, price, category, condition, location, image_url, is_available, quantity, seller_id, created_at, updated_at) VALUES
('Maggi Noodles - 12 Pack', 'Fresh pack of 12 Maggi noodles, perfect for late night cravings', 120.00, 'food', 'excellent', 'Hostel A, Room 204', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', true, 2, 1, NOW(), NOW()),
('Lays Chips - Family Pack', 'Large family pack of Lays chips, barely opened', 80.00, 'snacks', 'good', 'Hostel B, Room 312', 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg', true, 1, 2, NOW(), NOW()),
('Colgate Toothpaste', 'New Colgate toothpaste tube, 200g', 45.00, 'personal-care', 'excellent', 'Hostel C, Room 156', 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg', true, 3, 3, NOW(), NOW()),
('Instant Coffee Sachets', 'Nescafe instant coffee sachets - 20 pieces', 150.00, 'beverages', 'excellent', 'Hostel D, Room 089', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg', true, 1, 4, NOW(), NOW()),
('Parle-G Biscuits', 'Pack of 6 Parle-G biscuit packets', 60.00, 'snacks', 'excellent', 'Hostel A, Room 204', 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', true, 2, 1, NOW(), NOW()),
('Head & Shoulders Shampoo', 'Anti-dandruff shampoo, 400ml bottle', 180.00, 'personal-care', 'good', 'Hostel B, Room 312', 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg', true, 1, 2, NOW(), NOW()),
('Kurkure Snacks', 'Spicy Kurkure snacks, multiple flavors', 25.00, 'snacks', 'excellent', 'Hostel C, Room 156', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', true, 5, 3, NOW(), NOW()),
('Red Bull Energy Drink', 'Energy drink for exam preparation', 125.00, 'beverages', 'excellent', 'Hostel D, Room 089', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg', true, 3, 4, NOW(), NOW()),
('Dove Soap Bar', 'Moisturizing soap bar, pack of 3', 90.00, 'personal-care', 'excellent', 'Hostel A, Room 204', 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg', true, 2, 1, NOW(), NOW()),
('Oreo Cookies', 'Chocolate cream cookies, family pack', 70.00, 'snacks', 'good', 'Hostel B, Room 312', 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg', true, 1, 2, NOW(), NOW());