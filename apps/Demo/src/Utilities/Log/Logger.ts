//###  NPM  ###//
import type {Logger as _Logger} from "pino"

//###  NPM  ###//
import pino from "pino"
import type {LoggerOptions} from "pino"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export type Logger =
		& Omit<_Logger, "level">
		& {level:LogLevel}

	export function Logger(options:LoggerOptions){
		const _logger = pino(options)

		return function make_SubLogger(
			{prefix,        level         }:
			{prefix:string, level:LogLevel}
		){
			return function log(message:string, data?:object){
				if     (level === "silent"){return                                           }
				else if(data              ){_logger[level](`[${prefix}] ${message} %o`, data)}
				else                       {_logger[level](`[${prefix}] ${message}`         )}
			}
		}
	}

	export namespace Logger{
		export type Parameters = globalThis.Parameters<Logger["info"]>
	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	type LogLevel =
		| "debug"
		| "error"
		| "fatal"
		| "info"
		| "silent"
		| "trace"
		| "warn"
