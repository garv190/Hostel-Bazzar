package com.hostelbazaar.repository;

import com.hostelbazaar.entity.Product;
import com.hostelbazaar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsAvailableTrue();
    List<Product> findBySeller(User seller);
    List<Product> findByCategory(String category);
    List<Product> findByIsAvailableTrueAndCategory(String category);
    
    @Query("SELECT p FROM Product p WHERE p.isAvailable = true AND " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Product> findByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT p FROM Product p WHERE p.isAvailable = true AND p.seller.hostel = :hostel")
    List<Product> findAvailableProductsByHostel(@Param("hostel") String hostel);
}