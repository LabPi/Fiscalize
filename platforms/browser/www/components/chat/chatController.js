myApp.controller('ChatController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory,$cordovaDevice, myCache, Fiscalizados, Convenios)  {

		$scope.messages = [{
                id: '535d625f898df4e80e2a125e',
<<<<<<< HEAD
                text: 'Fotzu isoko vo adget ne uba in lup jedzow mi uvinifse epepo het ezezocic bahehufep lid pubuj.',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110273886'
            }, {
                id: '535f13ffee3b2a68112b9fc0',
                text: 'Hu girucajam ifuolocag za nifjem ninze dak kadi wi zowolhim asa vouczu ci.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455110273886'
            }, {
                id: '546a5843fd4c5d581efa263a',
                text: 'Vad vo ujcofwag pelobhuz wonogmo cikutew imoissuv no doso jum govhi peva aj ven narzir gac rofbufubo il.',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110173886'
            }, {
                id: '54764399ab43d1d4113abfd1',
                text: 'Meug viedeloh cuwmaheba gunhe din mif kub ec limvimil boik fuj peze za sow.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455110283886'
            }, {git
                id: '547643aeab43d1d4113abfd2',
                text: 'Leeczo gokurus cif wepke nidji dabuti wi itco aduzab anru cev do surakip.',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110483886'
            }, {
                id: '547815dbab43d1d4113abfef',
                text: 'Piazwac cah opovi cipril sonetpa da bobren teekiril fac ma attu wone piuba de ojeseki.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455110583886'
            }, {
                id: '547815dbaqsnod67892d4113abfef',
                text: 'Dubehtak re bodeju em parobji leunvil fetpok iwipog gibzi teb navibahul girofip hikfib ge.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455112283886'
=======
                text: 'Quem é o responsável por esse convênio?',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110273886'
>>>>>>> e0c02db7e701869a4e7c068aa5ae70fd0a6b2861
            }];


        $scope.you = {
<<<<<<< HEAD
            userId: '4562KDJYE72930DST283DFY202Dd',
            avatar: 'http://www.orangecountyjailministryorlando.com/wp-content/uploads/2015/01/Woman_Avatar.gif',
            userName: 'Anna'
=======
            userId: myCache.get('uuid'),
            avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif'
        };

        $scope.sendMessage = function(message) {
            console.log('sendMessage');
>>>>>>> e0c02db7e701869a4e7c068aa5ae70fd0a6b2861
        };

});
