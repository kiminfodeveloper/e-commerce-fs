package com.example.ecommerce.controller;

import com.example.ecommerce.model.Produto;
import com.example.ecommerce.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @GetMapping
    public List<Produto> getAll(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return repository.findByNomeContainingIgnoreCase(search);
        }
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Produto create(@RequestBody Produto produto) {
        return repository.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> update(@PathVariable Long id, @RequestBody Produto details) {
        return repository.findById(id)
                .map(produto -> {
                    produto.setNome(details.getNome());
                    produto.setDescricao(details.getDescricao());
                    produto.setPreco(details.getPreco());
                    produto.setEstoque(details.getEstoque());
                    produto.setCategoria(details.getCategoria());
                    return ResponseEntity.ok(repository.save(produto));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return repository.findById(id)
                .map(produto -> {
                    repository.delete(produto);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
