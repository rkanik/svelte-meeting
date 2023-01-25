<script lang="ts">
	import type { PageData } from './$types';
	import BaseActions from '$lib/components/base/BaseActions.svelte';

	export let data: PageData;

	const [isError, response] = data.response;
</script>

<div class="2xl:p-16 overflow-y-auto">
	{#if isError}
		<div>Error while fetching todos</div>
	{:else}
		<table class="border border-gray-500 border-collapse w-full">
			<thead>
				<tr>
					<th class="border border-gray-500 border-collapse px-4 py-2 text-left">ID</th>
					<th class="border border-gray-500 border-collapse px-4 py-2 text-left">Name</th>
					<th class="border border-gray-500 border-collapse px-4 py-2 text-left">Timezone</th>
					<th class="border border-gray-500 border-collapse px-4 py-2 text-left">Default</th>
					<th class="border border-gray-500 border-collapse px-4 py-2 text-left">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each response.availabilities.data as item}
					<tr>
						<td class="border border-gray-500 border-collapse px-4 py-2">{item._id}</td>
						<td class="border border-gray-500 border-collapse px-4 py-2">{item.name}</td>
						<td class="border border-gray-500 border-collapse px-4 py-2 capitalize">
							{item.timezone}
						</td>
						<td class="border border-gray-500 border-collapse px-4 py-2 capitalize">
							{item.isDefault ? 'Yes' : '-'}
						</td>
						<td>
							<BaseActions />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
