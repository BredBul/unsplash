<template>
  <div class="pagination">
    <div class="pagination__items">
      <button
        :disabled="isOnFirstPage"
        type="button"
        class="pagination__item"
        @click="onClickFirstPage"
      >
        First
      </button>
      <button
        :disabled="isOnFirstPage"
        type="button"
        class="pagination__item"
        @click="onClickPrevPage"
      >
        Previous
      </button>
      <button
        v-for="page in pages"
        :key="page.name"
        :disabled="page.isDisabled"
        type="button"
        class="pagination__item"
        :class="{ current: page.isDisabled }"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
      <button
        type="button"
        :disabled="isOnLastPage"
        class="pagination__item"
        @click="onClickNextPage"
      >
        Next
      </button>
      <button
        type="button"
        :disabled="isOnLastPage"
        class="pagination__item"
        @click="onClickLastPage"
      >
        Last
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    totalPages: number;
    currentPage: number;
    maxButtons?: number;
  }>(),
  {
    currentPage: 1,
    maxButtons: 5,
  },
);

const { totalPages, currentPage, maxButtons } = toRefs(props);

const emit = defineEmits<{
  changePage: [number: number];
}>();

const isOnFirstPage = computed(() => currentPage.value === 1);
const isOnLastPage = computed(() => currentPage.value === totalPages.value);
/*
const startPage = computed(() => {
  if (currentPage.value === 1) {
    return 1;
  }

  if (currentPage.value === totalPages.value) {
    return totalPages.value - maxButtons.value;
  }

  return currentPage.value - 1;
});
const pages = computed(() => {
  const range = [];

  for (
    let i = startPage.value;
    i <= Math.min(startPage.value + maxButtons.value - 1, totalPages.value);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === currentPage.value,
    });
  }

  return range;

  return false;
});
*/

const startPage = computed(() => {
  const halfMaxButtons = Math.floor(maxButtons.value / 2);

  if (currentPage.value <= halfMaxButtons + 1) {
    return 1;
  } else if (currentPage.value >= totalPages.value - halfMaxButtons) {
    return Math.max(totalPages.value - maxButtons.value + 1, 1);
  } else {
    return currentPage.value - halfMaxButtons;
  }
});

const endPage = computed(() => {
  // const halfMaxButtons = Math.floor(maxButtons.value / 2);
  return Math.min(startPage.value + maxButtons.value - 1, totalPages.value);
});

const pages = computed(() => {
  console.log(startPage.value);
  const pageArray = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pageArray.push({
      name: i,
      isDisabled: currentPage.value === i, // You can add logic to disable certain pages if needed
    });
  }
  return pageArray;
});

function onClickPage(page: number) {
  emit("changePage", page);
}
function onClickFirstPage() {
  emit("changePage", 1);
}
function onClickLastPage() {
  emit("changePage", totalPages.value);
}
function onClickPrevPage() {
  emit("changePage", currentPage.value - 1);
}
function onClickNextPage() {
  emit("changePage", currentPage.value + 1);
}
</script>
