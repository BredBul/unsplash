import { createStore } from "vuex";
import { createApi } from "unsplash-js";
// import axios from "axios";

const unsplash = createApi({
	accessKey: "yVElslHx4YIhG7pfjAG4Vy90sfHkwNXy-p7DdR8DCxw",
});

export default createStore({
	state: {
		randomPhotos: [],
		searchedPhotos: [],
	},
	getters: {
		getRandomPhotos: state => state.randomPhotos,
		getSearchedPhotos: state => state.searchedPhotos,
	},
	actions: {
		fetchRandomPhotos({ commit }, count: number = 10) {
			unsplash.photos
				.getRandom({
					count: count,
				})
				.then(result => {
					if (result.errors) {
						console.log("error occurred: ", result.errors[0]);
					} else {
						const photo = result.response;
						commit("SET_RANDOM_PHOTOS", photo);
					}
				});
		},
		fetchSearchedPhotos({ commit }, { query, perPage }) {
			unsplash.search.getPhotos({ query, perPage }).then(result => {
				if (result.errors) {
					console.log("error occurred: ", result.errors[0]);
				} else {
					const photos = result.response;
					commit("SET_SEARCHED_PHOTOS", photos);
				}
			});
		},
	},
	mutations: {
		SET_RANDOM_PHOTOS(state, randomPhotos) {
			state.randomPhotos = randomPhotos;
		},
		SET_SEARCHED_PHOTOS(state, searchedPhotos) {
			state.searchedPhotos = searchedPhotos;
		},
	},
});

// non-feed example
