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

            <v-expansion-panels class="mt-4">
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
import AreaModule from "../store/areas";

@Component
export default class IndexClass extends Vue {
    areaModule: AreaModule = null!;

    async created()
    {
        this.areaModule = getModule(AreaModule, this.$store);
        await this.areaModule.initialize();
    }

    get areas() {
        return this.areaModule.areas;
    }

    get items() {
        return this.areaModule.items;
    }
}
</script>
