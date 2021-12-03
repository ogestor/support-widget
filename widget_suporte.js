$(function() {
    'use strict';

    var $body = $('body');

    if($body.find('#iframe-support').length) return;
    var etoken = null, utoken = null;
    if(typeof document.querySelector('meta[name=etoken]').content === typeof undefined || typeof document.querySelector('meta[name=utoken]').content === typeof undefined) {
        console.log('Não foi possível ativar o widget de suporte pois o requerimento das meta tags não foi satisfeito.');
        return;
    } else {
        etoken = document.querySelector('meta[name=etoken]').content;
        utoken = document.querySelector('meta[name=utoken]').content;
    }
    
    var imageSize = '220px', welcomeSize = '1rem', titleSize = '1.5rem', textSize = '14px', buttonSize = '1rem';
    var domain = location.host.split('.')[0];
    if(['localhost:1910', 'pdv', 'emissor', 'sistema', 'erp'].indexOf(domain) !== -1) {
        imageSize = '200px';
        welcomeSize = '0.9rem';
        titleSize = '1.3rem';
        textSize = '12px';
        buttonSize = '0.9rem';
    }

    $body.ready(function() {
        $body.append(`<div style="position: fixed; left: 1%; bottom: 2%; width: 60px; height: 60px; background-color: #383838; cursor: pointer; border-radius: 50%; z-index: 1010;" id="help-desk-modal"><img src="https://i.imgur.com/PMoGpN8.png" style="width: 35px; height: 35px; margin: 12px;"></div>`)
            .append(`
                <iframe id="iframe-support" style="position: fixed; top: 25%; left: 30%; border-radius:15px; width: 40%; display: none; z-index: 1116;"></iframe>
            `);

        var $iframe = $('#iframe-support');

        $body.on('click', '#help-desk-modal', function() {
            if($iframe.css('display') === 'none') {
                $iframe.show(200);
                $body.append('<div class="support-overlay" style="width: 100%; height: 100%; position: fixed; z-index: 1115; background: rgba(0, 0, 0, 0.5); top: 0; left: 0;"></div>');
                setTimeout(function () {
                    if($iframe.height() < 200) $iframe.css('height', $('body', $iframe[0].contentWindow.document).height() + 20 + 'px');
                }, 220);
            } else {
                $iframe.hide(200);
                $body.find('.support-overlay').remove();
            }
        }).on('click', '.support-overlay', function() {
            $body.find('.support-overlay').remove();
            $iframe.hide(200);
        });
        $('body', document.getElementById('iframe-support').contentWindow.document).on('click', '.close-support', function() {
            $body.find('.support-overlay').remove();
            $iframe.hide(200);
        }).on('click', '.get-support', function() {
            $body.find('.support-overlay').remove();
            $iframe.hide(200);
        });

        $iframe.ready(function() {
            $iframe.contents().find('head').append(`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
                <link rel="dns-prefetch" href="https://fonts.gstatic.com">
                <link rel="dns-prefetch" href="https://fonts.googleapis.com">
                <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600" rel="stylesheet">
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                    }
                </style>
            `);
            $iframe.contents().find('body').append(`
                <div class="p-3">
                    <div class="col-md-12 text-center mb-4">
                        <a href="javascript: void(0);" class="close-support float-right text-dark font-14"><i class="fas fa-times"></i></a>
                        <img src="https://i.imgur.com/dUdbKFe.png" alt="" class="mb-2" style="max-width: ${imageSize};">
                        <p class="text-success" style="font-size: ${welcomeSize}">Bem vindo ao nosso canal de atendimento.</p>
                    </div>
                    <div class="d-flex justify-content-around">
                        <div class="col-md-6 text-center">
                            <h4 class="mb-4" style="font-size: ${titleSize}">Wiki oGestor</h4>
                            <p class="mb-4 text-justify" style="font-size: ${textSize};">O wiki é um espaço onde criamos artigos explicando processos, tirando dúvidas ou ajudando a resolver problemas comuns e recorrentes que podem acontecer no sistema. Basta usar a barra de pesquisa para procurar por informações relacionadas à sua dúvida ou problema. Procuramos sempre atualizar com as dúvidas/problemas mais frequentes.</p>
                            <a href="https://wiki.ogestor.com.br" class="btn btn-primary get-support" target="_blank" style="font-size: ${buttonSize};"><i class="fas fa-external-link"></i>&nbsp; Acesse Agora</a>
                        </div>
                        <div class="col-md-6 text-center">
                            <h4 class="mb-4" style="font-size: ${titleSize}">Fale com um consultor</h4>
                            <p class="mb-4 text-justify" style="font-size: ${textSize};">Se você precisa de uma ajuda mais direta ou não encontrou a sua dúvida no wiki, pode abrir um chamado em nossa central de suporte. Nosso central de suporte está disponível das 08:00 às 18:00 (Horário de Brasília) com técnicos qualificados para ajudar a solucionar as dúvidas/problemas que você possa vir a ter no sistema.</p>
                            <a href="https://clientes.ogestor.com.br/login/empresa/${etoken}/usuario/${utoken}?redirect=aHR0cHM6Ly9jbGllbnRlcy5vZ2VzdG9yLmNvbS5ici9jaGFtYWRvcy9hZGljaW9uYXI=" class="btn btn-primary get-support" target="_blank" style="font-size: ${buttonSize};"><i class="fas fa-external-link"></i>&nbsp; Abrir chamado</a>
                        </div>
                    </div>
                </div>
                
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
            `);
        });
    });

});
