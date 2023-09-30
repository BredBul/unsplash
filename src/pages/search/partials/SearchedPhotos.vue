<template>
  <section class="searched-photos">
    <div class="searched-photos__container _container">
      <PhotoList :photos="searchedPhotos"/>
      <Pagination :totalPages="totalPages" :currentPage="currentPage" class="searched-photos__pagination"/>
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoList from "@/components/photo-list/PhotoList.vue";
import Pagination from "@/pages/search/partials/Pagination.vue";

import {onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const route = useRouter();
const store = useStore();

const searchedPhotos = computed(() =>
  store.state.searchedPhotos.results
);

const totalPages = computed(() =>
  store.state.searchedPhotos.total_pages
);

const currentPage = computed(() =>
  route.currentRoute.value.query.page ?? 1
);

onMounted(() => {
  const query = route.currentRoute.value.query.query;
  if (query) {
    store.dispatch("fetchSearchedPhotos", {query, perPage: 9});
  }
});
</script>
