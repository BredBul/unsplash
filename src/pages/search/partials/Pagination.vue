<template>
  <div class="pagination">
    <div class="pagination__items">
      <button v-for="pageNumber in totalPages" :key="pageNumber" class="pagination__item" @click.prevent="">
        {{ pageNumber }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed} from "vue";

const {totalPages, currentPage} = withDefaults(
  defineProps<{
    totalPages: number,
    currentPage: number,
    maxButtons: number,
  }>(), {
    currentPage: 1,
    maxButtons: 5,
  });

const startPage = computed(() =>{
    if (currentPage === 1) {
      return 1;
    }

    if (this.currentPage === totalPages) {
      return totalPages - maxVisibleButtons;
    }

    return this.currentPage - 1;
})

const pages = computed(() =>{
  const range = [];

  for (
    let i = startPage;
    i <= Math.min(startPage + maxVisibleButtons - 1, totalPages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === currentPage
    });
  }

  return range;
})

function f(page: number): void {

}

</script>
