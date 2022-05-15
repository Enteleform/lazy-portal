/** @jsxImportSource solid-js */

//###  Framework  ###//
import type {Portal} from "lazy-portal"

//###  NPM  ###//
import {createSignal, ErrorBoundary, For, PropsWithChildren} from "solid-js"


//####################################################################################################################//
//##>  Aliases                                                                                                      ##//
//####################################################################################################################//

	type Position = Portal.Props.Entrance["position"]


//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//

	namespace Entries{
		export const [Single,   set_Single  ] = createSignal<Entry.Single  []>([])
		export const [Multiple, set_Multiple] = createSignal<Entry.Multiple[]>([])
	}

	const [currentIndex, set_CurrentIndex] = createSignal<number>()


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Modes(){

		return (<>
			<div class="Modes">
				<Container.Single  > <portal-destination name="Single"   transfer-mode="Single"  /> </Container.Single  >
				<Container.Multiple> <portal-destination name="Multiple" transfer-mode="Multiple"/> </Container.Multiple>
			</div>

			<Entrances.Single  />
			<Entrances.Multiple/>
		</>)

	}


//####################################################################################################################//
//##>  Types                                                                                                        ##//
//####################################################################################################################//

	namespace Entry{
		export type Single   = {name:number,                  }
		export type Multiple = {name:number, position:Position}
	}


//####################################################################################################################//
//##>  Components.Container                                                                                         ##//
//####################################################################################################################//

	namespace Container{

		export function Single(props:PropsWithChildren){
			function add(){
				const entries = Entries.Single()
				Entries.set_Single([
					...entries,
					{name:(entries.length + 1)},
				])
			}

			return (
				<div class="Container Single">

					<div class="Title">
						<p>{`<portal-destination`     }</p>   {/* [ISSUE.31] remove  when fixed */}
						<p>{`\ttransfer-mode="Single"`}</p>   {/* [ISSUE.31] remove  when fixed */}
						<p>{`/>`                      }</p>   {/* [ISSUE.31] remove  when fixed */}
						{/*{`<portal-destination\n`     }*/}  {/* [ISSUE.31] restore when fixed */}
						{/*{`  transfer-mode="Single"\n`}*/}  {/* [ISSUE.31] restore when fixed */}
						{/*{`/>`                        }*/}  {/* [ISSUE.31] restore when fixed */}
					</div>

					<div class="Controls">
						<button onClick={add}> {"+"} </button>
						<div/>
						<div/>
					</div>

					<div class="Entries">
						{props.children}
					</div>

					<ul class="Description">
						<li> First <code>{"<portal-entrance/>"}</code> will render.                 </li>
						<li> Subsequent <code>{"<portal-entrance/>"}</code>s will trigger an error. </li>
					</ul>

				</div>
			)
		}

		export function Multiple(props:PropsWithChildren){
			function add(position:Position){
				return function(){
					const entries = Entries.Multiple()

					Entries.set_Multiple([
						...entries,
						{name:(entries.length + 1), position},
					])

					set_CurrentIndex(entries.length)
				}
			}

			return (
				<div class="Container Multiple">

					<div class="Title">
						<p>{`<portal-destination`       }</p>   {/* [ISSUE.31] remove  when fixed */}
						<p>{`\ttransfer-mode="Multiple"`}</p>   {/* [ISSUE.31] remove  when fixed */}
						<p>{`/>`                        }</p>   {/* [ISSUE.31] remove  when fixed */}
						{/*{`<portal-destination\n`       }*/}  {/* [ISSUE.31] restore when fixed */}
						{/*{`  transfer-mode="Multiple"\n`}*/}  {/* [ISSUE.31] restore when fixed */}
						{/*{`/>`                          }*/}  {/* [ISSUE.31] restore when fixed */}
					</div>

					<div class="Controls">
						<button onClick={add("First")}> {"+ First"} </button>
						<button onClick={add("Last" )}> {"+ Last" } </button>
						<button onClick={add(3      )}> {"+ @3"   } </button>
					</div>

					<div class="Entries">
						{props.children}
					</div>

					<ul class="Description">
						<li> All <code>{"<portal-entrance/>"}</code>s will render. </li>
					</ul>

				</div>
			)
		}

	}


//####################################################################################################################//
//##>  Components.Entrances                                                                                         ##//
//####################################################################################################################//

	namespace Entrances{

		export function Single(){
			return (
				<For each={Entries.Single()}>{(entry) => (

					<ErrorBoundary fallback={() => <></>}>
						<portal-entrance to="Single">
							<div class="Entry">
								{entry.name}
							</div>
						</portal-entrance>
					</ErrorBoundary>


				)}</For>
			)
		}

		export function Multiple(){
			return (
				<For each={Entries.Multiple()}>{(entry, i) => (

					<portal-entrance
						to       = {"Multiple"              }
						name     = {`Multiple-${entry.name}`}
						position = {entry.position          }
					>
						<div classList={{
							Entry:        true,
							CurrentIndex: (currentIndex() === i()),
						}}>
							{entry.name}
						</div>
					</portal-entrance>

				)}</For>
			)
		}

	}
