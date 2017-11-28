'use strict';
app.controller('CadastroController', [
		'$http',
		'$scope',
		function($http, $scope) {

			var self = this;
			self.carro = {};
			self.success = false;
			self.descricaoTemp = '';
			$scope.categorias = [];
			$scope.tracoes = [];
			$scope.modelos = [];
			listarCategorias();
			listarTracoes();

			$scope.temMensagem = false;
			$scope.mensagem = "teste";

			self.fabricantes = [];
			self.fabricante = {};
			retrieveFabricantes();

			$scope.isModeloSelected = false;

			this.getFabricantes = function() {
				return self.fabricantes;
			};

			function retrieveFabricantes() {
				var nome = " ";
				if (self.fabricante.nome != undefined) {
					nome = self.fabricante.nome;
				}
				$http({
					method : 'POST',
					url : '/fabricantes',
					data : nome
				}).success(function(data) {
					self.fabricantes = data;
				}).error(function() {
					console.log("erro");
				});
			}
			
			this.selecionar = function() {
				self.fabricantes.forEach(function(f){
					//F.SELECIONADO ESTÁ UNDEFINED. PQ???
					if(f.selecionado || f.selecionado == undefined){
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
				$http({
					method : 'POST',
					url : '/fabricante/salvar',
					data : JSON.stringify(self.fabricante)
				}).success(function(data) {
					self.carro.fabricante = data;
					self.carro.fabricante.selecionado = true;
					self.fabricantes.pop(self.carro.fabricante);
				}).error(function(data) {
					console.log("erro");
				});
			};

			function cadastrar(callback) {
				$http({
					method : 'POST',
					url : '/carro/salvar',
					data : JSON.stringify(self.carro)
				}).success(function(data) {
					if (callback) {
						callback(data)
					}
					self.success = true;
					$scope.temMensagem = true;
					$scope.mensagem = "Carro Salvo com Sucesso!";
					console.log($scope.mensagem);

				}).error(function(data) {
					console.log(data[0]);
					$scope.mensagem = data[0];
					$scope.temMensagem = true;
					self.success = false;
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
