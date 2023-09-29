<template>
	<main class="home-page">
		<SearchForm />
		<PhotosGrid />
	</main>
</template>

<script setup lang="ts">
import SearchForm from "@/components/search-form/SearchForm.vue";
import PhotosGrid from "./partials/PhotosGrid.vue";
</script>

<style src="./style.scss" />
