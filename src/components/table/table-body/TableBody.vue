<template>
  <tbody>
    <Row
      v-for="(asset, index) in assets"
      :key="index"
      :obj="asset"
      :i="index + 1"
      @click="asset.isActive = !asset.isActive"
    ></Row>
  </tbody>
</template>

<script>
import Row from "./TableRow.vue";
import resource from "@/resource/resource";
export default {
  name: "TableBody",
  created() {},
  mounted() {
    /**
     * Call API lấy tất cả bản ghi tài sản
     * Author: Nguyen Van Thinh 2/11/2022
     */
    try {
      fetch(resource.URLs.getAllAsset, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Thêm thuộc tính active cho từng dòng dữ liệu trong dropdown
          for (let item of data) {
            item["isActive"] = false;
          }
          this.assets = data;
          //   console.log(this.assets);
        })
        .catch((error) => {
          console.log("Call get all assets API", error);
        });
    } catch (error) {
      console.log("Call get all assets API", error);
    }
  },
  components: { Row },
  props: {},
  emits: [],
  methods: {},
  data() {
    return { resource, assets: [], stt: 1 };
  },
};
</script>

<style scoped>
</style>