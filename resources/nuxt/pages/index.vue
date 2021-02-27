<template>
    <v-card>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel v-for="(area,i) in areas" :key="i">
                    <v-expansion-panel-header>
                        <h2>{{area.name}}</h2>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card v-for="(item,j) in area.items" :key="j">
                            <v-card-text>
                                <v-row no-gutters align="center">
                                    <v-col :cols="9"><h3>{{item.item.name}}</h3></v-col>
                                    <v-col :cols="3"><v-text-field label="QTY" :value="item.quantity" dense hide-details outlined></v-text-field></v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-btn class="mt-4" @click="foobar">FARKNARDS</v-btn>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {getModule} from 'vuex-module-decorators'
import AreaModule from "../store/area";

@Component
export default class IndexClass extends Vue {
    areaModule: AreaModule|null = null;

    async created() {
        this.areaModule = getModule(AreaModule, this.$store);
        await this.areaModule.initialize();
    }

    foobar() {
        this.areaModule!.items[0].name = 'turdquoise';
        // this.areaModule!.areas[0].items.splice(0, 1, {});
        this.areaModule!.areas[1].items.push({quantity: 420, item: this.areaModule!.items[0]});
    }

    get areas() {
        if (this.areaModule === null) {
            return [];
        }
        return this.areaModule.areas;
    }
}
</script>
