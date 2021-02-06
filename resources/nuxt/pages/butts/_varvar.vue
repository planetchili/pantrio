<template>
    <section class="m-4">
        <h1 class="title">HELLO FREAK BIATCHES! {{$route.params.varvar}}</h1>
        <NuxtLink to="/">Home page</NuxtLink>
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
