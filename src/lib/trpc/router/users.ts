import prisma from '$lib/prisma'

import { z, zUser } from '$lib/zod'
import { t } from '$lib/trpc/server'

export const users = t.router({
	list: t.procedure.query(async () => {
		return prisma.user.findMany({
			where: { deletedAt: null },
			orderBy: [{ createdAt: 'desc' }],
			include: {
				userRoles: {
					select: {
						role: {
							select: {
								name: true
							}
						}
					}
				}
			}
		})
	}),
	create: t.procedure.input(zUser.createRefined).mutation(async ({ input, ctx }) => {
		const role = await prisma.role.upsert({
			where: { name: 'USER' },
			update: {},
			create: { name: 'USER' }
		})

		const user = await prisma.user.create({
			data: {
				name: input.name,
				email: input.email,
				password: input.password
			}
		})

		await prisma.userRole.create({
			data: {
				roleId: role.id,
				userId: user.id
			}
		})

		return await prisma.user.findUnique({
			where: { id: user.id },
			include: {
				userRoles: {
					select: {
						role: {
							select: {
								name: true
							}
						}
					}
				}
			}
		})
	}),
	delete: t.procedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
		return prisma.user.update({
			where: { id: input.id },
			data: { deletedAt: new Date() }
		})
	})
})
