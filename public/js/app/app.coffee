define ['jquery', 'director', 'Ractive'], (jQuery, Router, Ractive) ->
  routes = 
    '/': () -> alert 'Home'
    '/contact': () -> alert 'Contact'
    '/about': () -> alert 'About'
    
  class App
    version: "0.0.1"
    constructor:  ->
      @$ = jQuery
      console.log "App version: #{@version}"
      console.log "jQuery version: #{@$.fn.jquery}"
      console.log "Ractive version: #{Ractive.VERSION}"
      	
      @footerView = new Ractive
        el: 'footer'
        template: '<p style="color: navy; text-align: right;">© {{ author }} - {{ year }}</p>'
        data: {author: "Domingo E. Savoretti", year: 2013}

      @router = Router(routes)
      @router.init()
       