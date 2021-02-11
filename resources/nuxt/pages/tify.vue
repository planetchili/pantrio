<template>
    <v-app>
        <v-card class="ma-10">
            <v-card-text>
                <v-expansion-panels>
                    <v-expansion-panel
                        v-for="(item,i) in 5"
                        :key="i"
                    >
                        <v-expansion-panel-header>
                            Item
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";

@Component
export default class IndexClass extends Vue {
}
</script>
