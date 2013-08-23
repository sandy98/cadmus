//console.log("main.js");

require.config({
  paths: {
    jquery: 'vendor/jquery.min'
    ,bootstrap: 'vendor/bootstrap.min'
    ,bootbox: 'vendor/bootbox.min'
    ,director: 'vendor/director.min'
    ,Ractive: 'vendor/Ractive.min'
  },
  
  shim: {
    'jquery': {
      exports: '$'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'bootbox': {
      deps: ['jquery', 'bootstrap']
    },
    'director': {
      exports: 'Router'
    }
  }

});

require(['jquery', 'bootstrap', 'bootbox', 'director', 'cs!app/app'], function(jQuery, bootstrap, bootbox, Router, App) {
 
window.app = new App();


});