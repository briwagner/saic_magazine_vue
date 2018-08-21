rawData.map((x) => x.filename = 'images/' + x.filename)

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
    },
    isActive(item) {
      if (item == this.featuredItem) {
        return true;
      } else {
        return false;
      }
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
           v-bind:class="{active: isActive(item)}"
           v-bind:style="{backgroundImage: 'url(' + item.filename + ')' }">
        <p class="img-source">{{ item.source }}</p>
      </div>
    </div>
    <div class="grid-featured" v-show="featuredItem">
      <div class="featured-title">
        <h4>{{ featuredItem.name }}</h4>
        <p>{{ featuredItem.title }}</p>
        <p class="image-source" v-if="featuredItem.source">Source: {{featuredItem.source}}</p>
      </div>
      <div v-html="featuredItem.text" class="featured-text"> </div>
    </div>
  </div>
  `
};

// 80-20 item
const LandscapeRow = {
  name: 'landscape-row',
  props: ['item'],
  template:`
  <div class="landscape-row">
    <div class="row-img">
      <img v-bind:src="item.filename" />
    </div>
    <div class="row-text">
      <h4>{{item.name}}</h4>
      <p><strong>{{item.title}}</strong></p>
      <div v-html="item.text"> </div>
      <p class="quote-block">{{item.quote}}</p>
      <p class="image-source" v-if="item.source">Source: {{item.source}}</p>
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
      <img v-bind:src="item.filename" />
    </div>
    <div class="row-text">
      <h4>{{item.name}}</h4>
      <p><strong>{{item.title}}</strong></p>
      <div v-html="item.text"> </div>
      <p class="image-source" v-if="item.source">Source: {{item.source}}</p>
    </div>
    <div v-if="position == 'right'"
         class="row-img">
      <img v-bind:src="item.filename" />
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
      <img v-bind:src="item.filename" />
    </div>
    <div class="row-text">
      <h4>{{item.name}}</h4>
      <p><strong>{{item.title}}</strong></p>
      <div v-html="item.text"> </div>
      <p class="image-source" v-if="item.source">Source: {{item.source}}</p>
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
  computed: {
    firstGrid: function() {
      let gridItems = rawData.slice(2, 6);
      return gridItems;
    }
  },
  template: `
  <div>
    <portrait-row :item="rawData[0]" />
    <landscape-row :item="rawData[1]" />
    <image-grid :gridItems="firstGrid" />
    <half-half-row :item="rawData[2]" :position="'right'"/>
    <half-half-row :item="rawData[3]"/>
  </div>`
}

new Vue({
  el: '#mag-app',
  components: {App},
  template: '<app />'
})