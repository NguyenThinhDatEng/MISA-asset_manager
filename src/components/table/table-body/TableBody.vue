<template>
  <tbody>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
    <Row :obj="assets[0]"></Row>
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
          this.assets = data;
          console.log(data);
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
    return { resource, assets: [] };
  },
};
</script>

<style scoped>
</style>