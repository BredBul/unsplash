<template>
  <main class="search-page">
    <SearchForm class="search-page__search-form" />
    <SearchedPhotos class="search-page__searched-photos" />
  </main>
</template>

<script setup lang="ts">
import SearchForm from "@/components/search-form/SearchForm.vue";
import SearchedPhotos from "@/pages/search/partials/SearchedPhotos.vue";
</script>

<style src="./style.scss"></style>
