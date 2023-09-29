<template>
	<section class="home-page__random-photos random-photos">
		<div class="random-photos__container _container">
			<div class="random-photos__content">
				<template v-for="photo in randomPhotos">
					<a class="random-photos__item">
						<img :src="photo.urls.regular" :alt="photo.description" />
					</a>
				</template>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const randomPhotos = computed(() => {
	return store.state.randomPhotos;
});

// const getRandomPhotos = computed(() => {
// 	return store.getters.getRandomPhotos;
// });
onMounted(() => {
	store.dispatch("fetchRandomPhotos", 9);
});
</script>
