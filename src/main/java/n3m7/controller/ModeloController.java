package n3m7.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import n3m7.entity.Modelo;
import n3m7.service.ModeloService;

@RestController
public class ModeloController {

	@Autowired
	private ModeloService modeloService;

	@ResponseBody
	@RequestMapping(value = "/modelos", method = RequestMethod.POST)
	public ResponseEntity<List<Modelo>> getModelos(@RequestBody final String startWith) {
		List<Modelo> modelos = modeloService.retrieveStartsWith(startWith);
		// TODO REMOVER ESSE SYSOUT.
		System.out.println("TESTTE" + modelos + "\n" + startWith);
		if (modelos.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Modelo>>(modelos, HttpStatus.OK);
	}
}
