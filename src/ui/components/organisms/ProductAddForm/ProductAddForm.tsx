'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRef, ElementRef, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';

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
import { Button } from '@/ui/components/atoms/Button';
import { HelperText } from '@/ui/components/atoms/HelperText';
import { FormValues, schema } from './schema';
import { addProductAction } from './actions';

type FormState = Awaited<ReturnType<typeof addProductAction>>;

export const ProductAddForm = () => {
	const router = useRouter();

	const formRef = useRef<ElementRef<'form'>>(null);
	const [formState, formAction] = useFormState<FormState, FormData>(addProductAction, {
		message: '',
	});
	const [pending, startTransaction] = useTransition();

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

	useEffect(() => {
		if (formState.data) {
			router.push('/admin/products');
		}
	}, [formState.data, router]);

	return (
		<Form {...form}>
			<form
				ref={formRef}
				onSubmit={(evt) => {
					evt.preventDefault();

					form.handleSubmit(() => {
						startTransaction(() => formAction(new FormData(formRef.current!)));
					})(evt);
				}}
				className="space-y-8"
			>
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
				<Button disabled={pending} type="submit">
					{pending ? 'Saving....' : 'Save'}
				</Button>

				{formState.errors && (
					<HelperText className="my-4 text-center" variant="error">
						<b>Server Error: </b>
						{formState.message}
					</HelperText>
				)}
			</form>
		</Form>
	);
};
