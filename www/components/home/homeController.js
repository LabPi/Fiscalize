myApp.controller('HomeController', function($scope, $timeout, $window,$http, $location, $routeParams, requisicaoFactory, $cordovaDevice, myCache, Fiscalizados, $cordovaSocialSharing, ngMeta, Convenios, Search, Page) {

    // Page Initial Value
    page = 1;

    // Const Values
    PAGESIZE = 10;
    ADDRESS = 'http://74.124.24.115:8080'
    COLLECTION = 'ConveniosProgramasFTS'

    // Requisition Home 
    $scope.home = function() {

        $scope.restorePreviousHome();

        if (angular.isUndefined($scope.convenios)) {
            $scope.convenios = [];
            $scope.url = '/hackathon/' + COLLECTION + '?count&page=' + page + '&pagesize=' + PAGESIZE + '&hal=f';
            $scope.requisition();
        };
    }

    // Requisition Search 
    $scope.search = function() {

        Search.setSearch($scope.searchParam);
        Search.setEstado($scope.estadoSelecionado);
        Search.setCidade($scope.cidadeSelecionado);
        Search.setMinisterio($scope.ministerioSelecionado);
        Search.setSituacao($scope.situacaoSelecionado);

        $scope.flagQtdRetornados = true;

        var textSearchArg = '';
        if (!(angular.isUndefined($scope.searchParam) || $scope.searchParam == null)) {
        	
        	if($scope.searchParam.split(" ").lenght > 1)
        	{
        		$scope.searchParam = '\"' + $scope.searchParam.replace(' ', '+') + '\"';
        	}

            textSearchArg = ',$text:{$search:"' + $scope.searchParam + '"}';
        }

        $scope.convenios = [];
        estado = angular.isUndefined($scope.estadoSelecionado) ? "" : $scope.estadoSelecionado.UF_PROPONENTE;
        cidade = angular.isUndefined($scope.cidadeSelecionado) ? "" : $scope.cidadeSelecionado.NM_MUNICIPIO_PROPONENTE;
        ministerio = angular.isUndefined($scope.ministerioSelecionado) ? "" : $scope.ministerioSelecionado.NM_ORGAO_SUPERIOR;
        situacao = angular.isUndefined($scope.situacaoSelecionado) ? "" : $scope.situacaoSelecionado.TX_SITUACAO;
        $scope.url = '/hackathon/' + COLLECTION + '?count&page=' + page + '&pagesize=' + PAGESIZE + '&filter={UF_PROPONENTE:{$regex:"' + estado + '"},NM_MUNICIPIO_PROPONENTE:{$regex:"' + cidade + '"},TX_SITUACAO:{$regex:"' + situacao + '"},NM_ORGAO_SUPERIOR:{$regex:"' + ministerio + '"}' + textSearchArg + '}&sort_by=DT_INICIO_VIGENCIA&hal=f';
        $scope.requisition();
    }

    // Requisition Scroll 
    $scope.loadMore = function() {
        $scope.requisition();
    };

    $scope.flagSearch = function(show) {

    	if($scope.advSearch && $scope.advSearch == show)
    		show = false;

        $scope.advSearch = show;
    }

    // Requisition Convenios
    $scope.requisition = function() {

    	$scope.flagSearch(false);
        convenios_temp = [];

        if ($scope.url != null) {

            $scope.totalConvenios = 0;

            requisicaoFactory.getRequest(ADDRESS + $scope.url).then(function(result) {

                if (result._size > 0) {
                    convenios_temp = angular.fromJson(result._embedded["rh:doc"]);

                    angular.forEach(convenios_temp, function(value, key) {

                        value = $scope.prepareConvenioDetail(value);

                        $scope.convenios.push(value);

                        $scope.totalConvenios = result._size;
                        Convenios.setTotal($scope.totalConvenios);

                    });

                    Convenios.setLista($scope.convenios);

                }

                $scope.url = angular.isDefined(result._links.next) ? result._links.next.href : null;

            }, function(reason) {
                alert("Pesquisa muito abrangente, favor restringir através dos filtros avançados!");
                console.log("reason:", reason);
                // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
            }, function(update) {
                console.log("update:", update);
            })
        }
    }

    // Requisition Estados
    $scope.requisitionEstados = function() {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/Estados?sort_by=UF_PROPONENTE').then(function(result) {
            $scope.estados = angular.fromJson(result._embedded["rh:doc"]);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }

    $scope.estadoChange = function() {
            $scope.requisitionCidades($scope.estadoSelecionado);
        }
        // Requisition Cidades
    $scope.requisitionCidades = function(estado) {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/Municipios?pagesize=1000&filter={UF_PROPONENTE:"' + estado.UF_PROPONENTE + '"}&sort_by=NM_MUNICIPIO_PROPONENTE').then(function(result) {
            $scope.cidades = angular.fromJson(result._embedded["rh:doc"]);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }

    // Requisition Convenios
    $scope.requisitionMinisterios = function() {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/Ministerios?sort_by=NM_ORGAO_SUPERIOR').then(function(result) {
            $scope.ministerios = angular.fromJson(result._embedded["rh:doc"]);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }

    $scope.requisitionSituacoes = function() {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/SituacaoConvenio?sort_by=TX_SITUACAO').then(function(result) {
            $scope.situacoes = angular.fromJson(result._embedded["rh:doc"]);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }


    $scope.fiscalizar = function(convenio) {


        convenio_fiscalizado = {};
        convenio_fiscalizado.NR_CONVENIO = convenio.NR_CONVENIO;
        convenio_fiscalizado.NM_ORGAO_SUPERIOR = convenio.NM_ORGAO_SUPERIOR;
        convenio_fiscalizado.TX_SITUACAO = convenio.TX_SITUACAO;
        convenio_fiscalizado.DT_INICIO_VIGENCIA = convenio.DT_INICIO_VIGENCIA;
        convenio_fiscalizado.DT_FIM_VIGENCIA = convenio.DT_FIM_VIGENCIA;
        convenio_fiscalizado.VL_GLOBAL = convenio.VL_GLOBAL;

        // Create Post Object
        $scope.fiscalizado = {};
        $scope.fiscalizado.uuid = myCache.get('uuid');
        $scope.fiscalizado.convenio = convenio_fiscalizado;
        $scope.fiscalizado.situacao = 1;
        $scope.fiscalizado.dt_updated = new Date();

        //Post Requisition
        requisicaoFactory.postRequest(ADDRESS + '/hackathon/Fiscalizados', $scope.fiscalizado).then(function(result) {
            alert('UUID: ' + $scope.fiscalizado.uuid + ' Fiscalizando Convenio: ' + $scope.fiscalizado.convenio.NR_CONVENIO);

            $scope.refreshFiscalizados();

        }, function(reason) {
            alert("Convenio já está sendo Fiscalizado!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }


    $scope.midiaShare = function(convenio) {

		link = 'http://74.124.24.115:8000/#/detalhe/' + convenio.NR_CONVENIO

		$cordovaSocialSharing
			.share(null, null, null, link) // Share via native share sheet
				.then(function(result) {
					// Success!
					console.log("teste share!")
				}, function(err) {
					// An error occured. Show a message to the user
				}
		);
	}

	$scope.midiaShareFace = function(convenio) {

		// Meta Dinamico Futura Build
		// ngMeta.setTag('og:title', convenio.NR_CONVENIO)
		// ngMeta.setTag('og:description','balbalbalbabalbalba');
		// ngMeta.setTag('og:image','http://www.sinproesemmabdc.com.br/img/icon_convenios.png');
		
		link = 'http://74.124.24.115:8000/#/detalhe/' + convenio.NR_CONVENIO

		$cordovaSocialSharing
		    .shareViaFacebook(null, null, link)
		    .then(function(result) {
		      // Success!
		    }, function(err) {
		      // An error occurred. Show a message to the user
		});
	}



    $scope.restorePreviousHome = function() {
        //Restore Previous Convenios List
        Convenios.getLista();

        // Verifica se Lista Convenios é nula
        if (Convenios.getLista().length != 0) {
            $scope.convenios = Convenios.getLista();
        }

        // Restore Total
        $scope.totalConvenios = Convenios.getTotal();

        if (Convenios.getTotal()>=0) {
            $scope.flagQtdRetornados = true;
        } 

        // Restore Search Param
        $scope.searchParam = Search.getSearch();

        // Restore AdvSearch
        $scope.estadoSelecionado = Search.getEstado();
        $scope.cidadeSelecionado = Search.getCidade();
        $scope.ministerioSelecionado = Search.getMinisterio();
        $scope.situacaoSelecionado = Search.getSituacao();
        
    }

    $scope.limparBusca = function () {
        delete $scope.searchParam;
        delete $scope.estadoSelecionado;
        delete $scope.cidadeSelecionado;
        delete $scope.ministerioSelecionado;
        delete $scope.situacaoSelecionado;
    }

    //Reposição do Scroll ao Voltar - Futura Build

    // $scope.setPageProperties = function() {
    //     var ScrollPos = retrieveScrollableContent().scrollableContent.scrollTop;
    //     Page.setScrollPos(ScrollPos);
    // }

    // function retrieveScrollableContent() {
    //     var elem = angular.element("#homeScroll");
    //     var sc = elem.controller('scrollableContent');
    //     return sc;
    // }

    // $scope.$watch("convenios", function () {
    //         if (angular.isDefined(Page.getScrollPos())) {
    //           retrieveScrollableContent().scrollTo(Page.getScrollPos());
    //       }
    // });

    // Initial Call Home
    $scope.home();
    $scope.requisitionEstados();
    $scope.requisitionMinisterios();
    $scope.requisitionSituacoes();
    $scope.refreshFiscalizados();
  

});
