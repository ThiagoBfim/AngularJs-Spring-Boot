package n3m7.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import n3m7.entity.Carro;

public interface CarroRepository extends JpaRepository<Carro, Integer> {

	Carro findByPlaca(String placa);
}
