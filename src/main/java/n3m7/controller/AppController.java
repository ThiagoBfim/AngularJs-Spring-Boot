package n3m7.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppController {

	@RequestMapping("/")
	public String home(ModelMap modal) {
		return "home.html";
	}
	
	@RequestMapping("/cadastro")
	public String cadastro(ModelMap modal) {
		return "cadastro/cadastro.html";
	}

	@RequestMapping("/consulta")
	public String consulta(ModelMap modal) {
		return "consulta/consulta.html";
	}

}
