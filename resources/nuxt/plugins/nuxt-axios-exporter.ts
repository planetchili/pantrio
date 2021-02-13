import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from "@nuxtjs/axios";

let $axios: NuxtAxiosInstance;

const nuxtAxiosExtractorPlugin: Plugin = (context) => {
    $axios = context.$axios;
}

export {$axios}
export default nuxtAxiosExtractorPlugin;
