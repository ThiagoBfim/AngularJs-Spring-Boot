'use strict';
	var app = angular.module('crudApp', []);
/*	app.service('LocalService', function(){});*/
	app.controller('ConsultaController', [ '$http', '$q', function($http, $q) {

		var carro = {};
		var self = this;
		self.hasNoElement = true;
		self.carros = [];
		listar();

		this.getCarros = function() {
			return self.carros;
		};

		function listar() {
			$http.get('/carros').success(function(data) {
				self.carros = data;
			}).error(function() {
				console.log("erro");
			});
		}

		this.removerCarro = function (id) {
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

	} ]);

/*	app.directive("navbarMenu", function() {
		return {
			restrict : 'E',
			templateUrl : '../home.html'
		};
	});*/

