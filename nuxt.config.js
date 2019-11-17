
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
    '~/middleware/auth.js',
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
    linkActiveClass: 'nav-active',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 400 }
    }
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
    extend (config, ctx) {
    }
  }
}
