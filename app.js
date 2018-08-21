// const jsonRaw = [
//   {
//     "name": "Elissa Tenny",
//     "title": "President",
//     "intro": "<p>Elissa Tenny is the 15th executive and first woman to lead SAIC in its more than 150-year history. She is a career-long champion of art and design education and the liberal arts as well as an advocate of interdisciplinary practice, diversity in higher learning, and the role higher education plays in society and the world at large.</p>",
//     "text": "<p><strong>What have the artists and designers at SAIC taught you?</strong></p><p>You learn more when exploring and iterating a problem (or painting or paper) than in rushing toward a solution.</p><p><strong>Something only artists can do?</strong></p><p>Artists are not separate from society. Rather, the artist is a citizen with the same obligation as every other citizen: to use their expertise to participate in the world. What is unique about the role of the artist and designer is that their expertise has to do with vision, meaning both what we look at aesthetically and the meaning that artists reveal. The visionary creativity of artists—to be able to see something before it is there— is essential to how humanity solves its problems.</p><p><strong>SAIC’s most significant contribution to Chicago?</strong></p><p>Our students and alums. They live here, many long after graduation, making and exhibiting art, adding to our experience—both in contemplation and in play— of this great city. Our students and alums keep Chicago a dynamic, engaged center for art and design.</p>",
//     "filename": "tenny.jpg",
//     "quote": "Our campaign is a direct result of the entire SAIC family coming together."
//   },
//   {
//     "name": "Mark Jeffery",
//     "title": "Associate Professor, Auction Artist",
//     "text": "<p><strong>What does faculty support mean to you?</strong></p><p>The campaign dollars will allow faculty to develop our work and to showcase it locally, nationally, and internationally.</p>    <p><strong>Best thing about SAIC?</strong></p>    <p>It keeps me relevant and always with questions that sometimes don’t have answers.</p>    <p><strong>Dream collaborator?</strong></p>    <p>Madonna. She looks at what is happening right now, moves the culture forward, and as a feminist, gives artists permission to grow and take risks.</p>",
//     "filename": "jeffery.jpg",
//     "source": "thing to see"
//   },
//   {
//     "name": "Aram Han Sifuentes (MFA 2013)",
//     "title": "Auction Artist",
//     "text": "Describe your art practice.\r\nAt the core of my practice, I create socially engaged and materially rich projects that aim to create an art world that is available and accessible for those who are disenfranchised, particularly for dispossessed immigrants of color.",
//     "filename": "sifuentes.jpg",
//     "quote": "Sewing is my medium to investigate identity politics, immigration and immigrant labor, possession and dispossession, citizenship and belonging, dissent and protest, and race politics in the United States."
//   }
// ];

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
           v-bind:style="{backgroundImage: 'url(' + item.filename + ')' }">
        <p class="img-source">{{ item.source }}</p>
      </div>
    </div>
    <div class="grid-featured" v-show="featuredItem">
      <p>{{ featuredItem.name }}</p>
      <p>{{ featuredItem.title }}</p>
      <div v-html="featuredItem.text"> </div>
      <p class="image-source" v-if="featuredItem.source">Source: {{featuredItem.source}}</p>
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