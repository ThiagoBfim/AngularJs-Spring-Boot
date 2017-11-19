package n3m7.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import n3m7.entity.Carro;
import n3m7.repository.CarroRepository;

@Service
public class CarroService {

    @Autowired
    private CarroRepository repository;

    public List<Carro> listar(Carro carro) {
        return repository.listarByFiltro(carro);
    }

    public Carro obter(Integer id) {
        return repository.findOne(id);
    }

    @Transactional
    public Carro salvar(Carro carro) {
        return repository.save(carro);
    }

    @Transactional
    public void remover(Integer id) {
        repository.delete(id);
    }

	public Carro retrieveByPlaca(String placa) {
		return repository.findByPlaca(placa);
	}

}
