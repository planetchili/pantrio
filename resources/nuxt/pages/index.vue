<template>
    <section class="m-4">
        <h1 class="title">HELLO FREAK BIATCHES! {{thing}}</h1>
        <table class="table">
            <thead>
                <th>foo</th>
                <th>bar</th>
            </thead>
            <tbody>
                <tr v-for="data in tdata">
                    <td>{{data.foo}}</td>
                    <td>{{data.bar}}</td>
                </tr>
            </tbody>
        </table>

        <div>
            Total: {{total}}
        </div>

        <div class="field">
            <label class="label">Foo</label>
            <div class="control">
                <input v-model="fooInput" class="input" type="text">
            </div>
        </div>
        <div class="field">
            <label class="label">Bar</label>
            <div class="control">
                <input v-model="barInput" class="input" type="text">
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button type="button" class="button is-link" @click="addRow">Add</button>
            </div>
            <div class="control">
                <button type="button" class="button is-link is-light" @click="removeRow">Remove</button>
            </div>
        </div>

    </section>
</template>

<script>
export default {
    data() {
        return {
            thing: 69,
            fooInput: '',
            barInput: '',
            tdata: [
                {foo: 'hello', bar: 420},
                {foo: 'sexnumber', bar: 69},
                {foo: 'dougnumber', bar: 42},
            ]
        };
    },

    methods: {
        addRow() {
            this.tdata.push({foo: this.fooInput, bar: parseInt(this.barInput)});
        },
        removeRow() {
            this.tdata.pop();
        }
    },

    computed: {
        total() {
            return this.tdata.reduce((carry, obj) => carry + obj.bar, 0);
        },
    },
}
</script>

<style>
</style>
