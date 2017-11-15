package n3m7.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import n3m7.entity.Carro;
import n3m7.entity.enuns.Categoria;
import n3m7.entity.enuns.Tracao;
import n3m7.service.CarroService;
import n3m7.service.ModeloService;
import n3m7.util.CustomErrorType;

@RestController
public class CarroController {

	@Autowired
	private CarroService carroService;

	@Autowired
	private ModeloService modeloService;

	@ResponseBody
	@RequestMapping(value = "/carro/salvar", method = RequestMethod.POST)
	public ResponseEntity<?> salvar(@RequestBody final Carro carro) {
		Carro carroRetrived = carroService.retrieveByPlaca(carro.getPlaca());
		if(carroRetrived != null){
			List<String> erros = new ArrayList<>();
			erros.add("Placa já existente.");
			return ResponseEntity.badRequest().body(erros);
		}
		if (carro.getModelo().getId() == null) {
			modeloService.salvar(carro.getModelo());
		}
		return new ResponseEntity<Carro>(carroService.salvar(carro), HttpStatus.OK);
	}

	@RequestMapping(value = "/carros", method = RequestMethod.GET)
	public ResponseEntity<List<Carro>> getCarros() {
		List<Carro> carros = carroService.listar();
		// TODO REMOVER ESSE SYSOUT.
		System.out.println(carros);
		if (carros.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Carro>>(carros, HttpStatus.OK);
	}

	@RequestMapping(value = "/categorias", method = RequestMethod.GET)
	public ResponseEntity<List<Categoria>> getCategorias() {
		List<Categoria> categorias = Arrays.asList(Categoria.values());
		if (categorias.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Categoria>>(categorias, HttpStatus.OK);
	}

	@RequestMapping(value = "/tracoes", method = RequestMethod.GET)
	public ResponseEntity<List<Tracao>> getTracoes() {
		List<Tracao> tracoes = Arrays.asList(Tracao.values());
		if (tracoes.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Tracao>>(tracoes, HttpStatus.OK);
	}

	@RequestMapping(value = "/carro/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {

		Carro carro = carroService.obter(id);
		if (carro == null) {
			return new ResponseEntity(new CustomErrorType("Unable to delete. User with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		carroService.remover(id);
		return new ResponseEntity<Carro>(HttpStatus.NO_CONTENT);
	}

}
