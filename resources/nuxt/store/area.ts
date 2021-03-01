import {Module, Mutation, Action, VuexModule} from 'vuex-module-decorators'
import {$axios} from "../plugins/nuxt-axios-exporter";
import {Area, AreaTransfer, Item, ItemTransfer, ItemInstance, ItemInstanceTransfer} from "../../core/Entity";

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
    replaceAreas(areas:Area[]) {
        this.areas = areas;
    }

    @Mutation
    replaceItems(items:Item[]) {
        this.items = items;
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

            this.replaceAreas(areas);
            this.replaceItems(items);
        }
    }
}
