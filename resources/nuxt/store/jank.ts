import {Module, Mutation, Action, VuexModule} from 'vuex-module-decorators'
import {$axios} from "../plugins/nuxt-axios-exporter";

@Module({namespaced: true, name: 'jank'})
export default class JankModule extends VuexModule {
    variable = 'butts';

    @Mutation
    set(v:string) {
        this.variable = v;
    }

    @Action
    async goPeePee() {
        const sections = await $axios.$get("http://pantr.io/api/test");
        this.set(`pee-pee-poo:${sections[0].name}`);
    }

}
