<template>
    <v-card>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel v-for="(section,i) in sections" :key="i">
                    <v-expansion-panel-header>
                        {{section.name}}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card v-for="(item,j) in section.items" :key="j">
                            <v-card-text>
                                <v-row no-gutters>
                                    <v-col :cols="9"><h2>{{item.name}}</h2></v-col>
                                    <v-col :cols="3"><v-text-field label="QTY" :value="item.qty" outlined></v-text-field></v-col>
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

@Component
export default class IndexClass extends Vue {
    sections = [
        {
            name: 'Freezer',
            items: [
                {name: 'Pizza', qty: 69},
                {name: 'Pasta', qty: 420},
                {name: 'Human Head of Lettuce', qty: 1},
                {name: 'Doritos', qty: 33},
            ],
        },
        {
            name: 'Pantry',
            items: [
                {name: 'Panties', qty: 3},
            ],
        },
        {
            name: 'Fridge',
            items: [],
        }
    ];
}
</script>
