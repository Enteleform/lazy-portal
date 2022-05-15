
//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Class{

		export function to_Selector(cls:string)
			{return ("." + cls.split(" ").join("."))}

		export function remove_Pattern(
			{element, pattern}:
			Options.remove_Pattern
		){
			if(!element)
				{return}

			element.className =
				element.className.replace(
					//           entire       middle           start            end
					new RegExp(`(^${pattern}$| ${pattern}(?= )|^${pattern}(?= )|(?<= )${pattern}$)`, "g"),
					"",
				)
		}

		export function RegEx_List(
			{entries,          prefix,         suffix       }:
			{entries:string[], prefix?:string, suffix?:string}
		){
			return (""
				+ (prefix ?? "")
				+ "(?:" + entries.join("|") + ")"
				+ (suffix ?? "")
			)
		}

	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	namespace Options{
		export type remove_Pattern = {
			/** Target Element. */
			element?: HTMLElement
			/** RegEx pattern, as `string`, to be interpolated within `RegExp`. */
			pattern: string
		}
	}
