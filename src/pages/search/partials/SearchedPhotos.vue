<template>
  <section class="searched-photos">
    <div class="searched-photos__container _container">
      <PhotoList v-if="searchedPhotos?.length" :photos="searchedPhotos" />
      <SearchPagination
        v-if="totalPages"
        :total-pages="totalPages"
        :current-page="+currentPage"
        class="searched-photos__pagination"
        @change-page="onPageChange"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoList from "@/components/photo-list/PhotoList.vue";
import SearchPagination from "@/pages/search/partials/SearchPagination.vue";

import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearchedPhotosStore } from "@/stores/searched-photos";

const router = useRouter();
const route = useRoute();
const store = useSearchedPhotosStore();

const searchedPhotos = computed(() => store.searchedPhotos?.results);

const totalPages = computed(() => store.searchedPhotos?.total_pages);

const currentPage = computed(() => route.query.page ?? 1);

const computedQuery = computed(() => route.query.query ?? "");

function onPageChange(page: number) {
  router.push({ query: { ...route.query, page } });

  if (computedQuery.value) {
    store.fetchSearchedPhotos({
      query: computedQuery.value as string,
      perPage: 3,
      page: page,
    });
  }
}

onMounted(() => {
  if (computedQuery.value) {
    store.fetchSearchedPhotos({
      query: computedQuery.value as string,
      perPage: 3,
    });
  }
});
</script>
