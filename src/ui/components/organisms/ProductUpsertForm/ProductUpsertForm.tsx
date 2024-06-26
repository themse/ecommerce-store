'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';

import { Product } from '@prisma/client';
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
import { FilePreview } from '@/ui/components/molecules/FilePreview';
import { ImagePreview } from '@/ui/components/molecules/ImagePreview';
import { AddFormValues, UpdateFormValues, addSchema, updateSchema } from './schema';
import { addProductAction, updateProductAction } from './actions';

type FormState = Awaited<ReturnType<typeof addProductAction | typeof updateProductAction>>;

type Props = {
	product?: Product | null;
};

export const ProductUpsertForm = ({ product }: Props) => {
	// Add or Update strategy
	const schema = product ? updateSchema : addSchema;
	const action = product ? updateProductAction.bind(null, product.id) : addProductAction;

	// Form
	const [formState, formAction] = useFormState<FormState, FormData>(action, {
		message: '',
	});

	const form = useForm<AddFormValues | UpdateFormValues>({
		mode: 'onChange',
		resolver: zodResolver(schema),
		defaultValues: {
			name: product?.name ?? '',
			priceInCents: product?.priceInCents.toString() ?? '',
			description: product?.description ?? '',
		},
	});

	function onSubmit() {
		const { name, priceInCents, description, file, image } = form.getValues();

		const formData = new FormData();
		formData.append('name', name);
		formData.append('priceInCents', priceInCents);
		formData.append('description', description);

		file && formData.append('file', file);
		image && formData.append('image', image);

		formAction(formData);
	}

	return (
		<Form {...form}>
			<form
				action={formAction}
				onSubmit={(evt) => {
					evt.preventDefault();

					form.handleSubmit(onSubmit)(evt);
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
					name="file"
					render={({ field, fieldState }) => {
						const fileName = field?.value?.name ?? product?.filePath.split('/').pop();

						return (
							<FormItem>
								<FormLabel>File</FormLabel>
								<FormControl>
									<Input
										ref={field.ref}
										type="file"
										onChange={(event) => field.onChange(event.target.files?.[0])}
									/>
								</FormControl>
								<FormMessage />
								{!fieldState.error && fileName && <FilePreview fileName={fileName} />}
							</FormItem>
						);
					}}
				/>

				<FormField
					control={form.control}
					name="image"
					render={({ field, fieldState }) => {
						const file = field.value;
						let source: File | string | undefined = product?.imagePath;

						if (file) {
							source = file;
						}

						return (
							<FormItem>
								<FormLabel>Image</FormLabel>
								<FormControl>
									<Input
										ref={field.ref}
										type="file"
										onChange={(event) => field.onChange(event.target.files?.[0])}
									/>
								</FormControl>
								<FormMessage />
								{!fieldState.error && source && <ImagePreview className="max-w-96" file={source} />}
							</FormItem>
						);
					}}
				/>

				<Button type="submit">Save</Button>

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
