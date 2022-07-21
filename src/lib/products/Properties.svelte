<script>
  import Features from "./Features.svelte";
  import Tabs from "../../helpers/tabs/Tabs.svelte";
  import TabList from "../../helpers/tabs/TabList.svelte";
  import Tab from "../../helpers/tabs/Tab.svelte";
  import TabPanel from "../../helpers/tabs/TabPanel.svelte";
  import Description from "./Description.svelte";
  import Pictures from "./Pictures.svelte";
  import Attributes from "./Attributes.svelte";
  import Variations from "./Variations.svelte";
  import { onMount } from "svelte";

  export let category;

  onMount(() => {
    console.log("Category", category);
  });
</script>

<div class="mt-6">
  <Tabs>
    <TabList>
      <Tab>Atributos</Tab>
      <Tab>Cacterísticas</Tab>
      <Tab>Descripción</Tab>
    </TabList>

    <TabPanel>
      <Attributes {category} />
    </TabPanel>

    <TabPanel>
      <Features />
    </TabPanel>

    <TabPanel>
      <Description />
    </TabPanel>
  </Tabs>
</div>
