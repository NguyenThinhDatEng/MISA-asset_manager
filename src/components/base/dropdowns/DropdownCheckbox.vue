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
      <div class="dropdown__button" @click="isHidden = false">
        <div class="icon center icon--down"></div>
      </div>
      <div class="dropdown__data" v-show="isHidden == false">
        <div
          v-for="item in data"
          :key="item[field + '_id']"
          :class="{ data: true, 'data--active': item.active }"
          @click="onClickData(item)"
        >
          <div class="checkbox__wrapper">
            <input
              type="checkbox"
              class="center checkbox"
              v-model="item.active"
            />
          </div>
          <p>{{ item[field + "_name"] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resource from "@/js/resource/resource";

export default {
  name: "DropdownCheckbox",
  created() {
    try {
      // Ẩn dropdown khi click ra ngoài
      window.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.isHidden = true;
        }
      });
      // Thêm thuộc tính active cho từng dòng dữ liệu trong dropdown
      for (let item of this.data) {
        item["active"] = false;
      }
    } catch (error) {
      console.log(error);
    }
  },
  props: {
    id: String,
    parentClass: String,
    placeholder: String,
    field: String,
    data: Object,
  },
  methods: {
    // Thay đổi trạng thái của dòng dữ liệu khi được nhấn
    onClickData: function (item) {
      item.active = !item.active;
    },
  },
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