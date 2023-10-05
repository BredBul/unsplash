import { unsplash } from "./api";
import { defineStore } from "pinia";
import { ref, computed, type Ref } from "vue";
import type { Photos } from "unsplash-js/dist/methods/search/types/response";

export const useSearchedPhotosStore = defineStore("searchedPhotos", () => {
  const searchedPhotos: Ref<Photos | undefined> = ref(undefined);
  const getsearchedPhotos = computed(
    (): Photos | undefined => searchedPhotos.value,
  );

  async function fetchSearchedPhotos({
    query,
    perPage,
    page,
  }: {
    query: string;
    perPage?: number;
    page?: number;
  }) {
    try {
      const data = await unsplash.search.getPhotos({ query, perPage, page });

      searchedPhotos.value = data.response;
    } catch (error) {
      console.log("error occurred: ", error);
    }
  }

  return { searchedPhotos, getsearchedPhotos, fetchSearchedPhotos };
});
