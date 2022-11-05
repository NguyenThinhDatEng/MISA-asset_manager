<template>
  <div class="combobox combobox--detail">
    <input
      type="text"
      class="input combobox__input"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @click="isShow = !isShow"
    />
    <div class="combobox__button" @click="isShow = !isShow">
      <div class="icon center icon--down"></div>
    </div>
    <div class="combobox__data" v-show="isShow">
      <div class="first-data">
        <div class="data">
          <div class="text__wrapper">
            <p>{{ resource.ComboboxInfo.firstCol }}</p>
          </div>
          <p>{{ resource.PopupLabel[field + "_name"] }}</p>
        </div>
      </div>
      <div class="data" v-for="obj in data" :key="obj[field + '_id']">
        <div class="text__wrapper">
          <p>{{ obj[field + "_code"] }}</p>
        </div>
        <p>{{ obj[field + "_name"] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import resource from "@/resource/resource";

export default {
  name: "ComboboxDetail",
  watch: {
    data: function () {
      console.log("in Popup", this.data);
      console.log("in Popup", this.field);
    },
    field: {
      field: function () {},
    },
  },
  components: {},
  props: { placeholder: String, maxlength: Number, data: Array, field: String },
  emits: [],
  methods: {},
  data() {
    return { isShow: false, resource };
  },
};
</script>

<style scoped>
</style>