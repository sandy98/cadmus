dependencies = [
  'Ractive'
  'rv!app/templates/home'
]

define dependencies, (Ractive, template) ->
  HomeView = Ractive.extend
    template: template
