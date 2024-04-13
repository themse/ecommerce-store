export class Adapter<TSource> {
	private value: TSource;

	private constructor(value: TSource) {
		this.value = value;
	}

	public static from<TSource>(originData: TSource): Adapter<TSource> {
		return new Adapter<TSource>(originData);
	}

	public to<TOutput>(mapperFn: (value: TSource) => TOutput): TOutput {
		return mapperFn(this.value);
	}
}
