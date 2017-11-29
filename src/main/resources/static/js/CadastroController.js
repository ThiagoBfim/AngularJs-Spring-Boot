'use strict';
app.controller('CadastroController', [
		'$http',
		'$scope',
		'Restangular',
		'$stateParams',
		function($http, $scope, Restangular, $stateParams) {

			var self = this;
			self.carro = {};
			self.success = false;
			self.descricaoTemp = '';
			$scope.categorias = [];
			$scope.tracoes = [];
			$scope.modelos = [];

			$scope.temMensagem = false;
			$scope.mensagem = "teste";
			self.saveButton = "Salvar";

			self.fabricantes = [];
			self.fabricante = {};
			retrieveCarroById();
			retrieveFabricantes();

			$scope.isModeloSelected = false;

			var id = $stateParams.id;

			function retrieveCarroById() {
				var id = $stateParams.id;
				if (id != null) {
					Restangular.one('/carro/' + id).get().then(function(result) {
						self.carro = result;
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
				Restangular.all('/fabricantes').post(nome).then(
						function(result) {
							self.fabricantes = result == undefined ? []
									: result;
						});
			}

			this.selecionar = function() {
				self.fabricantes.forEach(function(f) {
					// F.SELECIONADO ESTÁ UNDEFINED. PQ???
					if (f.selecionado || f.selecionado == undefined) {
						self.carro.fabricante = f;
						console.log(self.carro.fabricante);
					}
				});
			};

			$scope.$watch('cadastroCtrl.fabricante.nome', function(val) {
				retrieveFabricantes();
			});

			this.salvar = function() {
				cadastrar();
			};

			this.salvarFabricante = function() {

				Restangular.all('/fabricante/salvar').post(self.fabricante)
						.then(function(result) {
							self.carro.fabricante = result;
							self.carro.fabricante.selecionado = true;
							self.fabricantes.pop(self.carro.fabricante);
							self.fabricante = {};
						});
			};

			function cadastrar(callback) {
				Restangular.all('/carro/salvar').post(self.carro).then(
						function(result) {
							self.success = true;
							$scope.temMensagem = true;
							$scope.mensagem = "Carro Salvo com Sucesso!";
							if(self.carro.id != null){
								$scope.mensagem = "Carro Alterado com Sucesso!";
							}
							
							console.log($scope.mensagem);
						}, function(data) {
							console.log(data[0]);
							$scope.mensagem = data[0];
							$scope.temMensagem = true;
							self.success = false;
						});

			}

			$scope.$watch('cadastroCtrl.carro.modelo.descricao', function(val) {
				if (val != '' && val != undefined && val.length >= 2
						&& !$scope.isModeloSelected) {
					typeAheadModelo(val);
					if (self.descricaoTemp !== val
							&& self.carro.modelo.id !== null) {
						self.carro.modelo.id = null;
					}
				} else {
					$scope.modelos = [];
				}
				$scope.isModeloSelected = false;
			});

			function typeAheadModelo(val) {
				Restangular.all('/modelos').post(val).then(function(result) {
					$scope.modelos = result;
				});
			}

			this.selectModelo = function(modelo) {
				$scope.isModeloSelected = true;
				$scope.modelos = [];
				self.carro.modelo = modelo;
				self.descricaoTemp = modelo.descricao;
			}

			Restangular.all('/categorias').getList().then(function(result) {
				$scope.categorias = result;
			});

			Restangular.all('/tracoes').getList().then(function(result) {
				$scope.tracoes = result;
			});

		} ]);
