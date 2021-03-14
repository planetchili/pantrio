import {Module, Mutation, Action, VuexModule, config} from "vuex-module-decorators"
import {Area, AreaTransfer, Item, ItemTransfer, ItemInstance, ItemInstanceTransfer} from "../core/Entities"
import {$axios} from "../plugins/nuxt-axios-exporter"

config.rawError = true;

interface ApiData {
    areas: AreaTransfer[];
    items: ItemTransfer[];
    instances: ItemInstanceTransfer[];
}

@Module({namespaced: true, name: 'areas'})
export default class AreaModule extends VuexModule {
    isInitialized: boolean = false;
    areas: Area[] = [];
    items: Item[] = [];

    @Mutation
    _replaceAreas(areas: Area[]) {
        this.areas = areas;
    }

    @Mutation
    _replaceItems(items:Item[]) {
        this.items = items;
    }

    @Mutation
    _setInitialized() {
        this.isInitialized = true;
    }

    @Mutation
    _setItemName(payload: {item: Item, name: string}) {
        payload.item.name = payload.name;
    }

    @Action
    async initialize() {
        if (!this.isInitialized) {
            const data: ApiData = await $axios.$get('http://pantr.io/vue/areas');

            const areas = data.areas.map(areaxf => Area.hydrate(areaxf));
            const items = data.items.map(itemxf => Item.hydrate(itemxf));
            data.instances.forEach(instxf => {
                const area = areas.find(a => a.id === instxf.storage_area_id);
                const item = items.find(i => i.id === instxf.item_id);

                if (area == null || item == null) {
                    throw `Bad index in item instance #${instxf.id}`;
                }

                ItemInstance.hydrate(instxf, area, item);
            });

            this._replaceAreas(areas);
            this._replaceItems(items);

            this._setInitialized();
        }
    }
}




