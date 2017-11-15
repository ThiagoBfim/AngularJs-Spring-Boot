package n3m7.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import n3m7.entity.Fabricante;

public interface FabricanteRepository extends JpaRepository<Fabricante, Integer> {

	List<Fabricante> findByNomeIgnoreCaseContaining(String nome);

}
