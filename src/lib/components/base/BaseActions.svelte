<script>
	import { Divider, Menu, Text, ActionIcon } from '@svelteuidev/core'
	import {
		Gear,
		Trash,
		Width,
		Camera,
		ChatBubble,
		DotsHorizontal,
		MagnifyingGlass,
		EyeOpen,
		Pencil1,
		Pencil2
	} from 'radix-icons-svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
</script>

<Menu>
	<ActionIcon slot="control" variant="light">
		<DotsHorizontal />
	</ActionIcon>

	<Menu.Label>Actions</Menu.Label>
	<Menu.Item icon={EyeOpen} on:click={() => dispatch('view')}>View</Menu.Item>
	<Menu.Item icon={Pencil2} on:click={() => dispatch('update')}>Update</Menu.Item>
	<!-- <Menu.Item icon={Camera}>Gallery</Menu.Item> -->
	<!-- <Menu.Item icon={MagnifyingGlass}>
		<svelte:fragment slot="rightSection">
			<Text size="xs" color="dimmed">⌘K</Text>
		</svelte:fragment>
		Search
	</Menu.Item> -->

	<Divider />

	<!-- <Menu.Label>Danger zone</Menu.Label> -->
	<!-- <Menu.Item icon={Width}>Transfer my data</Menu.Item> -->
	<!-- <Menu.Label>Danger</Menu.Label> -->
	<Menu.Item color="red" icon={Trash} on:click={() => dispatch('delete')}>Delete</Menu.Item>
</Menu>
