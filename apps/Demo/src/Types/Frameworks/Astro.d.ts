
declare module "*.astro"{

	export default function Component(
		props:       any,
		...children: any
	):
		Promise<string>

}
