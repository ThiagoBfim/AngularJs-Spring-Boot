(function() {
	'use strict';

	angular
		.module('crudApp')
		.controller('CadastroController', CadastroController)
		.directive('fabricante', function() {
		  return {
			  controller: CadastroController,
			  controllerAs: 'cadastroCtrl',
			  templateUrl: '../cadastro/fabricanteModal.html'
		  };
		})
	  	.directive('modelo', function() {
		  return {
			  templateUrl: '../cadastro/modelo.html'
		  };
		});
	
	CadastroController.$inject = [ '$http', '$scope', 'Restangular', '$stateParams' ];

	
	function CadastroController($http, $scope, Restangular, $stateParams) {

		var self = this;
		self.carro = {};
		self.success = false;
		self.descricaoTemp = '';
		$scope.categorias = [];
		$scope.tracoes = [];
		$scope.modelos = [];

		$scope.temMensagem = false;
		$scope.mensagem = "";
		self.saveButton = "Salvar";

		self.fabricantes = [];
		self.fabricante = {};
		retrieveCarroById();
		$scope.isModeloSelected = false;
		var id = $stateParams.id;
		retrieveFabricantes();

		function retrieveCarroById() {
			var id = $stateParams.id;
			if (id != null) {
				Restangular
						.one('/carro/' + id)
						.get()
						.then(function(result) {
								self.carro = result;
								self.descricaoTemp = self.carro.modelo.descricao;
								self.saveButton = "Alterar";
							});
			}
		}

		this.getFabricantes = function() {
			return self.fabricantes;
		};

		function retrieveFabricantes() {
			var nome = " ";
			if (self.fabricante.nome != undefined) {
				nome = self.fabricante.nome;
			}
			Restangular
					.all('/fabricantes')
					.post(nome)
					.then(function(result) {
						self.fabricantes = result == undefined ? [] : result;
						angular.forEach(self.fabricantes, function(obj) {
								if (self.carro.fabricante != undefined
										&& obj.id === self.carro.fabricante.id) {
									obj.selecionado = true;
								}
							});
						});
		}

		this.selecionar = function() {
			self.fabricantes.forEach(function(f) {
				if (f.selecionado || f.selecionado == undefined) {
					self.carro.fabricante = f;
				}
			});
		};

		$scope.$watch('cadastroCtrl.fabricante.nome',
				function(val) {
					retrieveFabricantes();
				});

		this.salvar = function() {
			cadastrar();
		};

		this.salvarFabricante = function() {

			Restangular
					.all('/fabricante/salvar')
					.post(self.fabricante)
					.then(function(result) {
							self.carro.fabricante = result;
							self.carro.fabricante.selecionado = true;
							self.fabricantes.pop(self.carro.fabricante);
							self.fabricante = {};
						});
		};

		function cadastrar(callback) {
			Restangular
					.all('/carro/salvar')
					.post(self.carro)
					.then(function(result) {
							self.success = true;
							$scope.temMensagem = true;
							$scope.mensagem = "Carro Salvo com Sucesso!";
							if (self.carro.id != null) {
								$scope.mensagem = "Carro Alterado com Sucesso!";
							}

						},
						function(result) {
							$scope.mensagem = result.data[0];
							$scope.temMensagem = true;
							self.success = false;
						});

		}
	
		$scope
		.$watch('cadastroCtrl.carro.modelo.descricao',
			function(val) {
				if (val != ''
						&& val != undefined
						&& val.length >= 2
						&& !$scope.isModeloSelected) {
					if(self.carro.modelo === undefined || self.carro.modelo.id === null){
						typeAheadModelo(val);
					}
					if (self.carro.modelo !== undefined && self.descricaoTemp !== val
							&& self.carro.modelo.id !== null) {
						self.carro.modelo.id = null;
					}
				} else {
					$scope.modelos = [];
				}
				$scope.isModeloSelected = false;
			});

		function typeAheadModelo(val) {
			Restangular.all('/modelos').post(val).then(
				function(result) {
					$scope.modelos = result;
				});
		}
	
		this.selectModelo = function(modelo) {
			$scope.isModeloSelected = true;
			$scope.modelos = [];
			self.carro.modelo = modelo;
			self.descricaoTemp = modelo.descricao;
		}
	
		Restangular.all('/categorias').getList().then(
			function(result) {
				$scope.categorias = result;
			});

		Restangular.all('/tracoes').getList().then(
			function(result) {
				$scope.tracoes = result;
			});
	}
})();
