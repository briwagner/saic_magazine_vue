const jsonRaw = [
  {
    "name": "Elisa Tenny",
    "title": "President",
    "text": "This is important stuff",
    "imageFile": "/images/tenny.jpg",
    "source": "Important photo"
  },
  {
    "name": "Another person",
    "title": "Not the president",
    "text": "This is important stuff",
    "imageFile": "/images/ashley.jpg",
    "source": "Important photo"
  },
  {
    "name": "A large group",
    "title": "All sorts of people",
    "text": "This is important stuff",
    "imageFile": "/images/group.jpg",
    "source": "Important photo"
  }
];

const ImageGrid = {
  name: 'image-grid',
  props: ['gridItems'],
  data() {
    return {
      featuredItem: false
    }
  },
  methods: {
    makeFeatured(index) {
      this.featuredItem = this.gridItems[index];
    }
  },
  mounted: function() {
    if (this.gridItems.length > 0) {
      this.makeFeatured(0)
    }
  },
  template: `
  <div class="grid-container">
    <div class="image-grid">
      <div v-for="(item, index) in gridItems"
           v-on:click="makeFeatured(index)"
           class="grid-item"
           v-bind:style="{backgroundImage: 'url(' + item.imageFile + ')' }">
        <p class="img-source">{{ item.source }}</p>
      </div>
    </div>
    <div class="grid-featured" v-show="featuredItem">
      <p>{{ featuredItem.name }}</p>
      <p>{{ featuredItem.title }}</p>
      <p>{{ featuredItem.questions }}</p>
    </div>
  </div>
  `
};

// 80-20 item ... allow for reversed?
const LandscapeRow = {
  name: 'landscape-row',
  props: ['item'],
  template:`
  <div class="landscape-row">
    <div class="row-img">
      <img v-bind:src="item.imageFile" />
    </div>
    <div class="row-text">
      <h4>{{item.name}}</h4>
      <p><strong>{{item.title}}</strong></p>
      <p>{{item.questions}}</p>
    </div>
  </div>
  `
}

// 50-50 item
const HalfHalfRow = {
  name: 'half-half-row',
  props: ['item', 'position'],
  data() {
    return {
      position: 'left'
    }
  },
  template: `
  <div class="half-row">
    <div v-if="position != 'right'"
         class="row-img">
      <img v-bind:src="item.imageFile" />
    </div>
    <div class="row-text">
      <h4>{{item.name}}</h4>
      <p><strong>{{item.title}}</strong></p>
      <p>{{item.questions}}</p>
    </div>
    <div v-if="position == 'right'"
         class="row-img">
      <img v-bind:src="item.imageFile" />
    </div>
  </div>
  `
}

// Portrait height row
const PortraitRow = {
  name: 'portrait-row',
  props: ['item'],
  template: `
  <div class="portrait-row">
    <div class="row-img">
      <img v-bind:src="item.imageFile" />
    </div>
    <div class="row-text">
      <h4>{{item.name}}</h4>
      <p><strong>{{item.title}}</strong></p>
      <p>{{item.questions}}</p>
    </div>
  </div>
  `
}

const App = {
  name: 'app',
  data() {
    return {
      title: 'SAIC Magazine'
    }
  },
  components: {
    ImageGrid,
    LandscapeRow,
    HalfHalfRow,
    PortraitRow
  },
  template: `
  <div>
    <portrait-row :item="jsonRaw[0]" />
    <landscape-row :item="jsonRaw[2]" />
    <image-grid :gridItems="jsonRaw" />
    <half-half-row :item="jsonRaw[1]" :position="'right'"/>
  </div>`
}

new Vue({
  el: '#mag-app',
  components: {App},
  template: '<app />'
})