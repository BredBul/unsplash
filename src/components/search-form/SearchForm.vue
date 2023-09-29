<template>
	<section class="search-form">
		<div class="search-form__container _container">
			<div class="search-form__content">
				<form @submit.prevent class="search-form__field">
					<input
						type="text"
						:value="searchInput"
						@keyup.enter="getSearch"
						placeholder="Search an Image" />
					<!-- <button @click="getSearch('f')">ff</button> -->
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRouter();
const store = useStore();

const searchInput = ref("");

const searchedPhotos = computed(() => {
	return store.state.searchedPhotos;
});

function getSearch({ target: { value } }: string) {
	if (route.currentRoute.value.name !== "search") {
		route.push({ path: "search", query: { query: value } });
	} else {
		route.push({ query: { query: value } });
	}

	searchInput.value = value;
	store.dispatch("fetchSearchedPhotos", { query: value, perPage: 9 });
}

onMounted(() => {
	if (route.currentRoute.value.query.query) {
		searchInput.value = route.currentRoute.value.query.query;
	}
});
</script>

<style src="./style.scss"></style>
