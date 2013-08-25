dependencies = [
  'Ractive'
  'rv!app/templates/footer'
]

define dependencies, (Ractive, template) ->
  FooterView = Ractive.extend
    template: template
