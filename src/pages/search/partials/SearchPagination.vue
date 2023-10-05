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
      {{ currentPage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { totalPages, currentPage, maxButtons } = withDefaults(
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

const emit = defineEmits<{
  changePage: [number: number];
}>();

const isOnFirstPage = computed(() => currentPage === 1);
const isOnLastPage = computed(() => currentPage === totalPages);
const startPage = computed(() => {
  if (currentPage === 1) {
    return 1;
  }

  if (currentPage === totalPages) {
    return totalPages - maxButtons;
  }

  return currentPage - 1;
});
const pages = computed(() => {
  const range = [];

  for (
    let i = startPage.value;
    i <= Math.min(startPage.value + maxButtons - 1, totalPages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === currentPage,
    });
  }
  console.log(range);
  return range;
});

function onClickPage(page: number) {
  emit("changePage", page);
}
function onClickFirstPage() {
  emit("changePage", 1);
}
function onClickLastPage() {
  emit("changePage", totalPages);
}
function onClickPrevPage() {
  emit("changePage", currentPage - 1);
}
function onClickNextPage() {
  emit("changePage", currentPage + 1);
}
</script>
