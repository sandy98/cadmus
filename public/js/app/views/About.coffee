dependencies = [
  'Ractive'
  'rv!app/templates/about'
]

define dependencies, (Ractive, template) ->
  AboutView = Ractive.extend
    template: template
