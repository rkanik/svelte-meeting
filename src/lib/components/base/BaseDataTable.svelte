<script lang="ts">
	import cn from 'classnames'
	import BaseActions from './BaseActions.svelte'

	import { createEventDispatcher } from 'svelte'

	type Header = {
		text: string
		value: string | ((item: any) => string)
	}
	type Item = {
		[key: string]: unknown
	}

	export let headers: Header[]
	export let items: Item[]

	const dispatch = createEventDispatcher()

	let clazz = ''
	export { clazz as class }
</script>

<div class={clazz}>
	<table class="w-full  border-collapse">
		<thead>
			<tr>
				{#each headers as header, index}
					<th
						class={cn('text-left bg-blue-800 text-white py-2 px-4', {
							'rounded-l-md': index === 0,
							'rounded-r-md': index === headers.length - 1
						})}
					>
						{header.text}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each items as item}
				<tr class="py-2">
					{#each headers as header, index}
						<td class="pt-2 px-0 pb-0">
							<div
								class={cn('h-12 flex items-center px-4 py-2 bg-dark-900 shadow', {
									'rounded-l-md': index === 0,
									'rounded-r-md': index === headers.length - 1
								})}
							>
								{#if header.value === 'actions'}
									<BaseActions
										on:view={() => dispatch('view', item)}
										on:update={() => dispatch('update', item)}
										on:delete={() => dispatch('delete', item)}
									/>
								{:else}
									{typeof header.value === 'function'
										? header.value(item)
										: item[header.value]}
								{/if}
							</div>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
