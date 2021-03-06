export interface ItemTransfer {
    id: number;
    name: string;
}

export class Item {
    public instances: ItemInstance[] = [];
    constructor(public id: number, public name:string) {
    }
    static hydrate(xf: ItemTransfer): Item {
        return new Item(xf.id, xf.name);
    }
    addInstance(instance: ItemInstance) {
        this.instances.push(instance);
    }
    removeInstance(instance:ItemInstance) {
        const index = this.instances.findIndex(inst => inst === instance);
        this.instances.splice(index, 1);
    }
}

export interface AreaTransfer {
    id: number;
    name: string;
}

export class Area {
    public instances: ItemInstance[] = [];
    constructor(public id: number, public name: string) {
    }
    static hydrate(xf:AreaTransfer): Area {
        return new Area(xf.id, xf.name);
    }
    addInstance(instance: ItemInstance) {
        this.instances.push(instance);
    }
    removeInstance(instance:ItemInstance) {
        const index = this.instances.findIndex(inst => inst === instance);
        this.instances.splice(index, 1);
    }
}

export interface ItemInstanceTransfer {
    id: number;
    item_id: number;
    storage_area_id: number;
    quantity: number;
}

export class ItemInstance {
    constructor(
        public id: number,
        public quantity: number,
        public area: Area,
        public item: Item
    ) {
        this.connectEntities();
    }
    static hydrate(xf: ItemInstanceTransfer, area: Area, item: Item): ItemInstance {
        return new ItemInstance(xf.id, xf.quantity, area, item);
    }
    private connectEntities() {
        this.area.addInstance(this);
        this.item.addInstance(this);
    }
}
