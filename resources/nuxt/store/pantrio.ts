import {Module, Mutation, Action, VuexModule, config} from "vuex-module-decorators"
import {Area, AreaTransfer, Item, ItemTransfer, ItemInstance, ItemInstanceTransfer} from "../core/Entities"
import {$axios} from "../plugins/nuxt-axios-exporter"

config.rawError = true;

interface ApiData {
    areas: AreaTransfer[];
    items: ItemTransfer[];
    instances: ItemInstanceTransfer[];
}

@Module({namespaced: true, name: 'pantrio', stateFactory: true})
export default class PantrioModule extends VuexModule {
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

    @Mutation
    _setInstanceQuantity(payload: {quantity: number, instance: ItemInstance}) {
        payload.instance.quantity = payload.quantity;
    }

    @Mutation
    _addArea(area: Area) {
        this.areas.push(area);
    }

    @Mutation
    _addItemToArea(payload: {itemName: string, targetArea: Area}) {
        if (payload.itemName === '') {
            throw `Empty item name given, aborting _addItemToArea!`;
        }
        let item = this.items.find(i => i.name === payload.itemName);
        if (item == null) {
            item = new Item(42069, payload.itemName);
            this.items.push(item);
        }
        new ItemInstance(1337, 1, payload.targetArea, item);
    }

    @Action
    async initialize() {
        if (!this.isInitialized) {
            const data: ApiData = await $axios.$get('initial-state');

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

    @Action
    async addArea(name: string) {
        if (name === '') {
            throw `Empty area name given, aborting _addArea!`;
        }
        if (this.areas.find(a => a.name === name) != null) {
            throw `Area named [${name}] already exists, aborting addArea!`;
        }
        const data = await $axios.$post('areas', {area_name: name});
        const area = Area.hydrate(data.area as AreaTransfer)
        this._addArea(area);
        return area;
    }
}




