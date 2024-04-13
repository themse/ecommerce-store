'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/components/atoms/Button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/components/molecules/Form';
import { Input } from '@/ui/components/atoms/Input';
import { formatCurrency } from '@/utils/formatters';
import { Textarea } from '@/ui/components/atoms/Textarea';
import { FormValues, schema } from './schema';
import { addProductAction } from './actions';

export const ProductAddForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			priceInCents: '',
			description: '',
		},
	});

	/**
	 * In React, an <input type="file" /> is always an uncontrolled component
	 * because its value can only be set by a user, and not programmatically.
	 * read more in docs: https://legacy.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
	 */
	const fileRef = form.register('file');
	const imageRef = form.register('image');

	async function onSubmit({ name, priceInCents, description, file, image }: FormValues) {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('priceInCents', priceInCents);
		formData.append('description', description);
		formData.append('file', file![0]);
		formData.append('image', image![0]);

		return addProductAction(formData);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Enter product name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="priceInCents"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price In Cents</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Enter price in cents" {...field} />
							</FormControl>
							<FormDescription>{formatCurrency((Number(field.value) || 0) / 100)}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder="Enter product description" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="file"
					render={() => (
						<FormItem>
							<FormLabel>File</FormLabel>
							<FormControl>
								<Input type="file" {...fileRef} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={() => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							<FormControl>
								<Input type="file" {...imageRef} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Save</Button>
			</form>
		</Form>
	);
};
