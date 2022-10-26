<template>
    <div>
        <label>
            {{label}}: <input type="text">
        </label>
    </div>
</template>

<script>
export default {
    name:"TestVue", // > 1 word, mark by capital letter
    components: {}, // components will be used
    // attributes of this component, only get value, can not change value
    props: {
        label: String
    },
    emits: [],
    methods: {
        
    },
    data() {
        return {
            gender: "male"
        }
    },
}
</script>
<style scoped>
/* scoped -> only effect this component */
input {
    border: 1px solid aqua;
    margin: 0.5rem 0;
    font-size: 20px;
}
</style>
