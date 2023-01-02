<template>
  <td
    :style="[
      { 'min-width': config.minWidth },
      { 'max-width': config.maxWidth },
      { 'text-align': config.align },
    ]"
  >
    <!-- check box -->
    <div
      v-if="config.type === tdType.checkbox"
      class="checkbox__wrapper col--checkbox"
    >
      <input type="checkbox" class="checkbox" :checked="isActive" />
    </div>
    <!-- text box -->
    <p v-else-if="config.type === tdType.text">
      {{ content }}
    </p>
    <!-- number box -->
    <p v-else-if="config.type === tdType.number">
      {{ Function.formatMoney(content) }}
    </p>
    <!-- other -->
    <div v-else class="feature">
      <div
        class="icon icon--edit"
        :title="title.edit"
        @click="carryOutFeature(Enum.Mode.Update)"
      ></div>
      <div
        class="icon icon--duplicate"
        :title="title.duplicate"
        @click="carryOutFeature(Enum.Mode.Duplicate)"
      ></div>
    </div>
  </td>
</template>

<script>
// Resources
import Enum from "@/js/enum/enum";
import Resource from "@/js/resource/resource";
import Function from "@/js/common/function";

export default {
  name: "TableData",
  props: {
    // Trạng thái ấn kích hoạt của ô check box
    isActive: {
      type: Boolean,
      default: false,
    },
    // Nội dung
    content: {
      type: String,
    },
    // style in css
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // Resources
      Function, // Hàm dùng chung
      tdType: Enum.TableData.type, // Các kiểu dữ liệu trong td
      title: Resource.Title, // tooltip
    };
  },
};
</script>

<style scoped>
/* Check box */
.checkbox__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.col--checkbox {
  min-width: 30px;
  text-align: center;
}

.checkbox {
  position: absolute;
  top: 11px;
  left: 16px;
}
</style>