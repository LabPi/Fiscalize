var myApp = angular.module('myApp', ['ngRoute', 'mobile-angular-ui', 'angular-svg-round-progressbar', 'chart.js','tc.chartjs','ngCordova', 'angular-simple-chat', 'ngMeta', '720kb.tooltips', 'ngPercentDisplay', 'mj.scrollingTabs']);
myApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
        })
    .when('/denuncia/:convenioId', {
        templateUrl: 'components/denuncia/denuncia.html',
        controller: 'DenunciaController'
        })
    .when('/detalhe/:convenioId', {
        templateUrl: 'components/detalhe/detalhe.html',
        controller: 'DetalheController'
        })
    .when('/chat/:convenioId', {
        templateUrl: 'components/chat/chat.html',
        controller: 'ChatController'
        })
    .when('/minhasmanifestacoes', {
        templateUrl: 'components/denuncia/minhasmanifestacoes.html',
        controller: 'MinhasManifestacoesController'
        });
});

myApp.config(function($httpProvider) {

    $httpProvider.interceptors.push(function($q) {
        return {
         'request': function(config) {
             $('#processing').show();
             return config;
          },

          'response': function(response) {
             $('#processing').hide();
             return response;
          },
          'responseError': function(response) {
             $('#processing').hide();
             return response;
          }
        };
    });
    
});

// Set up the cache ‘myCache’
myApp.factory('myCache', function($cacheFactory) {
    return $cacheFactory('myData');
});



myApp.service("Fiscalizados", function (myCache, $http) {
    
    function getLista() {
        return $http({
            "method": "get",
            "url": 'http://74.124.24.115:8080/hackathon/Fiscalizados?filter={uuid:"'+ myCache.get('uuid') +'"},{situacao:1}&hal=f'
        });
    }

    function updateDate(oid, etag, data) {
        return $http({
            "method": "patch",
            "headers": {'If-Match': etag},
            "data" : data,
            "url": "http://74.124.24.115:8080/hackathon/Fiscalizados/"+oid
        });
    }

    return {
        getLista: getLista,
        updateDate: updateDate
    }
});

myApp.service("Convenios", function (myCache, $http) {

        var listaConvenios = [];
        var totalConvenios;

        function getLista() {
            return listaConvenios;
        }

        function setLista(novaLista) {
            listaConvenios = novaLista;
        }

        function getListaFilter(filter) {
            return $http({
            "method": "get",
            "url": "http://74.124.24.115:8080/hackathon/ConveniosProgramasFTS"+filter
            });
        }

        function getTotal() {
            return totalConvenios;
        }

        function setTotal(novoTotal) {
            totalConvenios = novoTotal;
        }

        return {
            getLista: getLista,
            setLista: setLista,
            getTotal: getTotal,
            setTotal: setTotal,
            getListaFilter: getListaFilter,

        }
});


myApp.service("Estados", function (myCache, $http) {

        function getLista() {
            return $http({
            "method": "get",
            "url": "http://74.124.24.115:8080/hackathon/Estados?sort_by=UF_PROPONENTE"
            });
        }

        return {
            getLista: getLista,

        }
});

myApp.service("Municipios", function (myCache, $http) {

        function getLista(estado) {
            return $http({
            "method": "get",
            "url": 'http://74.124.24.115:8080/hackathon/Municipios?pagesize=1000&filter={UF_PROPONENTE:"' + estado + '"}&sort_by=NM_MUNICIPIO_PROPONENTE'
            });
        }

        return {
            getLista: getLista,

        }
});


myApp.service("Search", function (myCache, $http) {

        var search;
        var estado;
        var cidade;
        var ministerio;
        var situacao;
        var esfera;


        function getSearch() {
            return search;
        }

        function setSearch(newSearch) {
            search = newSearch;
        }

        function getEstado() {
            return estado;
        }

        function setEstado(newEstado) {
            estado = newEstado;
        }

        function getCidade() {
            return cidade;
        }

        function setCidade(newCidade) {
            cidade = newCidade;
        }

        function setEsfera(newEsfera) {
            esfera = newEsfera;
        }

        function getMinisterio() {
            return ministerio;
        }

        function setMinisterio(newMinisterio) {
            ministerio = newMinisterio;
        }

        function getSituacao() {
            return situacao;
        }

        function setSituacao(newSituacao) {
            situacao = newSituacao;
        }

        function getEsfera() {
            return esfera;
        }

        return {
            getSearch: getSearch,
            setSearch: setSearch,

            getEstado: getEstado,
            setEstado: setEstado,

            getCidade: getCidade,
            setCidade: setCidade,

            getMinisterio: getMinisterio,
            setMinisterio: setMinisterio,

            getSituacao: getSituacao,
            setSituacao: setSituacao,

            getEsfera: getEsfera,
            setEsfera: setEsfera,
        }
});

myApp.service("Page", function (myCache, $http) {

        var scrollPos;

        function getScrollPos() {
            return scrollPos;
        }

        function setScrollPos(newScrollPos) {
            scrollPos = newScrollPos;
        }

        return {
            getScrollPos: getScrollPos,
            setScrollPos: setScrollPos,
        }
});


myApp.service("GeoLocation", function (myCache, $http) {

        var lat;
        var long;

        function getLat() {
            return lat;
        }

        function setLat(newLat) {
            lat = newLat;
        }

        function getLong() {
            return long;
        }

        function setLong(newLong) {
            long = newLong;
        }

        return {
            getLat: getLat,
            setLat: setLat,
            getLong: getLong,
            setLong: setLong,
        }
});

myApp.service("GoogleMaps", function ($http) {

        var estadoGoogleMaps;

        function getEstadoGoogleMaps() {
            return estadoGoogleMaps;
        }

        function setEstadoGoogleMaps(newEstadoGoogleMaps) {
            estadoGoogleMaps = newEstadoGoogleMaps;
        }

        function getService(lat, long) {
            return $http({
            "method": "get",
            "url": 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&result_type=administrative_area_level_1&key=AIzaSyA9RYw22yX7oYezsESEWnmcAIZ5Jvq2Q7A'
            });
        }

        return {

            getEstadoGoogleMaps: getEstadoGoogleMaps,
            setEstadoGoogleMaps: setEstadoGoogleMaps,
            getService: getService,
        }
});

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };


myApp.run(function($rootScope, myCache, ngMeta, $cordovaDevice, $cordovaGeolocation, GeoLocation, GoogleMaps) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady () {

        //Capture Mobile UUID
        var uuid = $cordovaDevice.getUUID();
        if (angular.isUndefined(uuid) || uuid == null) {
            uuid = 'b07b42e74b01efed'
        };
        myCache.put('uuid', uuid);

        //GeoLocation
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        

        $cordovaGeolocation
            .getCurrentPosition(posOptions)
                .then(function (position) {
                    GeoLocation.setLat(position.coords.latitude);
                    GeoLocation.setLong(position.coords.longitude);

                    GoogleMaps.getService(GeoLocation.getLat(), GeoLocation.getLong()).then(function(result) {

                        
                        var geoLocEstado = result.data.results[0].address_components[0].short_name;
                        // alert("Estado preenchido com : " + geoLocEstado);
                        GoogleMaps.setEstadoGoogleMaps(geoLocEstado);
                        // $rootScope.estadoSelecionado =  geoLocEstado;


                    });


                }, function(err) {
                // error
        });
    }


    ngMeta.init();

    console.log(myCache.get('uuid'));
});