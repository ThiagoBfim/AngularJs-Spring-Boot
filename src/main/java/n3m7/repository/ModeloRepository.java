package n3m7.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import n3m7.entity.Modelo;

public interface ModeloRepository extends JpaRepository<Modelo, Integer> {

	List<Modelo> findTop5ByDescricaoStartsWithIgnoreCase(String input);

	Modelo findByDescricao(String descricao);

}
