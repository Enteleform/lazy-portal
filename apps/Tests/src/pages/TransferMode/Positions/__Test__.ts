//###  App  ###//
import {DOM_Environment} from "Utilities/Test/Server/Utilities"


//####################################################################################################################//
//##>  Test                                                                                                         ##//
//####################################################################################################################//

	DOM_Environment.Test({group:"TransferMode", name:"Positions", url:"/TransferMode/Positions"}, (async ({dom}) => {

		//----------------------------------------------------------------------------------------------------------------//
		//  [Assert] Single                                                                                               //
		//----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U}) => await U.Positions.set_Destination()                                             )
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1", position:undefined}], result:["1"]}))
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1", position:"First"  }], result:["1"]}))
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1", position:"Last"   }], result:["1"]}))
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1", position:0        }], result:["1"]}))
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1", position:1        }], result:["1"]}))

    //----------------------------------------------------------------------------------------------------------------//
    //  [Assert] Multiple.defaultPosition                                                                             //
    //----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U}) => await U.Positions.set_Destination()                                                           )
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"3"}], result:["1", "2", "3"]}))

			await dom.evaluate(async ({U}) => await U.Positions.set_Destination({defaultPosition:"Last"})                                   )
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"3"}], result:["1", "2", "3"]}))

			await dom.evaluate(async ({U}) => await U.Positions.set_Destination({defaultPosition:"First"})                                  )
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"3"}], result:["3", "2", "1"]}))

    //----------------------------------------------------------------------------------------------------------------//
    //  [Assert] Multiple.StaticPosition                                                                              //
    //----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U}) => await U.Positions.set_Destination()                                                                                          )
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"First", position:"First"  }], result:["First", "1", "2"   ]}))
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"Last",  position:"Last"   }], result:["1",     "2", "Last"]}))

    //----------------------------------------------------------------------------------------------------------------//
    //  [Assert] Multiple.IndexPosition                                                                               //
    //----------------------------------------------------------------------------------------------------------------//

			await dom.evaluate(async ({U}) => await U.Positions.set_Destination()                                                                                                            )
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"3"}, {text:"Index", position:0}], result:["Index", "1",     "2",     "3"    ]}))
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"3"}, {text:"Index", position:1}], result:["1",     "Index", "2",     "3"    ]}))
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"3"}, {text:"Index", position:2}], result:["1",     "2",     "Index", "3"    ]}))
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"3"}, {text:"Index", position:3}], result:["1",     "2",     "3",     "Index"]}))
			await dom.assert  (async ({U}) => await U.Positions.assert({setup:[{text:"1"}, {text:"2"}, {text:"3"}, {text:"Index", position:4}], result:["1",     "2",     "3",     "Index"]}))

	}))
