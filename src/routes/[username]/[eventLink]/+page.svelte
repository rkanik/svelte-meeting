<script lang="ts">
	import type { PageData } from './$types';

	export const prerender = true;
	export let data: PageData;

	const { username, eventLink } = data || {};
</script>

<div>{JSON.stringify({ username, eventLink })}</div>
