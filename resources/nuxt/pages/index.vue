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
                                    <v-col :cols="3"><v-text-field label="QTY" :value="inst.quantity" dense hide-details outlined></v-text-field></v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <v-btn class="my-4" @click="foobar">FARKNARDS</v-btn>

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
                                    <v-col :cols="3"><v-text-field label="QTY" :value="inst.quantity" dense hide-details outlined></v-text-field></v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {getModule} from 'vuex-module-decorators'
import AreaModule from "../store/area";

@Component
export default class IndexClass extends Vue {
    areaModule: AreaModule = null!;

    async created() {
        this.areaModule = getModule(AreaModule, this.$store);
        await this.areaModule.initialize();
    }

    foobar() {
        // if (this.areaModule.areas[1].items.length > 3) {
        //     this.areaModule.items[0].name = 'turdquoise';
        //     return;
        // }
        // // this.areaModule!.areas[0].items.splice(0, 1, {}); // replacing an item
        // const inst = {quantity: 420, item: this.areaModule.items[0], area: this.areaModule.areas[1]};
        // this.areaModule.areas[1].items.push(inst);
        // this.areaModule.items[0].areas.push(inst);
    }

    get areas() {
        return this.areaModule.areas;
    }

    get items() {
        return this.areaModule.items;
    }
}
</script>
