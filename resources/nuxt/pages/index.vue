<template>
    <v-card>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel v-for="(section,i) in sections" :key="i">
                    <v-expansion-panel-header>
                        <h2>{{section.name}}</h2>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card v-for="(item,j) in section.items" :key="j">
                            <v-card-text>
                                <v-row no-gutters align="center">
                                    <v-col :cols="9"><h3>{{item.name}}</h3></v-col>
                                    <v-col :cols="3"><v-text-field label="QTY" :value="item.qty" dense hide-details outlined></v-text-field></v-col>
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
    sections = [];

    async created()
    {
        this.sections = await this.$axios.$get("http://pantr.io/api/test");
    }
}
</script>
