package com.example.ecommerce.repository;

import com.example.ecommerce.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Long countByDataCriacaoAfter(LocalDateTime date);
}
