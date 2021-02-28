import {Module, Mutation, Action, VuexModule} from 'vuex-module-decorators'
import {$axios} from "../plugins/nuxt-axios-exporter";

interface Item {
    name: string;
    areas: ItemInstance[];
}

interface ItemInstance {
    item: Item;
    area: Area;
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
        const items:Item[] = [
            {name: 'Buttsoap', areas: []},
            {name: 'Shartorade', areas: []},
        ];
        const areas:Area[] = [
            {name: 'doomchest', items: []},
            {name: 'buttdock', items: []},
        ];
        const instances:ItemInstance[] = [
            {area: areas[0], item: items[0], quantity: 4},
            {area: areas[0], item: items[1], quantity: 3},
            {area: areas[1], item: items[0], quantity: 9},
        ];
        items[0].areas = [instances[0], instances[2]];
        items[1].areas = [instances[1]];
        areas[0].items = [instances[0], instances[1]];
        areas[1].items = [instances[2]];
        this.replaceItems(items);
        this.replaceAreas(areas);
    }
}
