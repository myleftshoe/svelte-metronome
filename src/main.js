import App from './App.svelte';

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
			.then((reg) => {
			console.log('Service worker registered.', reg);
			});
		});
}

const app = new App({
	target: document.body,
});

export default app;