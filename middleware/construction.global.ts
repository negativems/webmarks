export default defineNuxtRouteMiddleware((to) => {
	// const isProduction = process.env.NODE_ENV === 'production' ?? true;
	const isProduction = false;
	if (isProduction && to.path !== "/construction") {
		return navigateTo("/construction");
	}
});
