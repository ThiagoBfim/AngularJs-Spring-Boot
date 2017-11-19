var app = angular.module('crudApp', [ 'ui.router', 'ngMask' ]);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('cadastro', {
		url : '/carro',
		templateUrl : '/cadastro',
		controller : 'CadastroController',
		controllerAs : 'cadastroCtrl'
	});

	$stateProvider.state('consulta', {
		url : '/carros',
		templateUrl : '/consulta',
		controller : 'ConsultaController',
		controllerAs : 'consultaCtrl'
	});

});
