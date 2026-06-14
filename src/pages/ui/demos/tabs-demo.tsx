import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../../ui/composites/tabs';

export function TabsDemo() {
  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>
            Askr uses actor-backed reactivity for fine-grained updates without a
            virtual DOM.
          </p>
        </TabsContent>
        <TabsContent value="usage">
          <p>
            Import components from <code>/ui</code> and use them with{' '}
            <code>state()</code> for interactivity.
          </p>
        </TabsContent>
        <TabsContent value="api">
          <p>
            Each component exports types, a11y contracts, and supports{' '}
            <code>asChild</code> for polymorphism.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
