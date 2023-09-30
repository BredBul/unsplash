<template>
	<div class="photo-list__items">
		<template v-for="photo in photos" :key="photo.id">
			<a class="photo-list__item">
				<img :src="photo.urls.regular" :alt="photo.description" />
			</a>
		</template>
	</div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from "vue";
const { photos } = defineProps({ photos: Array<any> });

onMounted(() => {
	console.log(photos);
});
</script>

<style src="./style.scss" />
