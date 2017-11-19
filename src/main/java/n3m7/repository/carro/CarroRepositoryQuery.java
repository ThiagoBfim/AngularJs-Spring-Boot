package n3m7.repository.carro;

import java.util.List;

import n3m7.entity.Carro;

public interface CarroRepositoryQuery {

	List<Carro> listarByFiltro(Carro carro);
}
