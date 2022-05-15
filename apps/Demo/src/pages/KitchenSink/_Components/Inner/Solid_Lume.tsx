/** @jsxImportSource solid-js */

//###  Reference:  ###//
// https://docs.lume.io/#/examples/spiral

//###  App  ###//
import "./Solid_Lume.scss"
import {ShowWhenVisible} from "Utilities/Solid"

//###  NPM  ###//
import * as Lume from "lume"
import {
	createEffect,
	createSignal,
	For,
	onCleanup,
	onMount,
	Show,
} from "solid-js"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Solid_Lume(){
		let $Rotator:    Lume.Node
		let offsetTimer: NodeJS.Timer

		const hueDistance     = 4
		const hueSpeed        = 4
		const laneDistance    = 2.5
		const nodeMinDistance = 50
		const nodeMaxDistance = 100
		const nodeMinOffset   = -0.3  // {[-0.85]:SpiralEnd,   [-0.3]:Match@InterestingStartingPoint}
		const nodeMaxOffset   = 1.6   // {[3.9  ]:SpiralStart, [1.6 ]:InterestingStartingPoint      }
		const size            = 80

		let rotationSpeed  = -0.2
		let nodeSpeed      = (rotationSpeed / 100)
		let offsetInterval = 55

		const values = Array(size).fill(null).map((_, i) => i)

		const [isMounted,  set_IsMounted ] = createSignal(false        )
		const [hueOffset,  set_HueOffset ] = createSignal(1            )
		const [nodeOffset, set_NodeOffset] = createSignal(nodeMaxOffset)

		const nodeDistance = ()=>(
			(Math.sin(nodeOffset()) * ((nodeMaxDistance - nodeMinDistance)) + nodeMinDistance)
		)

		const reverse_At_Limits = ()=>{
			const offset = nodeOffset()
			if((offset <= nodeMinOffset) || (offset >= nodeMaxOffset)){
				rotationSpeed = -rotationSpeed
				nodeSpeed     = -nodeSpeed
			}
		}

		onMount(()=>{
			Lume.useDefaultNames()
		})

		onCleanup(()=>{
			clearInterval(offsetTimer)
		})

		createEffect(()=>{
			if(isMounted()){
				$Rotator.rotation = (x, y, z) => [x, y, (z + rotationSpeed)]

				offsetTimer = setInterval(()=>{
					set_HueOffset (hueOffset () + hueSpeed )
					set_NodeOffset(nodeOffset() + nodeSpeed)
					reverse_At_Limits()
				}, offsetInterval)
			}
		})

		return (<>
			<ShowWhenVisible>
				{()=>{
					setTimeout(()=>{
						set_IsMounted(true)
					}, 500)
					return null
				}}

				<Show when={!isMounted()}>
					<div class="SPINNER"/>
				</Show>

				<div class="Lume Container">
					<lume-scene>
						<lume-node
							ref         = {$Rotator     }
							size        = {"1000,  1000"}
							align-point = {"0.5,  0.5"  }
							mount-point = {"0.5,  0.5"  }
							rotation    = {"0,  0,  0"  }
						>
							<lume-scene>
								<For each={values}>{(n) => (
									<lume-node
										size        = {"0,  0,  0"                    }
										align-point = {"0.5,  0.5"                    }
										rotation    = {`0,  0,  ${n * nodeDistance()}`}
									>
										<lume-node
											size        = {`${size - (n % size)},  ${size - (n % size)},  0`}
											mount-point = {"0.5,  0.5"                                      }
											position    = {`0,  ${n * laneDistance},  0`                    }
											style={{
												"background":    `hsla(${((n * hueDistance) + hueOffset()) % 360},  90%,  78%,  100%)`,
												"border-radius": `${100 - n - 30}%`,
											}}
										/>
									</lume-node>
								)}</For>
							</lume-scene>
						</lume-node>
					</lume-scene>
				</div>

			</ShowWhenVisible>
		</>)
	}
