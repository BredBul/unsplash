<template>
  <section class="random-photos">
    <div class="random-photos__container _container">
      <PhotoList v-if="randomPhotos !== undefined" :photos="randomPhotos" />
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoList from "@/components/photo-list/PhotoList.vue";

import { onMounted, computed } from "vue";
import { useRandomPhotosStore } from "@/stores/random-photos";

const store = useRandomPhotosStore();

const randomPhotos = computed(() => store.randomPhotos);

onMounted(() => {
  store.fetchRandomPhotos(9);
});
</script>
