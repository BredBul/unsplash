<template>
	<section class="home-page__random-photos random-photos">
		<div class="random-photos__container _container">
			<PhotoList :photos="randomPhotos" />
		</div>
	</section>
</template>

<script setup lang="ts">
import PhotoList from "@/components/photo-list/PhotoList.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const randomPhotos = computed(() => {
	return store.state.randomPhotos;
});

onMounted(() => {
	store.dispatch("fetchRandomPhotos", 9);
});
</script>
