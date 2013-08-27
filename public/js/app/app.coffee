dependencies = [
  'jquery'
  'director'
  'Ractive'
  'cs!app/views/Menu'
  'cs!app/views/Footer'
  'cs!app/views/Home'
  'cs!app/views/About'
]

define dependencies, (jQuery, Router, Ractive, MenuView, FooterView, HomeView, AboutView) ->
    
  class App
    version: "0.0.1"

    noView: (msg) =>
      @mainView = new Ractive
        el: '#container'
        template: "<p style='padding-top: 2em; max-height: 30em; min-height: 30em;'>{{msg}}</p>"
        data: {msg: msg or "WTF?"}

    showCurrent: =>
      if @mainView
        @mainView.teardown()
      switch @currentRoute
        when '/'
          @mainView = new HomeView el: '#container', data: {}
        when '/contact'
          @noView 'Contact view, under construction...'
        when '/about'
          @mainView = new AboutView el: '#container', data: {}
        else
          @noView "Under construction..."
      @menuView.set 'active', @currentRoute

    initRoutes: =>
      @currentRoute = "/"
      @routes = 
        '/': => 
          console.log 'Home'
          @currentRoute = "/"
          @showCurrent()
        '/contact': => 
          console.log 'Contact'
          @currentRoute = "/contact"
          @showCurrent()
        '/about': => 
          console.log 'About'
          @currentRoute = "/about"
          @showCurrent()
      
      @router = new Router(@routes).configure
        notfound: () => 
          console.log "404 - #{location.hash.substring(1)} not found"
          if @currentRoute
            console.log "Redirecting to: #{@currentRoute}"
            location.href = location.href.replace(location.hash, "##{@currentRoute}")
          else
            location.href = "/#/"
      @router.init()

      
    constructor:  ->
      @$ = jQuery
      #console.log "App version: #{@version}"
      #console.log "jQuery version: #{@$.fn.jquery}"
      #console.log "Ractive version: #{Ractive.VERSION}"

      @menuView = new MenuView
        el: '#menu-bar'
        data: {user: null, menuItems: [{href: '/', text: 'Home'}, {href: '/about', text: 'About'}, {href: '/contact', text: 'Contact'}]}
      @menuView.on 'dologin', (evt) =>
        console.log "Logging in..."
        @menuView.set user: {name: $('#txt-email').val(), pwd: $('#txt-pwd').val()}
      @menuView.on 'dologout', (evt) =>
        console.log "Logging out..."
        @menuView.set user: null

      @noView 'App loading...'

      @footerView = new FooterView
        el: 'footer'
        data: {project: {name: 'Cadmus Project', author: "Domingo E. Savoretti", year: 2013}}

      @initRoutes()

      if not @currentRoute
        console.log "No current route, so going home..."
        @currentRoute = "/"
      
      location.href = "/##{@currentRoute}"


    new App()