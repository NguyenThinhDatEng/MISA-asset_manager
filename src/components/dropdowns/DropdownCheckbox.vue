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
      />
      <div class="dropdown__button">
        <div class="icon center icon--down"></div>
      </div>
      <div id="dropdown__data--asset-type" class="dropdown__data" hidden>
        <div class="data">
          <div class="checkbox__wrapper">
            <input type="checkbox" class="center checkbox" />
          </div>
          <p>Máy vi tính xách tay</p>
        </div>
        <div class="data">
          <div class="checkbox__wrapper">
            <input type="checkbox" class="center checkbox" />
          </div>
          <p>Máy tính bàn</p>
        </div>
        <div class="data">
          <div class="checkbox__wrapper">
            <input type="checkbox" class="center checkbox" />
          </div>
          <p>Điện thoại di động</p>
        </div>
        <div class="data">
          <div class="checkbox__wrapper">
            <input type="checkbox" class="center checkbox" />
          </div>
          <p>Điện thoại bàn</p>
        </div>
        <div class="data">
          <div class="checkbox__wrapper">
            <input type="checkbox" class="center checkbox" />
          </div>
          <p>Đồ gia dụng</p>
        </div>
        <div class="data">
          <div class="checkbox__wrapper">
            <input type="checkbox" class="center checkbox" />
          </div>
          <p>1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resource from "@/resource/resource";
export default {
  name: "CheckboxDropdown",
  created() {},
  components: {},
  props: { id: String, parentClass: String, placeholder: String },
  emits: [],
  methods: {},
  data() {
    return {
      resource,
    };
  },
};
</script>

<style scoped>
</style>