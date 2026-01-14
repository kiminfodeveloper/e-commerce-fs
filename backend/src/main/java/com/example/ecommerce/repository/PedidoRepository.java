package com.example.ecommerce.repository;

import com.example.ecommerce.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    Long countByDataPedidoAfter(LocalDateTime date);
    List<Pedido> findByDataPedidoBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(p.valorTotal) FROM Pedido p")
    Double sumTotalSales();
}
