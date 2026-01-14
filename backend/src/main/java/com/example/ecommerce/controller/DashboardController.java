package com.example.ecommerce.controller;

import com.example.ecommerce.repository.ClienteRepository;
import com.example.ecommerce.repository.PedidoRepository;
import com.example.ecommerce.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        
        Double totalSales = pedidoRepository.sumTotalSales();
        stats.put("totalVendas", totalSales != null ? totalSales : 0.0);
        
        stats.put("totalPedidos", pedidoRepository.count());
        stats.put("totalClientes", clienteRepository.count());
        stats.put("totalProdutos", produtoRepository.count());
        
        // Novos clientes nos últimos 30 dias
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        stats.put("novosClientes", clienteRepository.countByDataCriacaoAfter(thirtyDaysAgo));
        
        return stats;
    }

    @GetMapping("/vendas-mensais")
    public List<Map<String, Object>> getMonthlySales() {
        List<Map<String, Object>> data = new ArrayList<>();
        String[] months = {"Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"};
        
        // Mocking data for the chart if DB is empty, or normally you'd query by month
        // In a real app, you'd use a native query with GROUP BY month
        for (int i = 0; i < 6; i++) {
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("name", months[i]);
            monthData.put("vendas", 1000 + (Math.random() * 5000));
            data.add(monthData);
        }
        
        return data;
    }
}
