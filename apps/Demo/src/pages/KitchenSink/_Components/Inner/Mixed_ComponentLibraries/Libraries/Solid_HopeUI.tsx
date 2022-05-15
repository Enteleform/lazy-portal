/** @jsxImportSource solid-js */

//###  Reference  ###//
// https://hope-ui.com/docs/overlay/drawer

//###  App  ###//
import {ShowWhenVisible} from "Utilities/Solid"

//###  NPM  ###//
import {
	Button,
	createDisclosure,
	Center,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	HopeProvider,
	Input,
} from "@hope-ui/solid"


//####################################################################################################################//
//##>  Exports                                                                                                      ##//
//####################################################################################################################//

	export function Solid_HopeUI(){
		const {isOpen, onOpen, onClose} = createDisclosure()

		return (
			<ShowWhenVisible>
				<HopeProvider config={{initialColorMode:"dark"}} enableCssReset={false}>

					<Center>
						<Button onClick={onOpen}>
							{"Open Drawer"}
						</Button>
					</Center>

					<Drawer
						opened    = {isOpen()}
						placement = {"right" }
						onClose   = {onClose }
					>

						<DrawerOverlay/>

						<DrawerContent>

							<DrawerCloseButton/>
							<DrawerHeader>Create your account</DrawerHeader>

							<DrawerBody>
								<Input placeholder="Type here..."/>
							</DrawerBody>

							<DrawerFooter>
								<Button variant="outline" mr="$3" onClick={onClose}>
									Open
								</Button>
								<Button onClick={onClose}>
									Save
								</Button>
							</DrawerFooter>

						</DrawerContent>

					</Drawer>

				</HopeProvider>
			</ShowWhenVisible>
		)
	}
