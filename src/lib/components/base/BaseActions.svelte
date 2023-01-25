<script>
	import { Divider, Menu, Text, ActionIcon } from '@svelteuidev/core';
	import {
		Gear,
		Trash,
		Width,
		Camera,
		ChatBubble,
		DotsHorizontal,
		MagnifyingGlass
	} from 'radix-icons-svelte';
</script>

<Menu>
	<ActionIcon slot="control" variant="light">
		<DotsHorizontal />
	</ActionIcon>

	<Menu.Label>Application</Menu.Label>
	<Menu.Item icon={Gear}>Settings</Menu.Item>
	<Menu.Item icon={ChatBubble}>Messages</Menu.Item>
	<Menu.Item icon={Camera}>Gallery</Menu.Item>
	<Menu.Item icon={MagnifyingGlass}>
		<svelte:fragment slot="rightSection">
			<Text size="xs" color="dimmed">⌘K</Text>
		</svelte:fragment>
		Search
	</Menu.Item>

	<Divider />

	<Menu.Label>Danger zone</Menu.Label>
	<Menu.Item icon={Width}>Transfer my data</Menu.Item>
	<Menu.Item color="red" icon={Trash}>Delete my account</Menu.Item>
</Menu>
