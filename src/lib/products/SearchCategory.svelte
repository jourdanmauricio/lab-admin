<script>
  import CatArbol from "./CatArbol.svelte";
  import CatPredictor from "./CatPredictor.svelte";
  import CatUsed from "./CatUsed.svelte";
  import { Tabs, TabList, TabPanel, Tab } from "./../../helpers/tabs/tabs";

  export let hideModalSearchCat;
</script>

<div class="w-full">
  <Tabs>
    <TabList>
      <Tab>Más utilizadas</Tab>
      <Tab>Predictor</Tab>
      <Tab>Árbol</Tab>
    </TabList>

    <TabPanel>
      <CatUsed {hideModalSearchCat} />
    </TabPanel>

    <TabPanel>
      <CatPredictor {hideModalSearchCat} />
    </TabPanel>

    <TabPanel>
      <CatArbol {hideModalSearchCat} />
    </TabPanel>
  </Tabs>
</div>
