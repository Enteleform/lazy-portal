
	interface CustomMatchers<R = unknown>{
		toBeTrueRecord  (): R
		toBeFalseRecord (): R
		toBeTruthyRecord(): R
		toBeFalsyRecord (): R
	}

	declare global {
		namespace jest {
			interface Expect                    extends CustomMatchers   {}
			interface Matchers<R>               extends CustomMatchers<R>{}
			interface InverseAsymmetricMatchers extends CustomMatchers   {}
		}
	}
