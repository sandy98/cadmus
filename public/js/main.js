
require.config({
  paths: {
    'coffee-script': 'coffeescript/coffeescript'
    ,jquery: 'vendor/jquery.min'
    ,bootstrap: 'vendor/bootstrap.min'
    ,bootbox: 'vendor/bootbox.min'
    ,director: 'vendor/director.min'
    ,Ractive: 'vendor/Ractive.min'
    ,cs: 'plugins/cs'
    ,text: 'plugins/text'
    ,rv: 'plugins/rv'
  },
  
  shim: {
    'jquery': {
      exports: '$'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'bootbox': {
      deps: ['bootstrap']
    },
    'director': {
      exports: 'Router'
    }
  }

});

require(['bootstrap', 'bootbox', 'cs!app/app'], function(bootstrap, bootbox, app) {


window.app = app;


});