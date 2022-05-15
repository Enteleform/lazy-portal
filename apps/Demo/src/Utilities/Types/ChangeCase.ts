
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace ChangeCase{

		export type Snake_To_Kebab<T extends string> = Replace<T, "_", "-">
		export type Kebab_To_Snake<T extends string> = Replace<T, "-", "_">

		export type Replace<
			Input      extends string,
			From       extends string,
			To         extends string,
			_Processed extends string = "",
		> =
			string extends Input
				? string
				: Input extends `${infer First}${infer Rest}`
					? Replace<
						Rest,
						From,
						To,
						`${_Processed}${ReplaceMatch<First, From, To>}`
					>
					: _Processed

	}


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	type ReplaceMatch<
		Match extends string,
		From  extends string,
		To    extends string,
	> =
		Match extends From
		? To
		: Match
