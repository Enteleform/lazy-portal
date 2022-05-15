/** @jsxImportSource react */

//###  Reference  ###//
// https://www.framer.com/docs/examples/#keyframes

//###  NPM  ###//
import {motion} from "framer-motion"
import NoSSR    from "react-no-ssr"



//####################################################################################################################//
//##>  Setup                                                                                                        ##//
//####################################################################################################################//

	const duration        = 2.3
	const frameworkCount  = 4
	const delayMultiplier = 1.5

	const borderRadius = ["3%", "50%", "3%"]
	const scale        = [1,    1.7,   1   ]
	const times        = [0,    0.5,   1   ]


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function React_FramerMotion(props:React_FramerMotion.Props){
		return (
			<motion.div
				className = "FRAMER-MOTION"
				style={{
					display:        "flex",
					alignItems:     "center",
					justifyContent: "center",
					overflow:       "hidden",
					width:          "150px",
					height:         "150px",
					borderRadius:   "30px",
				}}
				animate={{
					scale,
					borderRadius,
				}}
				transition={{
					times,
					duration,
					delay:       (((duration / frameworkCount) * props.offset) * delayMultiplier),
					ease:        "easeInOut",
					repeat:      Infinity,
					repeatDelay: ((duration / frameworkCount) * delayMultiplier),
				}}
			>
				<NoSSR>
					<portal-destination name={props.portalID}/>
				</NoSSR>
			</motion.div>
		)
	}

	export namespace React_FramerMotion{
		export type Props = {
			portalID: string
			offset:   number
		}
	}
