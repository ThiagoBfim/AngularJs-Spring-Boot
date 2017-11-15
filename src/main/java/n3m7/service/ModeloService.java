package n3m7.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import n3m7.entity.Modelo;
import n3m7.repository.ModeloRepository;

@Service
public class ModeloService {

	@Autowired
	private ModeloRepository repository;

	public List<Modelo> listar() {
		return repository.findAll();
	}

	public Modelo obter(Integer id) {
		return repository.findOne(id);
	}

	@Transactional
	public Modelo salvar(Modelo modelo) {
		return repository.save(modelo);
	}

	@Transactional
	public void remover(Integer id) {
		repository.delete(id);
	}

	@Transactional
	public List<Modelo> retrieveStartsWith(String input) {
		return repository.findTop5ByDescricaoStartsWithIgnoreCase(input);
	}

	public Modelo findByDescricao(String descricao) {
		return repository.findByDescricao(descricao);
	}

}
