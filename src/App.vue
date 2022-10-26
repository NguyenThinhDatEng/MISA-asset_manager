<template>
  <div>
    <TestVue label="Phone number"></TestVue>
    <TestVue label="Password"></TestVue>
  </div>
  <div>
    <TestVue :label="newLabel"></TestVue>
  </div>
  <ButtonVue title="Change lable" @click="onChangeLabel"></ButtonVue>
  <div>
    <input id="number" label="Number" v-bind:value="number" class="input">
    <ButtonVue title="Change number" @click="onChangeNumber"></ButtonVue>
  </div>
  <!-- create new component -> start a new life circle -->
  <div v-if="fullName.length == 0">Not have data</div>
  <div v-else>
    <input type="text" v-model="fullName" class="input">
    <div><b>{{fullName}}</b></div>
  </div>
  <!-- only show and hide -> don't init new element or start new life circle -->
  <div v-show="fullName.length == 0">Showing...</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TestVue from './components/Test.vue';
import ButtonVue from './components/Button.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    TestVue,
    ButtonVue
  },
  methods: {
    onChangeLabel() {
      this.newLabel = Math.random(0, 10)
    },
    onChangeNumber() {
      this.number = Math.random(0, 100) * 100;
    },
    loadData() {}
  },

  data() {
    return {
      newLabel: "label",
      number: "",
      fullName: "Nguyen Van Thinh",
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

div {
  display: flex;
  flex-direction: column;
}

.input {
  max-width: 300px;
}

b {
  background-color: bisque;
}

</style>
