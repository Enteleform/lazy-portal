//###  App  ###//
import {Logger} from "./Logger"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export namespace Log.Loggers{
		export const Mount  = Logger({name:"Mount",  level:"silent"})  /* [ISSUE.24] set to "silent" when fixed */
		export const Update = Logger({name:"Update", level:"silent"})  /* [ISSUE.24] set to "silent" when fixed */
	}

	export namespace Log{
		export const Mount  = Loggers.Mount ({prefix:"Component.Mount",  level:"silent"})
		export const Update = Loggers.Update({prefix:"Component.Update", level:"silent"})
	}
