<template>
  <div :class="parentClass ? parentClass : ''">
    <div :id="id ? id : ''" class="dropdown--checkbox dropdown">
      <div class="dropdown__icon">
        <div class="icon center icon--18px icon--filter"></div>
      </div>
      <input
        type="text"
        class="input dropdown__input"
        :placeholder="placeholder"
        @click="isHidden = !isHidden"
      />
      <div class="dropdown__button" @click="isHidden = !isHidden">
        <div class="icon center icon--down"></div>
      </div>
      <div
        id="dropdown__data--asset-type"
        class="dropdown__data"
        v-show="isHidden == false"
      >
        <div class="data" v-for="item in data" :key="item[field + '_id']">
          <div class="checkbox__wrapper">
            <input type="checkbox" class="center checkbox" />
          </div>
          <p>{{ item[field + "_name"] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resource from "@/resource/resource";
export default {
  name: "DropdownCheckbox",
  components: {},
  props: {
    id: String,
    parentClass: String,
    placeholder: String,
    field: String,
    data: Object,
  },
  emits: [],
  methods: {},
  data() {
    return {
      resource,
      isHidden: true,
    };
  },
};
</script>

<style scoped>
</style>