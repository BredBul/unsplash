import { unsplash } from "./api";
import { defineStore } from "pinia";
import { ref, computed, type Ref } from "vue";
import type { Random } from "unsplash-js/dist/methods/photos/types";

export const useRandomPhotosStore = defineStore("randomPhotos", () => {
  const randomPhotos: Ref<Random | Random[] | undefined> = ref([]);
  const getRandomPhotos = computed(
    (): Random | Random[] | undefined => randomPhotos.value,
  );

  async function fetchRandomPhotos(count: number = 10) {
    try {
      const data = await unsplash.photos.getRandom({ count });

      randomPhotos.value = data.response;
    } catch (error) {
      console.log("error occurred: ", error);
    }
  }

  return { randomPhotos, getRandomPhotos, fetchRandomPhotos };
});
