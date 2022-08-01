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
  import { product } from "../../store/stores";
</script>

<div class="mt-6">
  <Tabs>
    <TabList>
      <Tab>Variaciones</Tab>
      <Tab>Atributos</Tab>
      <Tab>Cacterísticas</Tab>
      <Tab>Descripción</Tab>
      {#if $product.variations.length === 0}
        <Tab>Imágenes</Tab>
      {/if}
    </TabList>

    <TabPanel>
      <Variations />
    </TabPanel>

    <TabPanel>
      <!-- <Attributes {category} /> -->
      <Attributes />
    </TabPanel>

    <TabPanel>
      <Features />
    </TabPanel>

    <TabPanel>
      <Description />
    </TabPanel>

    {#if $product.variations.length === 0}
      <TabPanel>
        <Pictures />
      </TabPanel>
    {/if}
  </Tabs>
</div>
