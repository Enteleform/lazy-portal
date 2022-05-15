<!--###  Reference:  ###-->
<!-- https://svelte-materialify.vercel.app/components/navigation-drawer/#colored-drawer -->



<script>

  //###  NPM  ###//
  import {NavigationDrawer, List, ListItem, Button, Icon, MaterialApp} from "svelte-materialify"
  import {mdiViewDashboard, mdiAccountBox, mdiGavel                  } from "@mdi/js"

</script>



<MaterialApp theme="dark">

	<div class="d-flex justify-center">
		<NavigationDrawer class="theme--dark">

			<List>
				<ListItem> <span slot="prepend"> <Icon path={mdiViewDashboard}/> </span> Dashboard </ListItem>
				<ListItem> <span slot="prepend"> <Icon path={mdiAccountBox   }/> </span> Account   </ListItem>
				<ListItem> <span slot="prepend"> <Icon path={mdiGavel        }/> </span> Admin     </ListItem>
			</List>

			<span slot="append" class="pa-2">
				<Button block class="Logout">
					Logout
				</Button>
			</span>

		</NavigationDrawer>
	</div>

</MaterialApp>
