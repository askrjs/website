import type { DocsPageDefinition } from './types';

const cli = '@askrjs/cli@latest';

// Hand-written examples for routes where the generic topic example is not
// specific enough. Read by both the page renderer and the table of contents.
const routeExamples: Readonly<Record<string, string>> = {
  '/docs': `import { state } from '@askrjs/askr';
import { createSPA } from '@askrjs/askr/boot';
import { createRouteRegistry, route } from '@askrjs/askr/router';

function HomePage() {
  const [count, setCount] = state(0);
  return <button onClick={() => setCount((value) => value + 1)}>Count: {count()}</button>;
}

export const pageRegistry = createRouteRegistry(() => route('/', HomePage));

await createSPA({ root: '#app', registry: pageRegistry });`,
  '/docs/reference': `// Every public API is reached through a published entrypoint.
// Reaching into dist/ or src/ is not supported and will break on upgrade.
import { derive, state } from '@askrjs/askr';
import { createSPA } from '@askrjs/askr/boot';
import { createRouteRegistry } from '@askrjs/askr/router';
import { renderToString } from '@askrjs/askr/ssr';`,
  '/docs/reference/api': `// Reference pages list signatures exactly as the installed package
// declares them, so this is what you are matching against locally:
import { createRouteRegistry } from '@askrjs/askr/router';

// createRouteRegistry: (definition: RouteDefinition, options?: RouteRegistryOptions) => RouteRegistry
const pageRegistry = createRouteRegistry(() => {});`,
  '/docs/reference/package-map': `// Which package owns which concern, as an import block.
import { derive, state } from '@askrjs/askr';        // runtime: state and rendering
import { createRouteRegistry } from '@askrjs/askr/router'; // routing
import { Button } from '@askrjs/themes/components';  // styled components
import { Dialog } from '@askrjs/ui';                 // headless behavior
import { schema } from '@askrjs/schema';             // validation and OpenAPI
import { createServerApp } from '@askrjs/server';    // HTTP boundary`,
  '/docs/reference/glossary': `// The vocabulary on this page, as it appears in code.
const [count, setCount] = state(0);        // state: a mutable fact you own
const doubled = derive(() => count() * 2); // derived value: recomputed, never copied
const pageRegistry = createRouteRegistry(() => {
  route('/projects/{projectId}', ProjectPage); // route: a path plus its component
});`,
  '/docs/getting-started/first-application': `import { state } from '@askrjs/askr';
import { createRouteRegistry, route } from '@askrjs/askr/router';

function HomePage() {
  const [count, setCount] = state(0);
  return <button onClick={() => setCount((value) => value + 1)}>Count: {count()}</button>;
}

export const registry = createRouteRegistry(() => route('/', HomePage));`,
  '/docs/core-concepts/state-and-derived-values': `import { derive, state } from '@askrjs/askr';

export function OrderTotal() {
  const [quantity, setQuantity] = state(2);
  const [unitPrice] = state(12);
  const total = derive(() => quantity() * unitPrice());

  return <button onClick={() => setQuantity((value) => value + 1)}>Total: {total()}</button>;
}`,
  '/docs/routing/definitions-and-layouts': `const registry = createRouteRegistry(() => {
  group({ layout: AppLayout }, () => {
    route('/', HomePage);
    route('/projects/{projectId}', ProjectPage);
  });
});`,
  '/docs/data/queries-and-consistency': `const project = defineQuery({
  key: ({ id }: { id: string }) => 'project:' + id,
  fetch: ({ id, signal }) => api.projects.get(id, { signal }),
});

const result = createQuery(project, { id: projectId });`,
  '/docs/rendering/server-side-rendering': `const html = renderToString({
  registry,
  url: request.url,
});`,
  '/docs/server/request-binding': `router.post('/projects', async (context) => {
  const input = await context.bind<CreateProjectInput>();
  return created(await projects.create(input));
});`,
  '/docs/authentication/authorization': `route('/admin', AdminPage, {
  auth: requireUser(),
  policies: [({ auth }) =>
    auth.permissions.includes('admin') ? allow() : forbidden()],
});`,
  '/docs/http-contracts/schemas': `const project = schema.object({
  id: schema.string(),
  name: schema.string(),
});

project.jsonSchema;`,
  '/docs/charts/cartesian-marks': `const Plot = createPlot<ProjectRow>();

<Plot.Root data={rows} rowKey={(row) => row.id} label="Revenue by day">
  <Plot.Axis axis="x" />
  <Plot.Axis axis="y" />
  <Plot.Line x="createdAt" y="revenue" />
  <Plot.Point x="createdAt" y="revenue" />
</Plot.Root>`,
  '/docs/mcp/primitives': `const mcp = createMcpServer({ name: 'project-tools', version: '1.0.0' })
  .tool('lookup-project', { input: projectInput }, async (context, input) => {
    return { content: [{ type: 'text', text: await lookup(input.id) }] };
  });`,
  '/docs/tooling/create': `npx ${cli} create startkit my-app
npx ${cli} create --prompt "Authenticated operations dashboard"`,
};

export function routeExampleFor(route: string): string | undefined {
  return routeExamples[route];
}

export type UsageGuideDefinition = {
  /** Only set when there is something page-specific to say. */
  intro?: string;
  code: string;
};

