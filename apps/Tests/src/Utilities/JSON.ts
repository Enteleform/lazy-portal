
//####################################################################################################################//
//##>  Exports.Public.Namespace                                                                                     ##//
//####################################################################################################################//

//###  TODO  ###//
// This implementation was found on a current TypeScript
//   feature request to add an official JSON type.
// Remove this file & refactor implementations when issue closed:
//   https://github.com/microsoft/TypeScript/issues/1897

//###  Reference: https://github.com/microsoft/TypeScript/issues/1897#issuecomment-580962081  ###//
export namespace Json{
	export type Object<ExtendedValue = null> = {[key:string]: Json.Value<ExtendedValue>}
	export type Array<ExtendedValue = null>  = readonly Json.Value<ExtendedValue>[]

	export type Value<ExtendedValue = null> =
		| null
		| undefined
		| boolean
		| number
		| string
		| Json.Object<ExtendedValue>
		| Json.Array <ExtendedValue>
		| ExtendedValue
}
