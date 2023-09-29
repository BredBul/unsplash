<template>
	<main class="search-page">
		<SearchForm class="search-page__search-form" />
		<div class="search-page__content">
			<template v-for="photo in searchedPhotos">
				<a class="search-page__item">
					<img :src="photo.urls.regular" :alt="photo.description" />
				</a>
			</template>
		</div>
	</main>
</template>
<script setup lang="ts">
import SearchForm from "@/components/search-form/SearchForm.vue";

import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRouter();
const store = useStore();

const searchedPhotos = computed(() => {
	return store.state.searchedPhotos.results;
});

// const getRandomPhotos = computed(() => {
// 	return store.getters.getRandomPhotos;
// });
onMounted(() => {
	const query = route.currentRoute.value.query.query;
	if (query) {
		store.dispatch("fetchSearchedPhotos", { query, perPage: 9 });
	}
});
</script>
<style src="./style.scss"></style>
