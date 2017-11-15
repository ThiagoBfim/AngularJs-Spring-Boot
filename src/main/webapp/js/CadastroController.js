'use strict';
	var app = angular.module('crudApp', ['ngMask']);
	//app.service('LocalService', function(){});
	app.controller('CadastroController', [
			'$http',
			'$scope',
			function($http, $scope) {

				var self = this;
				self.carro = {};
				errorMessage
				self.descricaoTemp = '';
				$scope.categorias = listarCategorias();
				$scope.tracoes = listarTracoes();
				$scope.modelos = [];
				
				$scope.temErro = false;
				$scope.mensagemErro = "teste";
				
				$scope.isModeloSelected = false;

				this.salvar = function() {
					cadastrar();
				};

				function cadastrar(callback) {
					$http({
						method : 'POST',
						url : '/carro/salvar',
						data : JSON.stringify(self.carro)
					}).success(function(data) {
						if (callback)
							callback(data)
					}).error(function(data) {
						console.log(data[0]);
						$scope.mensagemErro = data[0];
						$scope.temErro = true;
					});
				}

				function listarCategorias() {
					$http.get('/categorias').success(function(data) {
						$scope.categorias = data;
					}).error(function() {
						console.log("erro");
					});
				}

				function listarTracoes() {
					$http.get('/tracoes').success(function(data) {
						$scope.tracoes = data;
				
					}).error(function() {
						console.log("erro");
					});
				}

				$scope.$watch('cadastroCtrl.carro.modelo.descricao', function(
						val) {
					if (val != '' && val != undefined && val.length > 2 
							&& !$scope.isModeloSelected) {
						typeAheadModelo(val);
						if(self.descricaoTemp !== val
								&& self.carro.modelo.id !== null){
							self.carro.modelo.id = null;
						}
					} else {
						$scope.modelos = [];
					}
					$scope.isModeloSelected = false;
				});

				function typeAheadModelo(val) {
					$http({
						method : 'POST',
						url : '/modelos',
						data : val
					}).success(function(data) {
						if (data != null) {
							$scope.modelos = data;
						}
					}).error(function() {
						console.log("erro");
					});
				}

				this.selectModelo = function(modelo) {
					$scope.isModeloSelected = true;
					$scope.modelos = [];
					self.carro.modelo = modelo;
					self.descricaoTemp = modelo.descricao;
				}

			} ]);

	app.directive("navbarMenu", function() {
		return {
			restrict : 'E',
			templateUrl : '../home.html'
		};
	});

