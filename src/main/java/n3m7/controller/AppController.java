package n3m7.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppController {

	@RequestMapping("/")
	String home(ModelMap modal) {
		modal.addAttribute("title","Home");
		return "home.html";
	}
	
	@RequestMapping("/cadastro")
	String cadastro(ModelMap modal) {
		modal.addAttribute("title","Cadastro");
		return "cadastro/cadastro.html";
	}
	@RequestMapping("/consulta")
	String consulta(ModelMap modal) {
		modal.addAttribute("title","Consulta");
		return "consulta/consulta.html";
	}
	

	@RequestMapping("/partials/{page}")
	String partialHandler(@PathVariable("page") final String page) {
		return page;
	}

}
