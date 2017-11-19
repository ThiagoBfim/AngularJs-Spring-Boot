'use strict';


/*app.config(function ($routeProvider) {
    $routeProvider
       .when('/carro/:id', {
         controller: 'FriendsController',
         templateUrl: 'views/friends.html'
      })
      .otherwise({
        redirectTo: '/friends/foo'
      });  
})*/

app.config(function ($stateProvider) {
	$stateProvider.state('edicao', {
		url : '/carro',
		templateUrl : '/carro/4',
		controller : 'CadastroController',
		controllerAs : 'cadastroCtrl'
	});

})

app.controller('ConsultaController', [ '$http', '$q', '$scope',
		function($http, $q, $scope) {

			var carroFilter;
			var self = this;
			self.hasNoElement = true;
			self.carros = [];
			self.categorias = [];
			self.tracoes = [];
			listarCategorias();
			listarTracoes();

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

			$scope.$watch('[consultaCtrl.carro.placa, consultaCtrl.carro.modelo.descricao, consultaCtrl.carro.tracao, consultaCtrl.carro.categoria]', function(val) {
				$http({
					method : 'POST',
					url : '/carrosByFiltro',
					data : JSON.stringify(self.carro)
				}).success(function(data) {
					self.carros = data;
				}).error(function() {
					console.log("erro");
				});
			});

			this.removerCarro = function(id) {
				console.log("Excluir" + id);
				$http({
					method : 'DELETE',
					url : '/carro/' + id,
				}).success(function(data) {
					console.log(data);
					listar();
				}).error(function() {
					console.log("erro");
				});
			}

			function listarCategorias() {
				$http.get('/categorias').success(function(data) {
					self.categorias = data;
				}).error(function() {
					console.log("erro");
				});
			}

			function listarTracoes() {
				$http.get('/tracoes').success(function(data) {
					self.tracoes = data;

				}).error(function() {
					console.log("erro");
				});
			}

		} ]);

/*
 * app.directive("navbarMenu", function() { return { restrict : 'E', templateUrl :
 * '../home.html' }; });
 */

