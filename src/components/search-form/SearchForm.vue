<template>
  <section class="search-form">
    <div class="search-form__container _container">
      <div class="search-form__content">
        <form class="search-form__field" @submit.prevent>
          <input
            type="text"
            :modelValue="searchInput"
            placeholder="Search an Image"
            @keyup.enter="getSearch"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSearchedPhotosStore } from "@/stores/searched-photos";

const router = useRouter();
const route = useRoute();
const store = useSearchedPhotosStore();

const searchInput = ref("");

function getSearch({ target }: KeyboardEvent) {
  const { value } = target as HTMLInputElement;
  if (route.name !== "search") {
    router.push({ path: "search", query: { query: value } });
  } else {
    router.push({ query: { query: value } });
  }

  searchInput.value = value;
  store.fetchSearchedPhotos({ query: value, perPage: 9 });
}

onMounted(() => {
  if (route.query.query) {
    searchInput.value = route.query.query as string;
  }
});
</script>

<style src="./style.scss"></style>
