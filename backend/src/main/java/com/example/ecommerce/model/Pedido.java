package com.example.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private LocalDateTime dataPedido;
    private BigDecimal valorTotal;
    
    @Enumerated(EnumType.STRING)
    private StatusPedido status;

    @PrePersist
    protected void onCreate() {
        dataPedido = LocalDateTime.now();
    }

    public enum StatusPedido {
        PENDENTE, PROCESSANDO, ENVIADO, ENTREGUE, CANCELADO
    }
}
