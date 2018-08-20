Vue.component('mag-image-grid', {
  props: ['name'],
  template: '<p>{{ name }}</p>'
})

new Vue({
  el: '#mag-app',

})