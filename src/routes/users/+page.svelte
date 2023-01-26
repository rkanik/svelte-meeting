<script lang="ts">
	import BaseInput from '$lib/components/base/BaseInput.svelte'
	import BaseDataTable from '$lib/components/base/BaseDataTable.svelte'

	import { z, zUser } from '$lib/zod'
	import { createForm } from '$lib/form'
	import { EyeClosed, EyeOpen, Plus } from 'radix-icons-svelte'
	import {
		Button,
		Title,
		Modal,
		Stack,
		TextInput,
		Space,
		Group,
		CloseButton,
		Divider,
		theme,
		ActionIcon
	} from '@svelteuidev/core'
	import { trpc } from '$lib/trpc/client'
	import type { PageData } from './$types'
	import type { User } from '@prisma/client'

	export let data: PageData

	// Modal
	let modal = false
	const onCloseModal = () => {
		modal = false
	}

	// User
	const form = createForm()

	let isPasswordVisible = false
	const newUser = () => ({
		name: '',
		email: '',
		password: '',
		passwordConfirmation: ''
	})
	let user = newUser()

	const onSubmit = async (e: Event) => {
		e.preventDefault()

		if (!(await form.validate())) {
			return
		}

		const createdUser = await trpc().users.create.mutate(user)
		data.users = [createdUser as any, ...data.users]

		modal = false
		user = newUser()
	}

	const onDeleteUser = async (event: CustomEvent<User>) => {
		console.log('onDeleteUser', user)
		if (confirm('Are you sure you want to delete this user?')) {
			await trpc().users.delete.mutate({ id: event.detail.id })
			data.users = data.users.filter((user) => user.id != event.detail.id)
		}
	}
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
					{form}
					bind:value={user.name}
					let:field={{ attrs, onChange }}
					schema={zUser.create.shape.name}
				>
					<TextInput
						{...attrs}
						required
						label="Name"
						placeholder="Enter full name"
						on:input={onChange}
					/>
				</BaseInput>

				<BaseInput
					{form}
					bind:value={user.email}
					let:field={{ attrs, onChange }}
					schema={zUser.create.shape.email}
				>
					<TextInput
						{...attrs}
						required
						label="Email"
						placeholder="Enter email address"
						on:input={onChange}
					/>
				</BaseInput>

				<BaseInput
					{form}
					bind:value={user.password}
					let:field={{ attrs, onChange }}
					schema={zUser.create.shape.password}
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
					{form}
					bind:value={user.passwordConfirmation}
					let:field={{ attrs, onChange }}
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

	<BaseDataTable
		class="mt-4"
		headers={[
			{ text: 'Id', value: 'id' },
			{ text: 'Name', value: 'name' },
			{ text: 'Email', value: 'email' },
			{
				text: 'Roles',
				value: (item) => item.userRoles?.map((v) => v.role.name).toString() || '-'
			},
			{ text: 'Actions', value: 'actions' }
		]}
		items={data.users}
		on:delete={onDeleteUser}
	/>
</div>
