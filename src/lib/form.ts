import { writable } from 'svelte/store';
import type { ZodError, ZodIssue } from 'zod';

type Field<T extends string> = {
	value: T;
	isDirty: boolean;
	errors: string[];
};

type Options<T> = {
	value: T;
	schema?: {
		safeParse: (v: T) => {
			success: boolean;
			error?: ZodError;
		};
	};
};

type RField = ReturnType<typeof createField>;
export const createField = <T extends string>({ value, schema }: Options<T>) => {
	const field = writable<Field<T>>({
		value,
		errors: [],
		isDirty: false
	});

	const _validate = (value: T) => {
		return {
			value,
			isDirty: true,
			errors: schema
				? (schema.safeParse(value).error?.issues || []).map((issue: ZodIssue) => issue.message)
				: []
		};
	};

	const onChange = (e: Event) => {
		field.set(_validate((e.target as HTMLInputElement).value as T));
	};

	const validate = async (): Promise<boolean> => {
		return new Promise((resolve) => {
			field.update(($field) => {
				const field = _validate($field.value);
				resolve(!field.errors.length);
				return field;
			});
		});
	};

	return {
		validate,
		onChange,
		set: field.set,
		update: field.update,
		subscribe: field.subscribe
	};
};

export const createForm = () => {
	const fields: RField[] = [];
	return {
		register(field: RField) {
			if (!fields.includes(field)) {
				fields.push(field);
			}
		},
		async validate() {
			return (
				await Promise.all(
					fields.map(async (field) => {
						return await field.validate();
					})
				)
			).every(Boolean);
		}
	};
};
