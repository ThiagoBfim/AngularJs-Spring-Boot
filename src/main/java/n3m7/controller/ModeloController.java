package n3m7.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import n3m7.entity.Modelo;
import n3m7.service.ModeloService;

@RestController
public class ModeloController {

	@Autowired
	private ModeloService modeloService;

	@ResponseBody
	@PostMapping(value = "/modelos")
	public ResponseEntity<List<Modelo>> getModelos(@RequestBody final String startWith) {
		List<Modelo> modelos = modeloService.retrieveStartsWith(startWith);
		if (modelos.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return new ResponseEntity<List<Modelo>>(modelos, HttpStatus.OK);
	}
}
