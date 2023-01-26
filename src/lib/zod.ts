import { z } from 'zod'

const zUserCreate = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Please enter a valid email address'),
	password: z
		.string()
		.min(8, 'Password must contain at least 8 characters')
		.max(32, "Password can't contain more than 32 characters"),
	passwordConfirmation: z.string()
})

export { z }

export const zUser = {
	create: zUserCreate,
	createRefined: zUserCreate.refine((arg) => {
		return arg.password === arg.passwordConfirmation
	}, "Password does't match")
}
