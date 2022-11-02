<template>
  <tr>
    <td class="checkbox__wrapper">
      <input type="checkbox" class="checkbox" />
    </td>
    <td :style="setStyle('center', '')" class="STT">1</td>
    <!-- <td>{{ obj.fixed_asset_code }}</td>
    <td :style="setStyle('', '110px')">{{ obj.fixed_asset_name }}</td>
    <td :style="setStyle('', '110px')">{{ obj.fixed_asset_category_name }}</td>
    <td :style="setStyle('', '110px')">{{ obj.department_name }}</td>
    <td :style="setStyle('right', '')">{{ obj.quantity }}</td>
    <td :style="setStyle('right', '')">{{ obj.cost }}</td>
    <td :style="setStyle('right', '')">{{ obj.depreciation_rate }}</td> -->
    <td>ST0298</td>
    <td :style="setStyle('', '110px')">Phần mềm MISA cukcuk</td>
    <td :style="setStyle('', '110px')">Phần mềm ứng dụng</td>
    <td :style="setStyle('', '110px')">Phòng kỹ thuật</td>
    <td :style="setStyle('right', '')">3739515</td>
    <td :style="setStyle('right', '')">921188906995579</td>
    <td :style="setStyle('right', '')">2</td>
    <td :style="setStyle('right', '')">21188906995</td>
    <td>
      <div class="feature">
        <div class="icon icon-table icon_edit"></div>
        <div class="icon icon-table icon_duplicate"></div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  components: {},
  watch: {
    obj() {},
  },
  mounted() {
    console.log(this.obj);
  },
  props: { obj: Object },
  emits: [],
  methods: {
    /**
     * cấu hình style cho các table data
     * @param {String} align căn chỉnh dữ liệu
     * @param {String} maxWidth độ rộng cột lớn nhất
     * @return {String} là nội dung của style
     */
    setStyle(align, maxWidth) {
      try {
        let alignProp = "text-align: " + align;
        let widthProp = "max-width: " + maxWidth;
        if (align && maxWidth) {
          return alignProp + ";" + widthProp;
        }
        if (align) return alignProp;
        if (maxWidth) return widthProp;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>