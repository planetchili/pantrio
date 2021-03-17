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
    _addItem(item: Item) {
        this.items.push(item);
    }

    @Mutation
    _transferInstance(xf: ItemInstanceTransfer) {
        const area = this.areas.find(a => a.id === xf.storage_area_id);
        const item = this.items.find(i => i.id === xf.item_id);
        if (area == null || item == null) {
            throw `Bad index in transfer, item instance #${xf.id}`;
        }
        ItemInstance.hydrate(xf, area, item);
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
            throw `Empty area name given, aborting addArea!`;
        }
        if (this.areas.find(a => a.name === name) != null) {
            throw `Area named [${name}] already exists, aborting addArea!`;
        }
        const data = await $axios.$post('areas', {area_name: name});
        const area = Area.hydrate(data.area as AreaTransfer)
        this._addArea(area);
        return area;
    }

    @Action
    async addItem(name: string) {
        if (name === '') {
            throw `Empty item name given, aborting addItem!`;
        }
        if (this.items.find(i => i.name === name) != null) {
            throw `Item named [${name}] already exists, aborting addItem!`;
        }
        const data = await $axios.$post('items', {item_name: name});
        const item = Item.hydrate(data.item as ItemTransfer)
        this._addItem(item);
        return item;
    }

    @Action
    async addItemInstanceToArea(payload: {itemName: string, area: Area, quantity: number}) {
        if (payload.itemName === '') {
            throw 'Tried to add instance of item with empty name to area';
        }
        if (payload.area.instances.find(i => i.item.name === payload.itemName) != null) {
            throw `Item named [${payload.itemName}] already exists in area [${payload.area.name}], aborting addItemToArea!`;
        }
        let item = this.items.find(i => i.name === payload.itemName);
        if (item == null) {
            item = await this.addItem(payload.itemName);
        }
        const data = await $axios.$post('instances', {
            item_id: item.id,
            storage_area_id: payload.area.id,
            quantity: payload.quantity,
        });
        this._transferInstance(data.instance as ItemInstanceTransfer);
    }
}