function componentGuide(page: DocsPageDefinition): UsageGuideDefinition {
  const examples: readonly [RegExp, string][] = [
    [
      /^UI and Components$|Headless versus Themed|Composition and Accessibility|Theme Tokens|Customization/,
      `import { Button, ThemeScope, ThemeToggle } from '@askrjs/themes/components';

<ThemeScope defaultTheme="system" storageKey="app-theme">
  <Button>Save project</Button>
  <ThemeToggle aria-label="Change color theme" />
</ThemeScope>`,
    ],
    [
      /Structures|Portals and Layers|Focus and Dismissal|Interaction Policies/,
      `import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger } from '@askrjs/themes/components';

<Dialog>
  <DialogTrigger asChild><Button>Open settings</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Project settings</DialogTitle>
    <ProjectSettings />
  </DialogContent>
</Dialog>`,
    ],
    [
      /Collections|Controlled State/,
      `import { For, state } from '@askrjs/askr';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@askrjs/themes/components';

function ProjectStatusSelect() {
  const [status, setStatus] = state('active');
  return <Select value={status()} onValueChange={setStatus}>
    <SelectTrigger aria-label="Project status"><SelectValue /></SelectTrigger>
    <SelectContent>
      <For each={statuses} by={(item) => item.id}>
        {(item) => <SelectItem value={item.id}>{item.label}</SelectItem>}
      </For>
    </SelectContent>
  </Select>;
}`,
    ],
    [
      /ARIA and Ref Utilities|Icon Contract/,
      `import { Button, Input } from '@askrjs/themes/components';
import { SearchIcon } from '@askrjs/lucide';

<>
  <label htmlFor="project-search">Search projects</label>
  <Input id="project-search" name="query" />
  <Button aria-label="Run search"><SearchIcon aria-hidden="true" /></Button>
</>`,
    ],
    [
      /Combobox and Command/,
      `import { For } from '@askrjs/askr';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption } from '@askrjs/themes/components';

<Combobox value={owner()} onValueChange={setOwner}>
  <ComboboxInput aria-label="Project owner" />
  <ComboboxList>
    <For each={people} by={(person) => person.id}>
      {(person) => <ComboboxOption value={person.id}>{person.name}</ComboboxOption>}
    </For>
  </ComboboxList>
</Combobox>`,
    ],
    [
      /Calendar and Date Picker/,
      `import { DatePicker, DatePickerInput } from '@askrjs/themes/components';

<DatePicker value={dueDate()} onValueChange={setDueDate}>
  <DatePickerInput aria-label="Project due date" />
</DatePicker>`,
    ],
    [
      /Native Select and Input OTP/,
      `import { InputOTP, InputOTPGroup, InputOTPSlot, NativeSelect } from '@askrjs/themes/components';

<>
  <NativeSelect name="timezone" aria-label="Timezone">
    <option value="America/New_York">Eastern time</option>
  </NativeSelect>
  <InputOTP maxLength={6} value={code()} onValueChange={setCode}>
    <InputOTPGroup>{[0, 1, 2, 3, 4, 5].map((index) => <InputOTPSlot index={index} />)}</InputOTPGroup>
  </InputOTP>
</>`,
    ],
    [
      /^Tooltip$/,
      `import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@askrjs/themes/components';

<Tooltip>
  <TooltipTrigger asChild><Button aria-label="Archive project">Archive</Button></TooltipTrigger>
  <TooltipContent>Move this project to the archive</TooltipContent>
</Tooltip>`,
    ],
    [
      /^Sidebar$/,
      `import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@askrjs/themes/components';

<Sidebar>
  <SidebarContent>
    <SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarMenu><SidebarMenuItem><SidebarMenuButton active>Projects</SidebarMenuButton></SidebarMenuItem></SidebarMenu>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>`,
    ],
    [
      /Navbar and Navigation Menu/,
      `import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@askrjs/themes/components';

<NavigationMenu aria-label="Primary navigation">
  <NavigationMenuList>
    <NavigationMenuItem><NavigationMenuLink href={projectsRoute}>Projects</NavigationMenuLink></NavigationMenuItem>
    <NavigationMenuItem><NavigationMenuLink href={reportsRoute}>Reports</NavigationMenuLink></NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    ],
    [
      /Breadcrumb and Pagination/,
      `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@askrjs/themes/components';

<Breadcrumb aria-label="Breadcrumb">
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href={projectsRoute}>Projects</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>{project.name}</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    ],
    [
      /Scroll Area/,
      `import { For } from '@askrjs/askr';
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@askrjs/themes/components';

<ScrollArea>
  <ScrollAreaViewport class="activity-log">
    <For each={events} by={(event) => event.id}>
      {(event) => <ActivityRow event={event} />}
    </For>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar orientation="vertical"><ScrollAreaThumb /></ScrollAreaScrollbar>
</ScrollArea>`,
    ],
    [
      /Alert, Badge, Empty, Skeleton, Spinner, and Stat/,
      `import { Alert, AlertDescription, AlertTitle, Badge, Empty, EmptyDescription, EmptyTitle, Spinner } from '@askrjs/themes/components';

{query.pending ? <Spinner aria-label="Loading projects" /> :
 query.error ? <Alert variant="danger"><AlertTitle>Could not load projects</AlertTitle><AlertDescription>{query.error.message}</AlertDescription></Alert> :
 query.data.length === 0 ? <Empty><EmptyTitle>No projects</EmptyTitle><EmptyDescription>Create a project to get started.</EmptyDescription></Empty> :
 <Badge>{query.data.length} active</Badge>}`,
    ],
    [
      /Monaco Editor/,
      `import { MonacoEditor } from '@askrjs/monaco';

<MonacoEditor
  value={source()}
  language="typescript"
  onChange={(value) => setSource(value ?? '')}
  options={{ minimap: { enabled: false } }}
/>`,
    ],
    [
      /Icons and Logos|Lucide Gallery/,
      `import { GitHubLogo } from '@askrjs/logos';
import { SearchIcon } from '@askrjs/lucide';

<>
  <SearchIcon size={18} aria-hidden="true" />
  <a href={repositoryUrl}><GitHubLogo aria-label="GitHub repository" /></a>
</>`,
    ],
    [
      /^Integrations$/,
      `async function loadEditor() {
  const { MonacoEditor } = await import('@askrjs/monaco');
  return MonacoEditor;
}

// Call from the route or interaction that first needs the editor.
const Editor = await loadEditor();`,
    ],
    [
      /Button/,
      `import { Button, ButtonGroup } from '@askrjs/themes/components';

<ButtonGroup>
  <Button variant="outline" type="button">Cancel</Button>
  <Button type="submit">Save project</Button>
</ButtonGroup>`,
    ],
    [
      /Input|Textarea|Form, Label, Field/,
      `import { Button, Field, FieldHint, FieldLabel, Input } from '@askrjs/themes/components';

<Field>
  <FieldLabel htmlFor="project-name">Project name</FieldLabel>
  <Input id="project-name" name="name" required />
  <FieldHint>Shown to everyone in the workspace.</FieldHint>
  <Button type="submit">Save project</Button>
</Field>`,
    ],
    [
      /Checkbox/,
      `import { Checkbox, Field, FieldLabel } from '@askrjs/themes/components';

<Field>
  <Checkbox id="email-updates" checked={enabled()} onCheckedChange={setEnabled} />
  <FieldLabel htmlFor="email-updates">Email project updates</FieldLabel>
</Field>`,
    ],
    [
      /Radio Group/,
      `import { FieldLabel, RadioGroup, RadioGroupItem } from '@askrjs/themes/components';

<RadioGroup value={plan()} onValueChange={setPlan}>
  <FieldLabel><RadioGroupItem value="team" /> Team</FieldLabel>
  <FieldLabel><RadioGroupItem value="business" /> Business</FieldLabel>
</RadioGroup>`,
    ],
    [
      /Select/,
      `import { state } from '@askrjs/askr';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@askrjs/themes/components';

function ProjectStatusSelect() {
  const [status, setStatus] = state('active');
  return <Select value={status()} onValueChange={setStatus}>
    <SelectTrigger aria-label="Project status"><SelectValue /></SelectTrigger>
    <SelectContent>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="paused">Paused</SelectItem>
    </SelectContent>
  </Select>;
}`,
    ],
    [
      /Slider/,
      `import { Field, FieldLabel, Slider } from '@askrjs/themes/components';

<Field>
  <FieldLabel htmlFor="capacity">Capacity: {capacity()}</FieldLabel>
  <Slider id="capacity" min={1} max={100} value={capacity()} onValueChange={setCapacity} />
</Field>`,
    ],
    [
      /Switch/,
      `import { Field, FieldLabel, Switch } from '@askrjs/themes/components';

<Field>
  <Switch id="public" checked={isPublic()} onCheckedChange={setIsPublic} />
  <FieldLabel htmlFor="public">Public project</FieldLabel>
</Field>`,
    ],
    [
      /Toggle/,
      `import { Toggle, ToggleGroup, ToggleGroupItem } from '@askrjs/themes/components';

<>
  <Toggle pressed={bold()} onPress={() => setBold((value) => !value)}>Bold</Toggle>
  <ToggleGroup type="single" value={alignment()} onValueChange={setAlignment}>
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="center">Center</ToggleGroupItem>
  </ToggleGroup>
</>`,
    ],
    [
      /^Alert Dialog$/,
      `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, Button } from '@askrjs/themes/components';

<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="destructive">Delete project</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Delete project?</AlertDialogTitle>
    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction>Delete</AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>`,
    ],
    [
      /^Drawer and Sheet$/,
      `import { Button, Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@askrjs/themes/components';

<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open filters</Button></SheetTrigger>
  <SheetContent>
    <SheetTitle>Project filters</SheetTitle>
    <SheetDescription>Narrow the project list without leaving the page.</SheetDescription>
    <ProjectFilters />
    <SheetClose>Apply filters</SheetClose>
  </SheetContent>
</Sheet>`,
    ],
    [
      /^Dialog$/,
      `import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@askrjs/themes/components';

<Dialog>
  <DialogTrigger asChild><Button>Edit project</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Edit project</DialogTitle>
    <DialogDescription>Changes are visible immediately.</DialogDescription>
    <ProjectForm />
  </DialogContent>
</Dialog>`,
    ],
    [
      /^Hover Card$/,
      `import { HoverCard, HoverCardContent, HoverCardTrigger } from '@askrjs/themes/components';

<HoverCard>
  <HoverCardTrigger asChild><a href={ownerUrl}>{owner.name}</a></HoverCardTrigger>
  <HoverCardContent>
    <strong>{owner.name}</strong>
    <p>{owner.projectCount} active projects</p>
  </HoverCardContent>
</HoverCard>`,
    ],
    [
      /^Popover$/,
      `import { Button, Popover, PopoverContent, PopoverTrigger } from '@askrjs/themes/components';

<Popover>
  <PopoverTrigger asChild><Button variant="outline">Filters</Button></PopoverTrigger>
  <PopoverContent><ProjectFilters /></PopoverContent>
</Popover>`,
    ],
    [
      /^Menubar$/,
      `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@askrjs/themes/components';

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Project</MenubarTrigger>
    <MenubarContent>
      <MenubarItem onPress={rename}>Rename</MenubarItem>
      <MenubarItem onPress={archive}>Archive</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    ],
    [
      /^Menu, Dropdown, and Context Menu$/,
      `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '@askrjs/themes/components';

<>
  <Dropdown>
    <DropdownTrigger aria-label="Project actions">Actions</DropdownTrigger>
    <DropdownContent><DropdownItem onSelect={archive}>Archive</DropdownItem></DropdownContent>
  </Dropdown>
  <ContextMenu>
    <ContextMenuTrigger><ProjectCard /></ContextMenuTrigger>
    <ContextMenuContent><ContextMenuItem onSelect={duplicate}>Duplicate</ContextMenuItem></ContextMenuContent>
  </ContextMenu>
</>`,
    ],
    [
      /Tabs/,
      `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@askrjs/themes/components';

<Tabs value={tab()} onValueChange={setTab}>
  <TabsList aria-label="Project sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview"><ProjectOverview /></TabsContent>
  <TabsContent value="activity"><ProjectActivity /></TabsContent>
</Tabs>`,
    ],
    [
      /^Table$/,
      `import { For } from '@askrjs/askr';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@askrjs/themes/components';

<Table>
  <TableHead><TableRow><TableHeaderCell>Name</TableHeaderCell><TableHeaderCell>Status</TableHeaderCell></TableRow></TableHead>
  <TableBody>
    <For each={projects} by={(project) => project.id}>
      {(project) => <TableRow><TableCell>{project.name}</TableCell><TableCell>{project.status}</TableCell></TableRow>}
    </For>
  </TableBody>
</Table>`,
    ],
    [
      /^Data Table$/,
      `import { For } from '@askrjs/askr';
import { DataTable, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@askrjs/themes/components';

<DataTable>
  <Table>
    <TableHead><TableRow><TableHeaderCell>Name</TableHeaderCell><TableHeaderCell>Status</TableHeaderCell></TableRow></TableHead>
    <TableBody>
      <For each={projects} by={(project) => project.id}>
        {(project) => <TableRow><TableCell>{project.name}</TableCell><TableCell>{project.status}</TableCell></TableRow>}
      </For>
    </TableBody>
  </Table>
</DataTable>`,
    ],
    [
      /^Virtual List$/,
      `import { VirtualList } from '@askrjs/themes/components';

<VirtualList
  items={projects}
  rowHeight={48}
  getKey={(project) => project.id}
  rowComponent={({ item }) => <ProjectRow project={item} />}
/>`,
    ],
    [
      /^Virtual Table$/,
      `import { VirtualTable, type VirtualTableColumn } from '@askrjs/themes/components';

const columns: readonly VirtualTableColumn<Project>[] = [
  { id: 'name', header: 'Name', cellComponent: ({ row }) => <span>{row.name}</span> },
  { id: 'status', header: 'Status', cellComponent: ({ row }) => <span>{row.status}</span> },
];

<VirtualTable
  rows={projects}
  rowHeight={48}
  headerHeight={44}
  getKey={(project) => project.id}
  columns={columns}
/>`,
    ],
    [
      /^Accordion and Collapsible$/,
      `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@askrjs/themes/components';

<>
  <Accordion type="single" collapsible>
    <AccordionItem value="billing">
      <AccordionTrigger>How billing works</AccordionTrigger>
      <AccordionContent>Usage is calculated per workspace.</AccordionContent>
    </AccordionItem>
  </Accordion>
  <Collapsible open={detailsOpen()} onOpenChange={setDetailsOpen}>
    <CollapsibleTrigger>Project details</CollapsibleTrigger>
    <CollapsibleContent><ProjectDetails /></CollapsibleContent>
  </Collapsible>
</>`,
    ],
    [
      /Progress/,
      `import { Progress } from '@askrjs/themes/components';

<Progress value={uploaded()} max={total()} aria-label="Upload progress" />`,
    ],
    [
      /Toast|Sonner/,
      `import { Toast, ToastDescription, ToastHost, ToastTitle } from '@askrjs/themes/components';

<ToastHost>
  <Toast open={saved()} onOpenChange={setSaved}>
    <ToastTitle>Project saved</ToastTitle>
    <ToastDescription>Your changes are now visible.</ToastDescription>
  </Toast>
</ToastHost>`,
    ],
    [
      /^Application Chrome$/,
      `import { Header, Main, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel } from '@askrjs/themes/components';

<>
  <Header>Workspace</Header>
  <Sidebar><SidebarContent><SidebarGroup><SidebarGroupLabel>Projects</SidebarGroupLabel></SidebarGroup></SidebarContent></Sidebar>
  <Main><ProjectRoutes /></Main>
</>`,
    ],
    [
      /^Avatar and Item$/,
      `import { Avatar, AvatarFallback, AvatarImage, Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@askrjs/themes/components';

<Item>
  <ItemMedia><Avatar><AvatarImage src={owner.avatarUrl} alt="" /><AvatarFallback>{owner.initials}</AvatarFallback></Avatar></ItemMedia>
  <ItemContent><ItemTitle>{owner.name}</ItemTitle><ItemDescription>{owner.role}</ItemDescription></ItemContent>
</Item>`,
    ],
    [
      /^Typography and Display Primitives$/,
      `import { TypographyH1, TypographyLead, TypographyP } from '@askrjs/themes/components';

<>
  <TypographyH1>Project activity</TypographyH1>
  <TypographyLead>Changes across the current workspace.</TypographyLead>
  <TypographyP>Filter the timeline by actor, action, or date.</TypographyP>
</>`,
    ],
    [
      /^Application Layout$/,
      `import { Container, Main, Page, PageHeader, Section } from '@askrjs/themes/components';

<Page>
  <PageHeader title="Projects" description="Active work in this workspace." />
  <Main><Container><Section><ProjectList /></Section></Container></Main>
</Page>`,
    ],
    [
      /^Advanced Layout$/,
      `import { Block, Grid } from '@askrjs/themes/components';

<Grid columns={{ base: 1, md: 3 }} gap="lg">
  <Block style={{ gridColumn: 'span 2' }}><ProjectTimeline /></Block>
  <Block><ProjectSummary /></Block>
</Grid>`,
    ],
    [
      /^Card$/,
      `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@askrjs/themes/components';

<Card>
  <CardHeader><CardTitle>Project health</CardTitle><CardDescription>Updated just now</CardDescription></CardHeader>
  <CardContent><ProjectHealth /></CardContent>
</Card>`,
    ],
    [
      /Theme|Customization|Headless|Composition/,
      `import { Button } from '@askrjs/themes/components';
import { ThemeScope } from '@askrjs/themes/theme';

<ThemeScope defaultTheme="light" storageKey="app-theme">
  <Button>Standard themed action</Button>
</ThemeScope>`,
    ],
  ];
  const code = examples.find(([pattern]) => pattern.test(page.title))?.[1];
  if (!code) {
    throw new Error(`Missing component usage guide for ${page.route}`);
  }
  // The example itself is page-specific and does the explaining; the intro
  // here was title substitution, so there isn't one.
  return { code };
}

function chartGuide(page: DocsPageDefinition): UsageGuideDefinition {
  const sharedStart = `import { createPlot } from '@askrjs/charts';

const Plot = createPlot<ProjectRow>();
`;
  const examples: Readonly<Record<string, string>> = {
    Charts: `${sharedStart}
<Plot.Root data={rows} rowKey="id" label="Revenue by day">
  <Plot.Bar x="createdAt" y="revenue" />
  <Plot.Line x="createdAt" y="target" />
</Plot.Root>`,
    'Channels and Transforms': `import { createPlot, movingAverage } from '@askrjs/charts';

const Plot = createPlot<ProjectRow>();

<Plot.Root data={rows} rowKey="id" label="Smoothed request rate">
  <Plot.Line x="timestamp" y={movingAverage('requests', { window: 7 })} />
</Plot.Root>`,
    Scales: `${sharedStart}
<Plot.Root data={rows} rowKey="id" label="Latency by service">
  <Plot.Scale name="latency" channel="y" type="log" nice />
  <Plot.Axis scale="latency" axis="y" label="Latency (ms)" />
  <Plot.Line x="timestamp" y="latencyMs" yScale="latency" />
</Plot.Root>`,
    'Cartesian Marks': `${sharedStart}
<Plot.Root data={rows} rowKey="id" label="Revenue by day">
  <Plot.Axis axis="x" />
  <Plot.Axis axis="y" />
  <Plot.Bar x="createdAt" y="revenue" />
  <Plot.Line x="createdAt" y="target" />
  <Plot.Point x="createdAt" y="target" />
</Plot.Root>`,
    'Radial Marks': `${sharedStart}
<Plot.Root data={rows} rowKey="id" label="Requests by service">
  <Plot.Arc value="requests" category="service" innerRadius={48} />
  <Plot.Legend label="Service" position="bottom" />
  <Plot.Tooltip channels={['service', 'requests']} />
</Plot.Root>`,
    'Grid and Annotation Marks': `${sharedStart}
<Plot.Root data={rows} rowKey="id" label="Deploy duration">
  <Plot.Grid axis="y" tickCount={5} />
  <Plot.Rule y={300} stroke="status" dash={[4, 4]} />
  <Plot.Text x="timestamp" y="durationMs" text="label" />
</Plot.Root>`,
    Interactions: `${sharedStart}
<Plot.Root data={rows} rowKey="id" label="Interactive latency">
  <Plot.Line x="timestamp" y="latencyMs" />
  <Plot.Tooltip mode="x" channels={['timestamp', 'latencyMs']} />
  <Plot.Crosshair axes="xy" />
  <Plot.Select mode="toggle" />
  <Plot.Zoom axes="x" wheel pinch pan />
</Plot.Root>`,
    'Live Data and View State': `import { state } from '@askrjs/askr';
import { createPlot, type PlotView } from '@askrjs/charts';

const Plot = createPlot<MetricRow>();

function LiveLatency() {
  const [view, setView] = state<PlotView>({});
  return <Plot.Root
    data={rows()}
    rowKey="id"
    label="Live latency"
    view={view()}
    onViewChange={setView}
    followLatest={{ durationMs: 300_000, field: 'timestamp' }}
  ><Plot.Line x="timestamp" y="latencyMs" /></Plot.Root>;
}`,
    Export: `import { state } from '@askrjs/askr';
import { createPlot, type PlotApi } from '@askrjs/charts';

const Plot = createPlot<ProjectRow>();

function ExportableRevenue() {
  const [api, setApi] = state<PlotApi<ProjectRow> | null>(null);
  return <>
    <Plot.Root data={rows} rowKey="id" label="Revenue" onApiChange={setApi}>
      <Plot.Line x="createdAt" y="revenue" />
    </Plot.Root>
    <button type="button" onClick={() => download(api()?.exportSvg() ?? '', 'revenue.svg')}>Export SVG</button>
  </>;
}`,
    Recipes: `${sharedStart}
<Plot.Root data={rows} rowKey="id" label="Revenue and target">
  <Plot.Bar x="createdAt" y="revenue" fill="team" />
  <Plot.Line x="createdAt" y="target" />
  <Plot.Point x="createdAt" y="target" />
  <Plot.Legend interactive />
</Plot.Root>`,
    'Accessibility and SSR': `${sharedStart}
<Plot.Root
  data={rows}
  rowKey="id"
  label="Daily revenue"
  title="Revenue"
  description="Actual revenue for the current week."
  summary={({ visibleRowCount }) => visibleRowCount + ' days shown'}
  width={720}
>
  <Plot.Line x="createdAt" y="revenue" />
</Plot.Root>`,
    'Migration from Charts 0.1': `${sharedStart}
// Compose the 0.1 primitives directly; removed chart-specific wrappers
// such as LineChart and DonutChart have no compatibility aliases.
<Plot.Root data={rows} rowKey="id" label="Revenue by team">
  <Plot.Line x="createdAt" y="revenue" />
  <Plot.Arc value="revenue" category="team" innerRadius={48} />
</Plot.Root>`,
  };
  const code = examples[page.title];
  if (!code) throw new Error(`Missing chart usage guide for ${page.route}`);
  return { code };
}

function topicGuide(
  page: DocsPageDefinition
): UsageGuideDefinition | undefined {
  const topics: readonly [RegExp, string, string][] = [
    [
      /^Build an SPA$/,
      'Create one route registry, mount it with createSPA, and keep browser-only services behind lifecycle-owned components.',
      `import { createSPA } from '@askrjs/askr/boot';
import { createRouteRegistry, route } from '@askrjs/askr/router';

const registry = createRouteRegistry(() => {
  route('/', DashboardPage);
  route('/projects/{projectId}', ProjectPage);
});

await createSPA({ root: document.getElementById('app')!, registry });`,
    ],
    [
      /^Add SSR to an SPA$/,
      'Reuse the SPA route registry on the server, serialize its initial data into the document, and switch the browser entry from createSPA to hydrateSPA.',
      `import { hydrateSPA } from '@askrjs/askr/boot';
import { renderToString } from '@askrjs/askr/ssr';

// Server entry
const html = renderToString({ registry, url: request.url });

// Browser entry
await hydrateSPA({ root: document.getElementById('app')!, registry });`,
    ],
    [
      /^Build an Authenticated Full-Stack App$/,
      'Resolve the session on the server, enforce permissions at both route and handler boundaries, and expose only the principal data needed for rendering.',
      `import { allOf, createAuth, requirePermission, requireUser } from '@askrjs/auth';

const auth = createAuth({ sessions: sessionStore, principals: principalStore });
const canManageProjects = allOf(requireUser(), requirePermission('projects:write'));

router.post('/projects', createProject, { auth: canManageProjects });`,
    ],
    [
      /^Build an API-Only Server$/,
      'Compose a context-first router, validate every external input, and return explicit response helpers from handlers.',
      `import { createRouter, created, notFound, ok } from '@askrjs/server';

export const router = createRouter()
  .get('/projects/{id}', async (context) => {
    const project = await projects.get(context.params.id);
    return project ? context.ok(project) : context.notFound();
  })
  .post('/projects', async (context) => context.created(
    await projects.create(await context.bind<CreateProjectInput>())
  ));`,
    ],
    [
      /^Generate a Static Site$/,
      'Keep static routes in the shared registry and make the document, assets, and output directory explicit in ssg.config.ts.',
      `export const staticConfig = {
  registry,
  outputDir: 'dist',
  document: renderDocument,
  assets: [{ from: resolve('public'), to: '.' }],
};

// package.json: "build": "askr ssg --config ./ssg.config.ts --output ./dist"`,
    ],
    [
      /^Build an MCP Server$/,
      'Register typed tools on one MCP server and select the HTTP, SSE, session, or stdio adapter only at deployment time.',
      `import { schema } from '@askrjs/schema';
import { createMcpServer } from '@askrjs/server/mcp';

export const mcp = createMcpServer({ name: 'project-tools', version: '1.0.0' })
  .tool('lookup-project', { input: schema.object({ id: schema.uuid() }) },
    async (context, { id }) => ({
      content: [{ type: 'text', text: await lookup(id, context.signal) }],
    })
  );`,
    ],
    [
      /Tables, Filters, and URL State/,
      'Store shareable sort, filter, and page state in the URL; derive the query input from that state and render rows with stable keys.',
      `import { currentRoute, updateRouteQuery } from '@askrjs/askr/router';

const route = currentRoute();
const filters = () => ({
  status: route.query.get('status') ?? 'active',
  page: Number(route.query.get('page') ?? 1),
});

function setStatus(status: string) {
  updateRouteQuery({ status, page: 1 });
}`,
    ],
    [
      /Dashboards, Charts, and Polling/,
      'Poll through a cancellable query, retain the last successful rows while refreshing, and give the plot stable row identity and an accessible label.',
      `import { createPlot } from '@askrjs/charts';

const Plot = createPlot<MetricRow>();

<Plot.Root data={metrics()} rowKey={(row) => row.timestamp} label="Request rate">
  <Plot.Axis axis="x" />
  <Plot.Axis axis="y" />
  <Plot.Line x="timestamp" y="requests" />
</Plot.Root>`,
    ],
    [
      /Protected Routes and Permissions/,
      'Require authentication before rendering protected routes and enforce the same permission again on the server operation that owns the data.',
      `import { allOf, requirePermission, requireUser } from '@askrjs/auth';

const canReadBilling = allOf(requireUser(), requirePermission('billing:read'));

route('/billing', BillingPage, { auth: canReadBilling });
router.get('/api/billing', getBilling, { auth: canReadBilling });`,
    ],
    [
      /API Integration and Error Handling/,
      'Define the endpoint once, pass cancellation through every request, and branch on the typed result before reading data.',
      `import { createClient, defineApi, get, json } from '@askrjs/fetch';

const api = createClient(defineApi({
  project: get('/projects/{id}').params<{ id: string }>().returns(json<Project>()),
}), { baseUrl: env.API_URL });

const result = await api.project({ params: { id }, signal });
if (!result.ok) return <ProjectError problem={result.error} />;
return <ProjectDetails project={result.data} />;`,
    ],
    [
      /Loading, Empty, Error, and Pending States/,
      'Render pending, empty, and recoverable failure states at the query boundary while preserving the last useful context during refreshes.',
      `import { Show } from '@askrjs/askr';

<Show when={!projects.pending} fallback={<ProjectSkeleton />}>
  <Show when={!projects.error} fallback={<ProjectError onRetry={projects.refetch} />}>
    <Show when={projects.data.length > 0} fallback={<EmptyProjects />}>
      <ProjectList projects={projects.data} />
    </Show>
  </Show>
</Show>`,
    ],
    [
      /File Uploads and Artifacts/,
      'Stream multipart uploads at the server boundary, enforce size and content constraints before storage, and return an opaque artifact identifier.',
      `<form onSubmit={async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) return;
  await fetch('/artifacts', { method: 'POST', body: new FormData(form) });
}}>
  <label htmlFor="artifact">Build artifact</label>
  <input id="artifact" name="artifact" type="file" required />
  <button type="submit">Upload</button>
</form>

// Server: bind the multipart input, validate it, stream to storage, then return 201.`,
    ],
    [
      /Environment Configuration/,
      'Read and validate environment values once in the server composition root; pass a typed config object to services instead of reading globals throughout the application.',
      `export const config = Object.freeze({
  apiUrl: requireUrl(process.env.API_URL, 'API_URL'),
  oidcIssuer: requireUrl(process.env.OIDC_ISSUER, 'OIDC_ISSUER'),
  port: requireInteger(process.env.PORT ?? '3000', 'PORT'),
});

const app = createApplication({ config });`,
    ],
    [
      /^Accessibility$/,
      'Start with semantic elements and themed components, supply application labels and descriptions, then verify the complete task with keyboard and screen reader.',
      `import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@askrjs/themes/components';

<Dialog>
  <DialogTrigger asChild><Button>Delete project</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle>Delete project?</DialogTitle>
    <DialogDescription>This action cannot be undone.</DialogDescription>
    <DeleteProjectActions />
  </DialogContent>
</Dialog>`,
    ],
    [
      /Testing Deterministic Applications/,
      'Control clocks, requests, and route input in tests; assert rendered behavior and cleanup instead of implementation call counts.',
      `it('should increment the quantity', () => {
  expect(incrementQuantity(1)).toBe(2);
});`,
    ],
    [
      /Production Readiness/,
      'Verify the locked published packages, tests, production renderer, generated routes, and deployment fallback in the same order CI uses.',
      `npm ci
npm run lint
npm run test
npm run build`,
    ],
    [
      /Migration from React/,
      'Move local values to state, computed values to derive, and effect-owned asynchronous work to cancellable resources before changing routing or rendering mode.',
      `import { derive, state } from '@askrjs/askr';
import { resource } from '@askrjs/askr/resources';

function ProjectPage({ initialProjectId }: { initialProjectId: string }) {
  const [projectId] = state(initialProjectId);
  const project = resource(({ signal }) => loadProject(projectId(), signal), [projectId]);
  const title = derive(() => project.value?.name ?? 'Loading project');

  return <h1>{title()}</h1>;
}`,
    ],
    [
      /Lists with For/,
      'Render stable keyed rows and keep row identity separate from array position.',
      `import { For } from '@askrjs/askr';

<For each={projects()} by={(project) => project.id}>
  {(project) => <ProjectRow project={project} />}
</For>`,
    ],
    [
      /Conditional Rendering/,
      'Use Show for a boolean branch and Match/Case when one value selects several mutually exclusive views.',
      `import { Case, Match, Show } from '@askrjs/askr';

function ProjectState(props: {
  project: Project | null;
  status: 'ready' | 'failed' | 'unknown';
}) {
  return <>
    <Show when={props.project} fallback={<ProjectSkeleton />}>
      {(project) => <ProjectDetails project={project} />}
    </Show>
    <Case fallback={<UnknownState />}>
      <Match when={props.status === 'ready'}><ReadyState /></Match>
      <Match when={props.status === 'failed'}><FailureState /></Match>
    </Case>
  </>;
}`,
    ],
    [
      /Scopes/,
      'Define a typed scope once, provide it at the ownership boundary, and read it only from descendants that require the service.',
      `import { defineScope, readScope } from '@askrjs/askr';

const ProjectsScope = defineScope<ProjectsService>(defaultProjects);

function ProjectRoutes() {
  const projects = readScope(ProjectsScope);
  return <ProjectList projects={projects.list()} />;
}

function Application() {
  return <ProjectsScope value={projectService}><ProjectRoutes /></ProjectsScope>;
}`,
    ],
    [
      /Lifecycle Work|Resources/,
      'Use a resource for cancellable work whose lifetime belongs to the current component render and dependencies.',
      `import { resource } from '@askrjs/askr/resources';

const project = resource(
  ({ signal }) => api.projects.get(projectId(), { signal }),
  [projectId]
);`,
    ],
    [
      /Error Boundaries/,
      'Put the boundary around the smallest route or feature that can recover independently and keep the reset action inside its fallback.',
      `import { ErrorBoundary } from '@askrjs/askr/components';

<ErrorBoundary fallback={(error, reset) => (
  <ProjectError error={error} onRetry={reset} />
)}>
  <ProjectWorkspace />
</ErrorBoundary>`,
    ],
    [
      /Paths, Parameters/,
      'Declare typed path parameters in the route and accept them as page props; construct destinations through the route reference.',
      `const projectRoute = route('/projects/{projectId}', ProjectPage);

function ProjectPage({ projectId }: { projectId: string }) {
  return <Project id={projectId} />;
}

const destination = to(projectRoute, { projectId: project.id });`,
    ],
    [
      /Navigation and URL State/,
      'Keep shareable filters in route search state so refresh, history, and copied URLs preserve the same view.',
      `import { currentRoute, updateRouteQuery } from '@askrjs/askr/router';

const route = currentRoute();
const status = () => route.query.get('status') ?? 'active';

updateRouteQuery({ status: 'paused', page: 1 });`,
    ],
    [
      /Loaders and Deferred/,
      'Return critical loader data directly and wrap slower independent work in defer so the page can stream a stable shell.',
      `import { defer } from '@askrjs/askr/router';

route('/projects/{projectId}', ProjectPage, {
  loader: async ({ params }) => ({
    project: await projects.get(params.projectId),
    activity: defer(activity.list(params.projectId)),
  }),
});`,
    ],
    [
      /Access Policies/,
      'Return an explicit allow, redirect, unauthorized, or forbidden decision from the route policy and repeat the enforcement on server APIs.',
      `route('/admin', AdminPage, {
  policies: [({ auth }) =>
    auth.permissions.includes('admin') ? allow() : forbidden()],
});`,
    ],
    [
      /Route Metadata/,
      'Attach title and description metadata to the route so SSG and browser navigation use the same document contract.',
      `route('/projects/{projectId}', ProjectPage, {
  meta: ({ params }) => ({
    title: 'Project ' + params.projectId,
    description: 'Project details and activity.',
  }),
});`,
    ],
    [
      /Mutations and Invalidation/,
      'Describe the write, the cache prefixes it affects, and whether successful writes invalidate those prefixes.',
      `import { createMutation } from '@askrjs/askr/data';

const renameProject = createMutation<
  { id: string; name: string },
  Project
>({
  action: ({ id, name }, { signal }) => api.projects.rename(id, name, { signal }),
  affects: ({ id }) => ['project:' + id, 'projects'],
  afterSuccess: 'invalidate',
});

async function rename(id: string, name: string) {
  return renameProject.execute({ id, name });
}`,
    ],
    [
      /Server Queries and Preloading/,
      'Register the server handler against the same query definition used by components, then prefetch into the request data runtime.',
      `import { defineServerQueries, serveQuery } from '@askrjs/askr/data';

export const queries = defineServerQueries(
  serveQuery(projectQuery, ({ input, signal }) =>
    projects.get(input.id, { signal })
  )
);`,
    ],
    [
      /Page Actions and Forms|Forms, Actions, and CRUD/,
      'Bind form input in the server action, return field-aware failures without navigation, and redirect only after a successful write.',
      `<form method="post" action="/projects/new">
  <Field><FieldLabel htmlFor="name">Name</FieldLabel><Input id="name" name="name" required /></Field>
  <Button type="submit">Create project</Button>
</form>`,
    ],
    [
      /Selective Hydration/,
      'The published runtime does not expose a separate selective-hydration boundary. Hydrate the deterministic application tree with hydrateSPA; split independently loaded behavior with routes and lazy modules instead of inventing a boundary API.',
      `import { hydrateSPA } from '@askrjs/askr/boot';

const root = document.getElementById('app');
if (root?.childNodes.length) {
  await hydrateSPA({ root, registry });
}`,
    ],
    [
      /Static Site Generation/,
      'Export the route registry, document renderer, and assets from ssg.config.ts, then let the CLI enumerate every registered static route.',
      `export const staticConfig = {
  registry,
  outputDir: 'dist',
  document: renderDocument,
  assets: [{ from: resolve('public'), to: '.' }],
};

// askr ssg --config ./ssg.config.ts --output ./dist`,
    ],
    [
      /Context and Responses/,
      'Read dependencies and request state from the handler context and return a response helper instead of mutating a global response object.',
      `router.get('/projects/{id}', async (context) => {
  const project = await projects.get(context.params.id);
  return project ? context.ok(project) : context.notFound();
});`,
    ],
    [
      /Middleware and Security/,
      'Install middleware in composition order: request identity and telemetry first, security and domain middleware next, terminal errors last.',
      `const router = createRouter()
  .use(requestIds(), telemetry(), securityHeaders())
  .use(authMiddleware(auth))
  .get('/projects', listProjects);`,
    ],
    [
      /Realtime/,
      'Tie streams and sockets to the request signal so disconnects stop producers and release subscriptions.',
      `router.get('/events', (context) => {
  const stream = createEventStream({ signal: context.signal });
  void (async () => {
    for await (const event of projects.events(context.signal)) {
      await stream.send({ event: 'project', data: event });
    }
  })();
  return stream.response;
});`,
    ],
    [
      /Probes/,
      'Keep liveness process-local and readiness dependency-aware. A false probe result makes the framework report that the target cannot currently serve traffic.',
      `const app = createServerApp({
  router,
  probes: {
    livez: () => true,
    readyz: async () => database.isReady(),
  },
});`,
    ],
    [
      /JWT/,
      'Create a validator with explicit issuer, audience, key selection, and clock policy; reject tokens before turning claims into a principal.',
      `import { createJwtValidator } from '@askrjs/auth/jwt';

const validateAccessToken = createJwtValidator({
  issuer: env.OIDC_ISSUER,
  audience: env.API_AUDIENCE,
  jwks: keySet,
});`,
    ],
    [
      /OIDC/,
      'Use discovery and authorization-code flow helpers at the server boundary; validate state, nonce, redirect URI, and issuer on callback.',
      `import { createOidcClient } from '@askrjs/auth/oidc';

const oidc = await createOidcClient({
  issuer: env.OIDC_ISSUER,
  clientId: env.OIDC_CLIENT_ID,
  redirectUri: env.OIDC_REDIRECT_URI,
});`,
    ],
    [
      /Typed Clients/,
      'Describe endpoint input and result once, then create a client whose calls accept typed params, query, headers, body, and AbortSignal.',
      `import { createClient, defineApi, get, json } from '@askrjs/fetch';

const definition = defineApi({
  getProject: get('/projects/{id}')
    .params<{ id: string }>()
    .returns(json<Project>()),
});
const api = createClient(definition, { baseUrl: env.API_URL });

const result = await api.getProject({ params: { id }, signal });
if (result.ok) renderProject(result.data);`,
    ],
    [
      /Results, Errors, and Cancellation/,
      'Pass AbortSignal through the client call, distinguish typed problem responses from transport failures, and do not retry cancellations.',
      `const controller = new AbortController();
const result = await api.projects.get({ params: { id }, signal: controller.signal });

if (!result.ok) return <ProjectError problem={result.error} />;
return <ProjectDetails project={result.data} />;`,
    ],
    [
      /Client Middleware/,
      'Use client middleware for cross-cutting headers, tracing, and bounded retry policy—not endpoint-specific business rules.',
      `const authorization: Middleware = async (context, next) => {
  const headers = new Headers(context.request.headers);
  headers.set('authorization', 'Bearer ' + session.token);
  return next({ ...context, request: new Request(context.request, { headers }) });
};

const client = createClient(definition, {
  baseUrl: env.API_URL,
  middleware: [authorization],
});`,
    ],
    [
      /OpenAPI and Typed-Client|OpenAPI$/,
      'Generate the OpenAPI artifact from executable route schemas, check it for drift in CI, then generate the typed client from that checked artifact.',
      `askr openapi --output ./openapi.yaml
askr openapi --check --output ./openapi.yaml
askr generate ./openapi.yaml --output ./generated/api.ts`,
    ],
    [
      /OpenTelemetry/,
      'Create the function-first telemetry bridge after installing an application-owned OpenTelemetry provider and wrap work at semantic boundaries.',
      `import { createTelemetry } from '@askrjs/otel';

const telemetry = createTelemetry({ tracerName: 'project-api' });
return telemetry.request({ requestId }, () => router.handle(request));`,
    ],
    [
      /Dependency Updates/,
      'Inspect updates first, apply safe peer-compatible changes separately, and run the full application build before accepting an upgrade.',
      `askr outdated
askr update
npm run check

# Use only when you intend the latest peer-compatible set:
askr upgrade`,
    ],
    [
      /CLI Overview/,
      'Run the project-local published CLI, inspect help before scripting it, and keep CI commands pinned by package-lock.json.',
      `npx askr --version
npx askr --help
npx askr create --help
npx askr openapi --check`,
    ],
    [
      /Page and Action Generation/,
      'Generate only the published page and action targets, review the created files, then register and test their routes before committing.',
      `npx askr add page audit-log
npx askr add action approve-request --route /requests/{id}

git diff -- src
npm run test
npm run build`,
    ],
    [
      /SSG Commands/,
      'Point the CLI at the application-owned SSG configuration, use an explicit output directory, and fail the build when any registered route cannot render.',
      `npx askr ssg --config ./ssg.config.ts --output ./dist

# Verify the generated document and hosting fallback.
test -f ./dist/index.html
test -f ./dist/404.html`,
    ],
    [
      /Agent Skills and Workflows/,
      'Install the published project skills, keep them in version control, and review generated guidance against the current application before applying it.',
      `npx askr skills install
npx askr skills sync
npx askr skills review foundation --cwd .

git diff -- skills`,
    ],
    [
      /Vite Integration and Document Ownership/,
      'Install the Askr Vite plugin once and keep the HTML document owned by the selected SPA, SSR, or SSG entry instead of generating competing shells.',
      `import { askrVitePlugin } from '@askrjs/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [askrVitePlugin()],
});`,
    ],
    [
      /JSX Reference/,
      'Use DOM property names and typed event handlers directly; pass components values and callbacks instead of mutating rendered nodes.',
      `<form onSubmit={(event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form instanceof HTMLFormElement) save(new FormData(form));
}}>
  <label htmlFor="name">Project name</label>
  <input id="name" name="name" required />
  <button type="submit">Save</button>
</form>`,
    ],
    [
      /Behavioral Contracts/,
      'Preserve ownership, cancellation, deterministic rendering, and delivery parity when composing lower-level APIs into application features.',
      `import { resource } from '@askrjs/askr/resources';

const project = resource(
  ({ signal }) => api.projects.get(projectId(), { signal }),
  [projectId]
);

// The component owns this request; disposal aborts it.`,
    ],
    [
      /Testing Utilities/,
      'Mock the query or route boundary, drive public state transitions, and inspect invalidation or route warnings without replacing the application runtime.',
      `import { createInvalidationRecorder, matchRoute, mockQuery } from '@askrjs/askr/testing';

const projects = mockQuery({ data: [{ id: 'p1', name: 'Northstar' }] });
const invalidations = createInvalidationRecorder();

expect(matchRoute('/projects/p1', { registry })?.params.id).toBe('p1');
expect(invalidations.calls).toEqual([]);`,
    ],
    [
      /FX Timing Utilities/,
      'Use the FX helpers for lifecycle-owned timing, pass cleanup through the owning scope, and replace real clocks with deterministic scheduling in tests.',
      `import { debounce, retry, timeout } from '@askrjs/askr/fx';

const search = debounce((query: string) => loadResults(query), 200);
const project = await retry(() => loadProject(id), { maxAttempts: 3 });
await timeout(1_000);`,
    ],
    [
      /Advanced and Custom Runtimes/,
      'Create a custom runtime only when implementing a renderer host or isolated execution environment; normal applications should use the default runtime.',
      `import { createRuntime, getDefaultRuntime } from '@askrjs/askr';

const applicationRuntime = getDefaultRuntime();

// Renderer authors provide the complete host contract.
const isolatedRuntime = createRuntime({ renderer: customRendererHost });`,
    ],
    [
      /Compatibility and Migration Notes/,
      'Align all Askr packages as one tested release set, read declaration and migration changes, then run the real delivery modes before accepting an upgrade.',
      `npm ci
npm ls '@askrjs/*'
npm run typecheck
npm run test
npm run build`,
    ],
    [
      /Troubleshooting/,
      'Reduce failures to the owning boundary: confirm package alignment, reproduce with the production renderer, inspect route output, then add a regression test before changing code.',
      `npm ls '@askrjs/*'
npm run typecheck
npm run build

# For SSR or SSG, inspect the generated HTML before debugging hydration.
rg 'data-askr|<main|<title' dist`,
    ],
  ];
  const match = topics.find(([pattern]) => pattern.test(page.title));
  if (!match) return undefined;
  return { intro: match[1], code: match[2] };
}

export function buildUsageGuide(
  page: DocsPageDefinition,
  exactExample?: string
): UsageGuideDefinition | undefined {
  if (exactExample) {
    return { code: exactExample };
  }

  const focusedGuide = topicGuide(page);
  if (focusedGuide) return focusedGuide;

  if (page.navGroup === 'Getting Started') {
    return {
      intro:
        'Create a readable starter, run it unchanged, and make one small production build after the first route works.',
      code: `npx ${cli} create startkit my-app
cd my-app
npm run dev
npm run build`,
    };
  }

  if (page.navGroup === 'Fundamentals') {
    return {
      intro:
        'Put reactive state inside the component that owns the interaction and derive display values from it during render.',
      code: `import { derive, state } from '@askrjs/askr';

export function Quantity() {
  const [count, setCount] = state(1);
  const label = derive(() => 'Quantity: ' + count());

  return <button onClick={() => setCount((value) => value + 1)}>{label()}</button>;
}`,
    };
  }

  if (page.navSection === 'Routing') {
    return {
      intro:
        'Register a route once and let the same registry drive browser navigation, SSR, and static generation.',
      code: `import { createRouteRegistry, group, route } from '@askrjs/askr/router';

export const registry = createRouteRegistry(() => {
  group({ layout: AppLayout }, () => {
    route('/', HomePage);
  route('/projects/{projectId}', ProjectPage);
  });
});`,
    };
  }

  if (page.navSection === 'Data') {
    return {
      intro:
        'Define the cache key and cancellable fetch contract once, then create the query where a component needs the result.',
      code: `import { createQuery, defineQuery } from '@askrjs/askr/data';

const project = defineQuery({
  key: ({ id }: { id: string }) => 'project:' + id,
  fetch: ({ id, signal }) => api.projects.get(id, { signal }),
});

const result = createQuery(project, { id: projectId });`,
    };
  }

  if (page.navGroup === 'Rendering') {
    return {
      intro:
        'Keep the route tree shared and change the delivery adapter—not the component contract—when moving between client, server, and static rendering.',
      code: `import { createSPA, hydrateSPA } from '@askrjs/askr/boot';

const root = document.getElementById('app')!;
if (root.childNodes.length) {
  await hydrateSPA({ root, registry });
} else {
  await createSPA({ root, registry });
}`,
    };
  }

  if (page.navSection === 'Authentication') {
    return {
      intro:
        'Resolve identity at the request boundary and express authorization as reusable requirements instead of component-only checks.',
      code: `import {
  createAuth,
  requirePermission,
  requireUser,
} from '@askrjs/auth';

export const auth = createAuth({
  sessions: sessionStore,
  principals: principalStore,
});

export const manageProjects = [
  requireUser(),
  requirePermission('projects:write'),
];`,
    };
  }

  if (page.navSection === 'HTTP Contracts') {
    return {
      intro:
        'Define an executable schema once and reuse its JSON Schema representation in the HTTP contract and generated-client workflow.',
      code: `import { schema } from '@askrjs/schema';

export const projectInput = schema.object({
  name: schema.string({ minLength: 1 }),
  ownerId: schema.uuid(),
});

const parsed = projectInput.safeParse(await request.json());
const jsonSchema = projectInput.jsonSchema;`,
    };
  }

  if (page.navSection === 'MCP') {
    return {
      intro:
        'Create one MCP server, register typed primitives on it, and let the selected transport supply auth, cancellation, sessions, and progress.',
      code: `import { schema } from '@askrjs/schema';
import { createMcpServer } from '@askrjs/server/mcp';

export const mcp = createMcpServer({
  name: 'project-tools',
  version: '1.0.0',
}).tool(
  'lookup-project',
  { input: schema.object({ id: schema.uuid() }) },
  async (context, { id }) => ({
    content: [{ type: 'text', text: await lookup(id, context.signal) }],
  })
);`,
    };
  }

  if (page.navSection === 'Platform Services') {
    return {
      intro:
        'Create the platform service at the application composition root and pass its provider-neutral contract into routes or components.',
      code: `import { createI18n } from '@askrjs/i18n';

export const i18n = createI18n('en', {
  en: { greeting: (name: string) => 'Hello, ' + name },
  fr: { greeting: (name: string) => 'Bonjour, ' + name },
});

<i18n.Scope locale="en">
  {i18n.text('greeting', 'Askr')}
</i18n.Scope>`,
    };
  }

  if (page.navSection === 'Server') {
    return {
      intro:
        'Build the HTTP surface from a router and context-first handlers; bind input and return an explicit response helper from the same boundary.',
      code: `import { createRouter, created } from '@askrjs/server';

export const router = createRouter().post('/projects', async (context) => {
  const input = await context.bind<CreateProjectInput>();
  const project = await projects.create(input);
  return created(project);
});`,
    };
  }

  if (page.navSection === 'Charts') {
    return chartGuide(page);
  }

  if (page.navGroup === 'UI & Components') {
    return componentGuide(page);
  }

  if (page.navGroup === 'Tooling') {
    return {
      intro:
        'Run the published CLI through the project package boundary and review generated artifacts before committing them.',
      code: `npx ${cli} add page audit-log
npx ${cli} add action approve-request --route /requests/{id}
npx ${cli} openapi --check
npx ${cli} ssg --config ./ssg.config.ts --output ./dist`,
    };
  }

  if (page.navGroup === 'Guides') {
    return {
      intro:
        'Start from an explicit route registry and add one application boundary at a time so browser, server, and production behavior stay testable.',
      code: `export const registry = createRouteRegistry(() => {
  group({ layout: AppLayout }, () => {
    route('/', DashboardPage);
    route('/projects/{projectId}', ProjectPage);
    route('/404', NotFoundPage);
  });
});`,
    };
  }

  // Reference entrypoints already render generated signature tables, and the
  // generic fallback had nothing page-specific to say. Both render no example
  // section rather than a templated one.
  return undefined;
}
