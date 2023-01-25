<script lang="ts">
	import { onMount } from 'svelte';
	import { createField } from '$lib/form';

	export let value: any = '';
	export let schema: any = undefined;

	export let form: any = undefined;

	const field = createField({ value, schema });

	const onChange = (e: any) => {
		field.onChange(e);
		value = e.target.value;
	};

	onMount(() => {
		form?.register(field);
	});
</script>

<div>
	<slot
		field={{
			onChange,
			attrs: {
				value: $field.value,
				error: $field.errors[0],
				invalid: $field.errors.length > 0
			}
		}}
	/>
</div>
