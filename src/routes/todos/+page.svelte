<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const [error, todos] = data.todos;
</script>

<div class="2xl:p-16 overflow-y-auto">
	{#if error}
		<div>Error while fetching todos</div>
	{:else}
		<table class="border border-gray-500 border-collapse w-full">
			<thead>
				<tr>
					<th class="border border-gray-500 border-collapse px-4 py-2 text-left" />
					<th class="border border-gray-500 border-collapse px-4 py-2 text-left">ID</th>
					<th class="border border-gray-500 border-collapse px-4 py-2 text-left">Title</th>
				</tr>
			</thead>
			<tbody>
				{#each todos as todo}
					<tr>
						<td class="border border-gray-500 border-collapse px-4 py-2">
							<input type="checkbox" checked={todo.completed} />
						</td>
						<td class="border border-gray-500 border-collapse px-4 py-2">{todo.id}</td>
						<td class="border border-gray-500 border-collapse px-4 py-2 capitalize">{todo.title}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
