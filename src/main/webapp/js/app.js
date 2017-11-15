var app = angular.module('crudApp', [ 'ui.router' ]);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('cadastro', {
		url : '/cadastro',
		templateUrl : 'cadastro.html',
		controller : 'CadastroController',
		controllerAs : 'cadastroCtrl'
	});

	$stateProvider.state('consulta', {
		url : '/consulta',
		templateUrl : 'consulta.html',
		controller : 'ConsultaController',
		controllerAs : 'consultaCtrl'
	});

});
