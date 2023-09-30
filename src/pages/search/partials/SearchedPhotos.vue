<template>
	<section class="home-page__random-photos random-photos">
		<div class="random-photos__container _container">
			<PhotoList :photos="searchedPhotos" />
		</div>
	</section>
</template>

<script setup lang="ts">
import PhotoList from "@/components/photo-list/PhotoList.vue";

import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRouter();
const store = useStore();

const searchedPhotos = computed(() => {
	return store.state.searchedPhotos.results;
});

onMounted(() => {
	const query = route.currentRoute.value.query.query;
	if (query) {
		store.dispatch("fetchSearchedPhotos", { query, perPage: 9 });
	}
});
</script>

<style scoped></style>
