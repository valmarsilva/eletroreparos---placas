(function () {
  'use strict';

  function enviarWhatsApp() {
    var nome = document.getElementById('nome').value;
    var telefone = document.getElementById('telefone').value;
    var email = document.getElementById('email').value;
    var cidade = document.getElementById('cidade').value;
    var tipoPlaca = document.getElementById('tipo-placa').value;
    var aparelho = document.getElementById('aparelho').value;
    var marcaModelo = document.getElementById('marca-modelo').value;
    var codigoPlaca = document.getElementById('codigo-placa').value;
    var defeito = document.getElementById('defeito').value;
    var observacoes = document.getElementById('observacoes').value;
    var numeroWhatsApp = '5547992460045';

    if (!nome || !telefone || !tipoPlaca || !aparelho || !defeito) {
      alert('Por favor, preencha os campos obrigatórios antes de enviar pelo WhatsApp.');
      return;
    }

    var mensagem = '\nNova solicitação de orçamento - TecnoReparos PlacasEletro\n\nDADOS DO CLIENTE\n\nNome: ' + nome + '\nTelefone/WhatsApp: ' + telefone + '\nE-mail: ' + email + '\nCidade/Bairro: ' + cidade + '\n\nINFORMAÇÕES DA PLACA\n\nTipo de placa: ' + tipoPlaca + '\nAparelho ou veículo de origem: ' + aparelho + '\nMarca e modelo: ' + marcaModelo + '\nCódigo da placa: ' + codigoPlaca + '\n\nDESCRIÇÃO DO DEFEITO\n\n' + defeito + '\n\nOBSERVAÇÕES\n\n' + observacoes;

    var url = 'https://wa.me/' + numeroWhatsApp + '?text=' + encodeURIComponent(mensagem);
    window.open(url, '_blank');
  }

  function setupQRCodes() {
    var whatsappUrl = 'https://wa.me/5547992460045';
    var currentUrl = window.location.origin + window.location.pathname;
    var qrServer = 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=';

    var whatsappQr = document.getElementById('whatsapp-qr');
    var siteQr = document.getElementById('site-qr');
    var installQr = document.getElementById('install-qr');
    var siteLink = document.getElementById('site-link');
    var whatsappLink = document.getElementById('whatsapp-link');

    if (whatsappQr) {
      whatsappQr.src = qrServer + encodeURIComponent(whatsappUrl);
    }
    if (siteQr) {
      siteQr.src = qrServer + encodeURIComponent(currentUrl);
    }
    if (installQr) {
      installQr.src = qrServer + encodeURIComponent(currentUrl);
    }
    if (siteLink) {
      siteLink.href = currentUrl;
    }
    if (whatsappLink) {
      whatsappLink.href = whatsappUrl;
    }
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(function (err) {
        console.warn('SW registration failed:', err);
      });
    }
  }

  function setupInstallPrompt() {
    var installBtn = document.getElementById('btnInstalar');
    var deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', function (event) {
      event.preventDefault();
      deferredPrompt = event;
      if (installBtn) {
        installBtn.style.display = 'inline-block';
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', async function () {
        if (!deferredPrompt) {
          return;
        }
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        installBtn.style.display = 'none';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var whatsappButton = document.getElementById('btnEnviarWhatsApp');
    if (whatsappButton) {
      whatsappButton.addEventListener('click', enviarWhatsApp);
    }

    setupQRCodes();
    registerServiceWorker();
    setupInstallPrompt();
  });
})();
