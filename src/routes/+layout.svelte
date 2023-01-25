<script lang="ts">
	import '$lib/assets/scss/app.scss';
	import '$lib/assets/css/tailwind.css';

	import { page } from '$app/stores';
	import { SvelteUIProvider } from '@svelteuidev/core';

	const links = [
		{
			text: 'Home',
			href: '/'
		},
		{
			text: 'Todos',
			href: '/todos'
		},
		{
			text: 'Availabilities',
			href: '/availabilities'
		},
		{
			text: 'Users',
			href: '/users'
		}
	];
</script>

<SvelteUIProvider themeObserver="dark">
	<div class=" relative">
		<div class="container absolute inset-y-0 left-0 z-10 bg-dark-900" />
		<div class="container absolute inset-y-0 right-0 z-20 bg-dark-800" />
		<div class="container mx-auto relative z-30">
			<div class="flex">
				<div
					class="bg-dark-900 flex-none w-96 p-4 h-screen overflow-hidden sticky top-0 flex flex-col"
				>
					<div class="flex-none">
						<div>
							<div class="text-xl font-medium">App</div>
						</div>
						<hr class="mt-4" />
					</div>

					<div class="flex-1 flex flex-col overflow-y-auto mt-4">
						<div class="text-lg font-medium">Modules</div>
						<ul class="mt-4">
							{#each links as link}
								<li>
									<a
										href={link.href}
										class="text-dark-200 font-medium block hover:text-dark-100 h-8 {$page.url
											.pathname === link.href
											? 'text-white'
											: ''}"
									>
										{link.text}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<main class="bg-dark-800 flex-1 flex flex-col overflow-hidden">
					<slot />
				</main>
			</div>
		</div>
	</div>
</SvelteUIProvider>
