<template>
  <div :class="['data', { 'data--selected': obj.isActive }]">
    <div :class="['icon__wrapper', { 'icon__wrapper--checked': obj.isActive }]">
      <div class="icon center icon--check"></div>
    </div>
    <p>{{ obj[field + "_name"] }}</p>
  </div>
</template>

<script>
export default {
  name: "DataTick",
  props: { obj: Object, field: String },
  data() {
    return {};
  },
};
</script>

<style scoped>
.data {
  position: relative;
  display: flex;
  height: 36px;
  cursor: context-menu;
}

.data:hover .icon__wrapper {
  opacity: 1;
}

.icon__wrapper {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 2.5px;
  background-color: var(--combobox__data);
  opacity: 0;
}

.data--selected {
  background-color: var(--combobox__data);
}

.icon__wrapper--checked {
  opacity: 1;
}

p {
  padding-left: 3px;
}
</style>