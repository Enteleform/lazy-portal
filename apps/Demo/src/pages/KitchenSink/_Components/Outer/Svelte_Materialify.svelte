<!--###  Reference:  ###-->
<!-- https://svelte-materialify.vercel.app/components/tabs/#fixed-tabs -->



<script>

	//###  NPM  ###//
	import {Tabs, Tab, TabContent, MaterialApp} from "svelte-materialify"

</script>



<MaterialApp theme="dark">

	<Tabs class="indigo" right>
		<div class="TAB-BUTTONS" slot="tabs" right>
			<Tab> Mixed-ComponentLibs </Tab>
			<Tab> Mixed-FramerMotion  </Tab>
			<Tab> Astro-Markdown      </Tab>
			<Tab> React-ThreeFiber    </Tab>
			<Tab> Solid-Lume          </Tab>
			<Tab> Nested-Frameworks   </Tab>
		</div>

		<TabContent class="TAB-PANEL"> <portal-destination name="Mixed-ComponentLibraries"/> </TabContent>
		<TabContent class="TAB-PANEL"> <portal-destination name="Mixed-FramerMotion"      /> </TabContent>
		<TabContent class="TAB-PANEL"> <portal-destination name="Astro-Markdown"          /> </TabContent>
		<TabContent class="TAB-PANEL"> <portal-destination name="React-ThreeFiber"        /> </TabContent>
		<TabContent class="TAB-PANEL"> <portal-destination name="Solid-Lume"              /> </TabContent>
		<TabContent class="TAB-PANEL"> <portal-destination name="Nested-Frameworks"       /> </TabContent>
	</Tabs>

</MaterialApp>
