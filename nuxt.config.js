
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'AzureSpace-分享前端经验',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'azurespace，Azurespace，个人建站，个人网站，前端，前端自学，自学前端，前端资料，前端心得，前端学习，前端项目，Nuxt.js，前端SEO'},
      { hid: 'description', name: 'description', content: 'AzureSpace个人小站(www.azure33.com)，分享前端经验，自学前端，前端资料，seo，nuxt.js，azurespace，vue.js，node.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/azurespace.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/normalize.css',
    '@/assets/css/mySettting.css',   //引入assets下的reset.css全局标签重置样式
    '@/assets/css/animate.css',  //引入全局的动画样式
    { src: "swiper/dist/css/swiper.css", ssr: false}
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '~/plugins/filters.js',
    {src: "~/plugins/vue-lazyload.js" ,ssr: false},
    {src:'~/plugins/swiper.js', ssr: false},
    {src:'~/plugins/vue2-editor.js', ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  router: {
    middleware: 'auth',
    /* linkExactActiveClass: 'nav-active', */
    linkActiveClass: 'nav-active',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 400 }
    }
  },
  render: {
    resourceHints: false
  },
  proxy: [
    [
      '/api', 
      { 
        target: 'http://localhost:3000', // api主机
      }
   ]
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    /* analyze: true, */
    vendor: ['element-ui'],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    babel: {
      plugins: [
          [
              'component',
              {
                  'libraryName': 'element-ui',
                  'styleLibraryName': 'theme-chalk'
              }
          ]
      ]
    },
    extend (config, ctx) {
    }
  }
}
