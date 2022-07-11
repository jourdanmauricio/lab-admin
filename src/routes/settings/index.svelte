<script>
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
    <h2>Third panel</h2>
  </TabPanel>

  <TabPanel>
    <ConfML />
  </TabPanel>
</Tabs>
