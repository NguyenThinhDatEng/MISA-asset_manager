<template>
  <tr :class="{ 'row--active': this.obj.isActive }">
    <td class="checkbox__wrapper col--checkbox">
      <input type="checkbox" class="checkbox" :checked="this.obj.isActive" />
    </td>
    <td class="col--stt">{{ i }}</td>
    <td class="col--asset-code">{{ obj.fixed_asset_code }}</td>
    <td class="col--asset-name">{{ obj.fixed_asset_name }}</td>
    <td class="col--asset-category">
      {{ obj.fixed_asset_category_name }}
    </td>
    <td class="col--department">{{ obj.department_name }}</td>
    <td class="col--quantity">{{ obj.quantity }}</td>
    <td class="col--cost">{{ obj.cost }}</td>
    <td class="col--depreciation">{{ obj.depreciation_rate }}</td>
    <td class="col--residual-value">100</td>
    <td class="col--feature">
      <div class="feature">
        <div class="icon icon--edit"></div>
        <div class="icon icon--duplicate"></div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  components: {},
  props: { obj: Object, i: Number },
  emits: [],
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>