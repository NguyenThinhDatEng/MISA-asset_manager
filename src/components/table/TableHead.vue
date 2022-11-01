<template>
  <thead>
    <tr>
      <th class="th--checkbox checkbox__wrapper">
        <input id="checkbox-header" type="checkbox" class="checkbox" />
      </th>
      <th
        v-for="item in ths"
        :key="item.id"
        :class="'th--' + item.type"
        :title="item.title || ''"
      >
        {{ item.content }}
      </th>
    </tr>
  </thead>
</template>

<script>
// import resource from "@/resource/resource";
export default {
  name: "TableHead",
  data() {
    return {
      ths: [
        { content: "STT", type: "text", title: "Số thứ tự" },
        { content: "Mã tài sản", type: "text" },
        { content: "Tên tài sản", type: "text" },
        { content: "Loại tài sản", type: "text" },
        { content: "Bộ phận sử dụng", type: "text" },
        { content: "Số lượng", type: "number" },
        { content: "Nguyên giá", type: "number" },
        {
          content: "HM/KH lũy kế",
          type: "number",
          title: "Hao mòn/Khấu hao lũy kế",
        },
        { content: "Giá trị còn lại", type: "number" },
        { content: "Chức năng", type: "" },
      ],
    };
  },
};
</script>

<style scoped>
</style>