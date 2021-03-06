import {Module, Mutation, Action, VuexModule, config} from 'vuex-module-decorators'
import {$axios} from "../plugins/nuxt-axios-exporter";
import {Area, AreaTransfer, Item, ItemTransfer, ItemInstance, ItemInstanceTransfer} from "../../core/Entity";

config.rawError = true;

interface Transfer {
    areas: AreaTransfer[];
    items: ItemTransfer[];
    instances: ItemInstanceTransfer[];
}

@Module({namespaced: true, name: 'area'})
export default class AreaModule extends VuexModule {
    areas: Area[] = [];
    items: Item[] = [];

    @Mutation
    _replaceAreas(areas:Area[]) {
        this.areas = areas;
    }

    @Mutation
    _replaceItems(items:Item[]) {
        this.items = items;
    }

    @Mutation
    _addInstance(payload: {item: Item, area: Area}) {
        new ItemInstance(420, 69, payload.area, payload.item);
    }

    @Action
    async initialize() {
        if (this.areas.length === 0) {
            const xf: Transfer = await $axios.$get('http://pantr.io/vue/areas');

            const areas = xf.areas.map(areaxf => Area.hydrate(areaxf));
            const items = xf.items.map(itemxf => Item.hydrate(itemxf));
            xf.instances.forEach(instxf => {
                const area = areas.find(a => a.id === instxf.storage_area_id);
                const item = items.find(i => i.id === instxf.item_id);

                if (area == null || item == null) {
                    throw `Bad index in instanc #${instxf.id}`;
                }

                ItemInstance.hydrate(instxf, area, item);
            });

            this._replaceAreas(areas);
            this._replaceItems(items);
        }
    }

    @Action
    async addInstance(payload: {item: Item, area: Area}) {
        this._addInstance(payload);
    }
}
