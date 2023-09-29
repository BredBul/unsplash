import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/home/HomePage.vue";
import SearchPage from "@/pages/search/SearchPage.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomePage,
	},
	{
		path: "/search",
		name: "search",
		component: SearchPage,
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export default router;
