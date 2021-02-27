import {Module, Mutation, Action, VuexModule} from 'vuex-module-decorators'
import {$axios} from "../plugins/nuxt-axios-exporter";

interface Item {
    name: string;
}

interface ItemInstance {
    item: Item;
    quantity: number;
}

interface Area {
    name: string;
    items: ItemInstance[];
}

@Module({namespaced: true, name: 'area'})
export default class AreaModule extends VuexModule {
    areas: Area[] = [];
    items: Item[] = [];

    @Mutation
    replaceAreas(areas:Area[]) {
        this.areas = areas;
    }

    @Mutation
    replaceItems(items:Item[]) {
        this.items = items;
    }

    @Action
    async initialize() {
        this.replaceItems([
            {name: 'Buttsoap'},
            {name: 'Shartorade'},
        ]);
        this.replaceAreas([
            {name: 'doomchest', items: [{quantity: 4, item: this.items[0]}, {quantity: 9, item: this.items[1]}]},
            {name: 'buttdock', items: [{quantity: 69, item: this.items[0]}]},
        ]);
    }
}
