import {Module, Mutation, Action, VuexModule} from 'vuex-module-decorators'
import {$axios} from "../plugins/nuxt-axios-exporter";

interface Item {
    name: string;
    quantity: number;
}

interface Area {
    name: string;
    items: Item[];
}

@Module({namespaced: true, name: 'area'})
export default class AreaModule extends VuexModule {
    areas: Area[] = [];

    @Mutation
    replace(areas:Area[]) {
        this.areas = areas;
    }

    @Action({rawError: true})
    async initialize() {
        this.replace(await $axios.$get("http://pantr.io/vue/areas"));
    }
}
