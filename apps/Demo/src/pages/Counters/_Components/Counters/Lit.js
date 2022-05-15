//###  App  ###//
import {Log} from "Utilities/Log"

//###  NPM  ###//
import {LitElement, html} from "lit"


//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//

	export const tagName = "lit-counter"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	class Counter extends LitElement{
		static get properties(){
			return {
				count: {type:Number},
			}
		}

		constructor(){
			super()
			this.count = 0
		}

		decrement(){Log.Update("Lit.Counter");  this.count--;}
		increment(){Log.Update("Lit.Counter");  this.count++;}

		render(){
			return html`
				<link rel="stylesheet" href="/Styles/Counter.css">


				<div class="Counter Lit">

					<div class="Logo">
						<slot/>
					</div>

					<div class="Controls">
						<button class="Decrement" @click=${this.decrement}>
							{"-"}
						</button>

						<div class="Count">
							${this.count}
						</div>

						<button class="Increment" @click=${this.increment}>
							{"+"}
						</button>
					</div>

				</div>
			`
		}
	}


//####################################################################################################################//
//##>  Initialize                                                                                                   ##//
//####################################################################################################################//

	customElements.define(tagName, Counter)
