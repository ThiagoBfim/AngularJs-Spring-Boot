package n3m7.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import n3m7.entity.Carro;
import n3m7.entity.Modelo;
import n3m7.entity.enuns.Categoria;
import n3m7.entity.enuns.Tracao;
import n3m7.service.CarroService;
import n3m7.service.ModeloService;

@RestController
public class CarroController {

	@Autowired
	private CarroService carroService;

	@Autowired
	private ModeloService modeloService;

	@ResponseBody
	@PostMapping(value = "/carro/salvar")
	public ResponseEntity<?> salvar(@RequestBody final Carro carro) {
		Carro carroRetrived = carroService.retrieveByPlaca(carro.getPlaca());
		if (carroRetrived != null) {
			List<String> erros = new ArrayList<>();
			erros.add("Placa já existente.");
			return ResponseEntity.badRequest().body(erros);
		}
		if (carro.getModelo().getId() == null) {
			Modelo modelo = modeloService.findByDescricao(carro.getModelo().getDescricao());
			if (modelo == null) {
				modeloService.salvar(carro.getModelo());
			} else {
				carro.setModelo(modelo);
			}
		}
		return new ResponseEntity<Carro>(carroService.salvar(carro), HttpStatus.OK);
	}

	@ResponseBody
	@PostMapping(value = "/carrosByFiltro")
	public ResponseEntity<List<Carro>> getCarrosByFiltro(@RequestBody final Carro carro) {
		List<Carro> carros = carroService.listar(carro);
		if (carros.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return new ResponseEntity<List<Carro>>(carros, HttpStatus.OK);
	}

	@GetMapping(value = "/categorias")
	public ResponseEntity<List<Categoria>> getCategorias() {
		List<Categoria> categorias = Arrays.asList(Categoria.values());
		if (categorias.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return new ResponseEntity<List<Categoria>>(categorias, HttpStatus.OK);
	}

	@GetMapping(value = "/tracoes")
	public ResponseEntity<List<Tracao>> getTracoes() {
		List<Tracao> tracoes = Arrays.asList(Tracao.values());
		if (tracoes.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return new ResponseEntity<List<Tracao>>(tracoes, HttpStatus.OK);
	}

	@RequestMapping(value = "/carro/{id}")
	public String getCarro(@PathVariable("id") Integer id, ModelMap modal) {

		Carro carro = carroService.obter(id);
		if (carro == null) {
			// return ResponseEntity.notFound().build();
		}
		modal.addAttribute("carroModel", carro);
		return "cadastro/cadastro.html";
		// return new ResponseEntity<Carro>(carro, HttpStatus.OK);
	}

	@DeleteMapping(value = "/carro/{id}")
	public ResponseEntity<?> deleteCarro(@PathVariable("id") Integer id) {

		Carro carro = carroService.obter(id);
		if (carro == null) {
			return ResponseEntity.notFound().build();
		}
		carroService.remover(id);
		return new ResponseEntity<Carro>(HttpStatus.NO_CONTENT);
	}

}
