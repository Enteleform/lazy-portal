//###  NPM  ###//
import {expect as _expect} from "expect"


//####################################################################################################################//
//##>  Initialize                                                                                                   ##//
//####################################################################################################################//

	_expect.extend({

		toBeTrueRecord  (record){return expect_BooleanRecord({record, booleanValue:true,  strict:true })},
		toBeFalseRecord (record){return expect_BooleanRecord({record, booleanValue:false, strict:true })},

		toBeTruthyRecord(record){return expect_BooleanRecord({record, booleanValue:true,  strict:false})},
		toBeFalsyRecord (record){return expect_BooleanRecord({record, booleanValue:false, strict:false})},

	})


//####################################################################################################################//
//##>  Utilities                                                                                                    ##//
//####################################################################################################################//

	function expect_BooleanRecord(
		{record,                         booleanValue,         strict        }:
		{record:Record<string, boolean>, booleanValue:boolean, strict:boolean}
	){
		const actual   = {}
		const expected = {}

		Object.entries(record).forEach(([key, value], i)=>{
			const indexedKey = `[${i + 1}] ${key}`

			actual  [indexedKey] = ((strict) ? value : Boolean(value))
			expected[indexedKey] = booleanValue
		})

		let _error: Error

		try
			{_expect(actual).toEqual(expected)}
		catch(error)
			{_error = error}

		return {
			pass:    !_error,
			message: (() => _error.message),
		}
	}
