'use strict';

angular.module('crudApp').factory('LocalService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

            var factory = {
            	listarCategorias: listarCategorias,
            	listarTracoes: listarTracoes
            };

            return factory;

            function listarCategorias() {
            	console.log("listar Categorias");
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

        }
    ]);