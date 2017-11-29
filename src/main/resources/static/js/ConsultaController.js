'use strict';


app.config(function ($stateProvider) {

	$stateProvider.state('edicao', {
	    url: '/carro/:id',
	    templateUrl: '/cadastro' ,
	    controller : 'CadastroController',
	    controllerAs: 'cadastroCtrl'
	});

})

app.controller('ConsultaController', [ '$http', '$q', '$scope', 'Restangular',
		function($http, $q, $scope, Restangular) {

			var carroFilter;
			var self = this;
			self.hasNoElement = true;
			self.carros = [];
			self.categorias = [];
			self.tracoes = [];

			self.carro = {
				id : null,
				placa : null,
				modelo : null,
				tracao : null,
				categoria : null
			};

			this.getCarros = function() {
				return self.carros;
			};

			$scope.$watch('[consultaCtrl.carro.placa, consultaCtrl.carro.modelo.descricao, consultaCtrl.carro.tracao, consultaCtrl.carro.categoria, consultaCtrl.carro.fabricante.nome]', function(val) {
				listar();
			});
			
			Restangular.all('/carrosByFiltro').post(self.carro).then(function(result) {
				self.carros = result;
		    });
			
			function listar(){
				Restangular.all('/carrosByFiltro').post(self.carro).then(function(result) {
					self.carros = result;
			    });
			}
			
			this.removerCarro = function(id) {
				Restangular.all('/carro/' + id).remove().then(function() {
					listar();
			    });
			}
			
			Restangular.all('/categorias').getList().then(function(result) {
				self.categorias = result;
		    });
			
			Restangular.all('/tracoes').getList().then(function(result) {
				self.tracoes = result;
		    });
		
		} ]);

