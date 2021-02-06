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
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css'
            }
        ],
    },

    css: [],

    plugins: [],

    components: true,

    buildModules: [],

    modules: [],

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
