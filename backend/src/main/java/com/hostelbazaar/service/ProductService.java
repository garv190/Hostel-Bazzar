package com.hostelbazaar.service;

import com.hostelbazaar.entity.Product;
import com.hostelbazaar.entity.User;
import com.hostelbazaar.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }
    
    public List<Product> findAllAvailable() {
        return productRepository.findByIsAvailableTrue();
    }
    
    public List<Product> findByCategory(String category) {
        return productRepository.findByIsAvailableTrueAndCategory(category);
    }
    
    public List<Product> findBySeller(User seller) {
        return productRepository.findBySeller(seller);
    }
    
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByKeyword(keyword);
    }
    
    public List<Product> findByHostel(String hostel) {
        return productRepository.findAvailableProductsByHostel(hostel);
    }
    
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }
    
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}