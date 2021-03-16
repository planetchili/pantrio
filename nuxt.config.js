export default {
    ssr: false,
    srcDir: 'resources/nuxt/',

    head: {
        title: 'pantr.io Comestibles Management Solution',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'For people with a lot of fridges and shit'}
        ],
    },

    css: [],

    plugins: [
        'plugins/nuxt-axios-exporter.ts',
    ],

    components: true,

    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify',
    ],

    modules: [
        '@nuxtjs/axios',
    ],

    axios: {
        'baseURL': 'http://pantr.io/vue/',
        'progress': false,
    },

    build: {
        publicPath: process.env.NODE_ENV === 'production' ? 'assets/' : null,
        extractCSS: true,
    },

    generate: {
        dir: 'nuxt-public',
    },

    server: {
        port: 3000, // default: 3000
        host: '192.168.33.77' // default: localhost
    },

    watchers: {
        webpack: {
            aggregateTimeout: 300,
            poll: 500,
        },
    },
}
