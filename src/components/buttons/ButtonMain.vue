<template>
  <button
    :class="[
      'button',
      'button--main',
      { 'button--delete-dialog': isDeleteDialog },
      { 'button--ok': type == Type.Main ? true : false },
    ]"
    :title="title"
    v-show="type == Type.Main"
  >
    {{ buttonContent }}
  </button>
  <button
    :class="[
      'button',
      'button--secondary',
      { 'button--cancel': type == Type.Secondary ? true : false },
    ]"
    :title="title"
    v-show="type == Type.Secondary"
  >
    {{ buttonContent }}
  </button>
</template>

<script>
import Enum from "@/js/enum/enum";

export default {
  name: "ButtonMain",
  created() {},
  components: {},
  props: {
    title: String,
    buttonContent: String,
    type: Number,
    isDeleteDialog: {
      type: Boolean,
      default: false,
    },
  },
  emits: [],
  methods: {},
  data() {
    return { Type: Enum.Type };
  },
};
</script>

<style scoped>
.button--main {
  margin-left: 8px;
}

.button--main,
.button--main:focus {
  background-color: var(--default);
  color: #fff;
}

.button--main:hover {
  background-color: var(--hover);
}

.button--main:active {
  background-color: var(--active);
}

.button--main:disabled {
  background-color: var(--disabled);
}

.button--secondary {
  background-color: #fff;
}

.button--secondary:hover,
.button--secondary:active,
.button--secondary:focus {
  background-color: var(--default);
  color: #fff;
}

.button--secondary:disabled {
  color: #000;
  background-color: var(--outline-button--disabled);
}

.button--delete-dialog {
  background-color: var(--delete-dialog--default);
}
</style>