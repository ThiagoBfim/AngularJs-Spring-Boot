package n3m7.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import n3m7.entity.Carro;
import n3m7.repository.carro.CarroRepositoryQuery;

public interface CarroRepository extends JpaRepository<Carro, Integer>, CarroRepositoryQuery {

	Carro findByPlaca(String placa);
}
