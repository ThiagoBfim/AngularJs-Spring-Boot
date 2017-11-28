package n3m7.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import n3m7.entity.Fabricante;
import n3m7.service.FabricanteService;

@RestController
public class FabricanteController {

	@Autowired
	private FabricanteService fabricanteService;

	@ResponseBody
	@PostMapping(value = "/fabricantes")
	public ResponseEntity<List<Fabricante>> getFabricantes(@RequestBody String startWith) {
		List<Fabricante> fabricantes;
		if (StringUtils.isEmpty(startWith.trim())) {
			fabricantes = fabricanteService.listar();
		} else {
			fabricantes = fabricanteService.findByNomeIgnoreCaseContaining(startWith);
		}
		if (fabricantes.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return new ResponseEntity<List<Fabricante>>(fabricantes, HttpStatus.OK);
	}

	@ResponseBody
	@PostMapping(value = "/fabricante/salvar")
	public ResponseEntity<Fabricante> salvar(@RequestBody final Fabricante fabricante) {
		return new ResponseEntity<Fabricante>(fabricanteService.salvar(fabricante), HttpStatus.OK);
	}

}