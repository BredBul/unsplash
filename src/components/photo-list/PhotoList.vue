<template>
  <div class="photo-list__items">
    <template v-for="photo in displayedPhotos" :key="photo.id">
      <a class="photo-list__item">
        <img
          :src="photo?.urls.regular"
          :alt="photo?.description || 'description is missing'"
        />
      </a>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { Random, Basic } from "unsplash-js/dist/methods/photos/types";

const props = defineProps<{
  photos: Basic[] | Random[] | Random | undefined;
}>();

const { photos } = toRefs(props);

const displayedPhotos = computed(() =>
  Array.isArray(photos.value) ? photos.value : [photos.value],
);
</script>

<style src="./style.scss" />
