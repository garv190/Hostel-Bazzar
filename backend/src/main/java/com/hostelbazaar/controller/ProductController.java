package com.hostelbazaar.controller;

import com.hostelbazaar.dto.ProductRequest;
import com.hostelbazaar.entity.Product;
import com.hostelbazaar.entity.User;
import com.hostelbazaar.service.ProductService;
import com.hostelbazaar.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.findAllAvailable();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.findById(id);
        return product.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.findByCategory(category);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = productService.searchProducts(keyword);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/hostel/{hostel}")
    public ResponseEntity<List<Product>> getProductsByHostel(@PathVariable String hostel) {
        List<Product> products = productService.findByHostel(hostel);
        return ResponseEntity.ok(products);
    }
    
    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductRequest productRequest, 
                                         Authentication authentication) {
        String email = authentication.getName();
        Optional<User> seller = userService.findByEmail(email);
        
        if (seller.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        Product product = new Product();
        product.setTitle(productRequest.getTitle());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setCategory(productRequest.getCategory());
        product.setCondition(productRequest.getCondition());
        product.setLocation(productRequest.getLocation());
        product.setImageUrl(productRequest.getImageUrl());
        product.setQuantity(productRequest.getQuantity());
        product.setExpiryDate(productRequest.getExpiryDate());
        product.setSeller(seller.get());
        
        Product savedProduct = productService.createProduct(product);
        return ResponseEntity.ok(savedProduct);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, 
                                         @Valid @RequestBody ProductRequest productRequest,
                                         Authentication authentication) {
        Optional<Product> existingProduct = productService.findById(id);
        
        if (existingProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        String email = authentication.getName();
        if (!existingProduct.get().getSeller().getEmail().equals(email)) {
            return ResponseEntity.status(403).body("You can only update your own products");
        }
        
        Product product = existingProduct.get();
        product.setTitle(productRequest.getTitle());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setCategory(productRequest.getCategory());
        product.setCondition(productRequest.getCondition());
        product.setLocation(productRequest.getLocation());
        product.setImageUrl(productRequest.getImageUrl());
        product.setQuantity(productRequest.getQuantity());
        product.setExpiryDate(productRequest.getExpiryDate());
        
        Product updatedProduct = productService.updateProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id, Authentication authentication) {
        Optional<Product> product = productService.findById(id);
        
        if (product.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        String email = authentication.getName();
        if (!product.get().getSeller().getEmail().equals(email)) {
            return ResponseEntity.status(403).body("You can only delete your own products");
        }
        
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}