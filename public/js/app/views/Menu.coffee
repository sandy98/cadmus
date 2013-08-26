dependencies = [
  'jquery'
  'Ractive'
  'rv!app/templates/menu'
]

define dependencies, ($, Ractive, template) ->
  MenuView = Ractive.extend
    template: template


