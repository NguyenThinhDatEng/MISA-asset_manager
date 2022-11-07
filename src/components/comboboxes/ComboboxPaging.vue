<template>
  <div class="combobox" :title="title" @click="isShow = !isShow">
    <input
      type="number"
      class="combobox__input input"
      :value="value"
      readonly
    />
    <div class="combobox__button">
      <div class="icon center icon--down"></div>
    </div>
    <div class="combobox__data combobox__data--up" v-show="isShow">
      <div
        v-for="obj in data"
        :key="obj.val"
        :class="['data', { 'data--selected': obj.isActive }]"
        @click="value = obj.val"
      >
        {{ obj.val }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComboboxPaging",
  watch: {
    value: function () {
      for (let obj of this.data) {
        if (obj.val == this.value) obj.isActive = true;
        else obj.isActive = false;
      }
    },
  },
  props: {
    title: String,
  },
  emits: [],
  methods: {},
  data() {
    return {
      isShow: false,
      data: [
        { val: 20, isActive: true },
        { val: 25, isActive: false },
        { val: 50, isActive: false },
        { val: 100, isActive: false },
      ],
      value: 20,
    };
  },
};
</script>

<style scoped>
.combobox {
  cursor: pointer;
}

.combobox .input {
  cursor: pointer;
}
</style>