<script>
  import ConfProd from "./../../lib/settings/ConfProd.svelte";
  import ConfML from "./../../lib/settings/ConfML.svelte";
  import Categories from "./../../lib/settings/Categories.svelte";
  import General from "./../../lib/settings/General.svelte";
  import { Tabs, TabList, TabPanel, Tab } from "./../../helpers/tabs/tabs";
</script>

<Tabs>
  <TabList>
    <Tab>General</Tab>
    <Tab>Categorías</Tab>
    <Tab>Productos</Tab>
    <Tab>ML</Tab>
  </TabList>

  <TabPanel>
    <General />
  </TabPanel>

  <TabPanel>
    <Categories />
  </TabPanel>

  <TabPanel>
    <ConfProd />
  </TabPanel>

  <TabPanel>
    <ConfML />
  </TabPanel>
</Tabs>
