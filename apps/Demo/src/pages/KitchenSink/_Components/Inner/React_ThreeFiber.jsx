/** @jsxImportSource react */

//###  Reference  ###//
// [`Basic demo`, `Mixing controls`] @ https://docs.pmnd.rs/react-three-fiber/getting-started/examples#basic-examples
// https://www.reddit.com/r/threejs/comments/l63kgm/comment/gl7jug0

//###  NPM  ###//
import {useRef,useEffect, useState} from "react"
import {Canvas, useFrame          } from "@react-three/fiber"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function React_ThreeFiber() {
		return (
			<Canvas>
				<ambientLight intensity={0.5}/>
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
				<pointLight position={[-10, -10, -10]}/>
				<Box position={[-1.5, 0, 0]} rotate={0.01 } invert={true }/>
				<Box position={[1.5,  0, 0]} rotate={-0.01} invert={false}/>
			</Canvas>
		)
	}


//####################################################################################################################//
//##>  Components                                                                                                   ##//
//####################################################################################################################//

	function Box(props) {
		const ref              = useRef()
		const [hovered, hover] = useState(false)
		const [clicked, click] = useState(false)

		useFrame((state, delta) => {
			ref.current.rotation.x += props.rotate
			ref.current.rotation.y += (props.rotate * 0.1)
		})

		useEffect(() => {
			document.body.style.cursor = hovered ? 'pointer' : 'auto'
		}, [hovered])

		return (
			<mesh
				{...props}
				ref={ref}
				scale={clicked ? 1.5 : 1}
				onClick={(event) => click(!clicked)}
				onPointerOver={(event) => hover(true)}
				onPointerOut={(event) => hover(false)}>
				<boxGeometry args={[1, 1, 1]}/>
				<meshNormalMaterial wireframe={hovered}/>
			</mesh>
		)
	}
