<template>
    <v-card>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel v-for="(area,i) in areas" :key="i">
                    <v-expansion-panel-header>
                        <h2>{{area.name}}</h2>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card v-for="(inst,j) in area.instances" :key="j">
                            <v-card-text>
                                <v-row no-gutters align="center">
                                    <v-col :cols="9"><h3>{{inst.item.name}}</h3></v-col>
                                    <v-col :cols="3">
                                        <v-text-field label="QTY" :value="inst.quantity"
                                                      @input="quantityChanged(inst, $event)"
                                                      dense hide-details outlined>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <div class="text-right">
                            <v-btn class="my-4" color="blue" @click.stop="activateAddItemDialog(area)" fab small>
                                <v-icon color="white" large>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <div class="text-center my-4">
                <v-dialog v-model="addAreaDialog.isActive" width="500">
                    <template v-slot:activator="{on, attrs}">
                        <v-btn color="pink" v-bind="attrs" v-on="on" fab>
                            <v-icon color="white" x-large>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">
                            New Storage Area
                        </v-card-title>

                        <v-card-text>
                            <v-text-field v-model="addAreaDialog.name" label="Area Name" autofocus></v-text-field>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="secondary lighten-1" @click="resetAddAreaDialog" text>Cancel</v-btn>
                            <v-btn color="primary" @click="addAreaDialogExecute" text>Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

            <v-expansion-panels>
                <v-expansion-panel v-for="(item,i) in items" :key="i">
                    <v-expansion-panel-header>
                        <h2>{{item.name}}</h2>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card v-for="(inst,j) in item.instances" :key="j">
                            <v-card-text>
                                <v-row no-gutters align="center">
                                    <v-col :cols="9"><h3>{{inst.area.name}}</h3></v-col>
                                    <v-col :cols="3">
                                        <v-text-field label="QTY" :value="inst.quantity"
                                                      @input="quantityChanged(inst, $event)"
                                                      dense hide-details outlined>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-card>
                            <v-card-text>
                                <v-row no-gutters align="center">
                                    <v-col :cols="9"><h2>TOTAL</h2></v-col>
                                    <v-col :cols="3"><h3 class="green--text">{{item.instances.reduce((c, inst) => c + inst.quantity, 0)}}</h3></v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <v-dialog v-model="addItemDialog.isActive" width="500">
                <v-card>
                    <v-card-title class="headline">
                        Add Item to {{addItemDialog.area == null ? '???' : addItemDialog.area.name}}
                    </v-card-title>

                    <v-card-text>
                        <v-text-field v-model="addItemDialog.name" label="Item Name" autofocus></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="secondary lighten-1" @click="resetAddItemDialog" text>Cancel</v-btn>
                        <v-btn color="primary" @click="addItemDialogExecute" text>Add</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {getModule} from 'vuex-module-decorators'
import PantrioModule from "../store/pantrio";
import {Area} from "../core/Entities";
import {Killswitch, sleep} from "../core/Sleep";

@Component
export default class IndexClass extends Vue {
    pantrioModule: PantrioModule = null!;
    readonly addAreaDialogDefaults = {
        isActive: false,
        name: '',
    };
    addAreaDialog = Object.assign({}, this.addAreaDialogDefaults);
    readonly addItemDialogDefaults = {
        isActive: false,
        area: <Area|null>null,
        name: '',
    };
    addItemDialog = Object.assign({}, this.addItemDialogDefaults);

    async created() {
        this.pantrioModule = getModule(PantrioModule, this.$store);
        await this.pantrioModule.initialize();
    }

    quantityChangeKillswitch = new Killswitch();
    async quantityChanged(instance, qty) {
        this.quantityChangeKillswitch.kill();
        const quantity = parseInt(qty);
        if (isNaN(quantity)) {
            return;
        }
        await sleep(800, this.quantityChangeKillswitch);
        await this.pantrioModule.setInstanceQuantity({instance, quantity});
    }

    async addAreaDialogExecute() {
        try {
            await this.pantrioModule.addArea(this.addAreaDialog.name);
        } catch(e) {
            console.error(e);
        }
        this.resetAddAreaDialog();
    }

    resetAddAreaDialog(): void {
        this.addAreaDialog = Object.assign({}, this.addAreaDialogDefaults);
    }

    activateAddItemDialog(area: Area): void {
        this.addItemDialog.area = area;
        this.addItemDialog.isActive = true;
    }

    async addItemDialogExecute() {
        try {
            await this.pantrioModule.addItemInstanceToArea({
                itemName: this.addItemDialog.name,
                area: this.addItemDialog.area!,
                quantity: 1
            });
        } catch(e) {
            console.error(e);
        }
        this.resetAddItemDialog();
    }

    resetAddItemDialog(): void {
        Object.assign(this.addItemDialog, this.addItemDialogDefaults);
    }

    get areas() {
        return this.pantrioModule.areas;
    }

    get items() {
        return this.pantrioModule.items;
    }
}
</script>
