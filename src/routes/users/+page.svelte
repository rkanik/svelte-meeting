<script lang="ts">
	import BaseInput from '$lib/components/base/BaseInput.svelte';
	import { createForm } from '$lib/form';
	import {
		Button,
		Title,
		Modal,
		Stack,
		TextInput,
		Space,
		Group,
		Text,
		CloseButton,
		Divider,
		theme,
		ActionIcon,
		ThemeIcon
	} from '@svelteuidev/core';
	import { EyeClosed, EyeOpen, Plus } from 'radix-icons-svelte';
	import { z } from 'zod';

	// Modal
	let modal = false;
	const onCloseModal = () => {
		modal = false;
	};

	// User
	const form = createForm();

	let isPasswordVisible = false;
	const user = {
		name: '',
		email: '',
		password: '',
		passwordConfirmation: ''
	};

	const onSubmit = async (e: Event) => {
		e.preventDefault();

		if (!(await form.validate())) {
			return;
		}

		console.log({ user });
	};
</script>

<div class="2xl:p-16 overflow-y-auto">
	<Modal centered opened={modal} withCloseButton={false} on:close={onCloseModal}>
		<div class="flex justify-between items-center">
			<Title order={4} weight="medium">Create a new User</Title>
			<Space />
			<CloseButton color="red" size="lg" iconSize="lg" on:click={onCloseModal} />
		</div>

		<Divider color={theme.colors.gray800.value} />

		<form>
			<Stack>
				<BaseInput
					bind:value={user.name}
					let:field={{ attrs, onChange }}
					{form}
					schema={z.string().min(1, 'Name is required')}
				>
					<TextInput {...attrs} required label="Name" placeholder="John Doe" on:input={onChange} />
				</BaseInput>

				<BaseInput
					bind:value={user.email}
					let:field={{ attrs, onChange }}
					{form}
					schema={z.string().email('Please enter a valid email address')}
				>
					<TextInput
						{...attrs}
						required
						label="Email"
						placeholder="john@doe.com"
						on:input={onChange}
					/>
				</BaseInput>

				<BaseInput
					bind:value={user.password}
					let:field={{ attrs, onChange }}
					{form}
					schema={z
						.string()
						.min(8, 'Password must contain at least 8 characters')
						.max(32, "Password can't contain more than 32 characters")}
				>
					<TextInput
						{...attrs}
						required
						showRightSection
						type={isPasswordVisible ? 'text' : 'password'}
						label="Password"
						placeholder="********"
						on:input={onChange}
					>
						<ActionIcon
							type="button"
							color="white"
							slot="rightSection"
							on:click={() => (isPasswordVisible = !isPasswordVisible)}
						>
							{#if isPasswordVisible}
								<EyeClosed />
							{:else}
								<EyeOpen />
							{/if}
						</ActionIcon>
					</TextInput>
				</BaseInput>

				<BaseInput
					bind:value={user.passwordConfirmation}
					let:field={{ attrs, onChange }}
					{form}
					schema={z.custom((v) => v === user.password, {
						message: "Password does't match."
					})}
				>
					<TextInput
						{...attrs}
						required
						placeholder="********"
						label="Confirm Password"
						type={isPasswordVisible ? 'text' : 'password'}
						on:input={onChange}
					/>
				</BaseInput>
			</Stack>
			<Space h="lg" />
			<Group position="right">
				<Button on:click={onCloseModal} variant="outline">Cancel</Button>
				<Button on:click={onSubmit}>Submit</Button>
			</Group>
		</form>
	</Modal>

	<div class="flex items-center">
		<Title order={2}>Users</Title>
		<div class="flex-1" />

		<Button on:click={() => (modal = true)}>
			<Plus slot="leftIcon" />
			<span>Create</span>
		</Button>
	</div>
</div>
