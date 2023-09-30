<template>
	<main class="home-page">
		<SearchForm />
		<RandomPhotos />
	</main>
</template>

<script setup lang="ts">
import SearchForm from "@/components/search-form/SearchForm.vue";
import RandomPhotos from "./partials/RandomPhotos.vue";
</script>

<style src="./style.scss" />
