package com.example.ecommerce;

import com.example.ecommerce.model.Cliente;
import com.example.ecommerce.model.Pedido;
import com.example.ecommerce.model.Produto;
import com.example.ecommerce.repository.ClienteRepository;
import com.example.ecommerce.repository.PedidoRepository;
import com.example.ecommerce.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Override
    public void run(String... args) throws Exception {
        if (produtoRepository.count() == 0) {
            Produto p1 = new Produto(null, "Smartphone Galaxy S23", "High-end smartphone", new BigDecimal("4500.00"), 50, "Eletrônicos");
            Produto p2 = new Produto(null, "Notebook Dell XPS 13", "Ultrabook for productivity", new BigDecimal("8900.00"), 20, "Computadores");
            Produto p3 = new Produto(null, "Monitor LG 27\"", "4K IPS Monitor", new BigDecimal("1800.00"), 30, "Acessórios");
            Produto p4 = new Produto(null, "Teclado Mecânico RGB", "Gaming keyboard", new BigDecimal("450.00"), 100, "Periféricos");
            Produto p5 = new Produto(null, "Mouse Gamer G502", "High precision mouse", new BigDecimal("350.00"), 150, "Periféricos");
            
            produtoRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5));
            
            Cliente c1 = new Cliente(null, "Maria Silva", "maria@email.com", "11999999999", LocalDateTime.now());
            Cliente c2 = new Cliente(null, "João Pereira", "joao@email.com", "11888888888", LocalDateTime.now());
            clienteRepository.saveAll(Arrays.asList(c1, c2));
            
            Pedido ped1 = new Pedido(null, c1, LocalDateTime.now().minusDays(2), new BigDecimal("4500.00"), Pedido.StatusPedido.ENTREGUE);
            Pedido ped2 = new Pedido(null, c2, LocalDateTime.now().minusDays(5), new BigDecimal("350.00"), Pedido.StatusPedido.PROCESSANDO);
            pedidoRepository.saveAll(Arrays.asList(ped1, ped2));
            
            System.out.println("Data seeded successfully!");
        }
    }
}
