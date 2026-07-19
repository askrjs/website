import type { DocsPageDefinition } from './types';

export type UsageGuideDefinition = {
  intro: string;
  steps: readonly string[];
  code: string;
};

function sharedSteps(page: DocsPageDefinition): readonly string[] {
  return [
    `Import the published ${page.packages.map((pkg) => pkg.importPath ?? pkg.name).join(' and ')} entrypoint.`,
    `Keep ${page.title.toLowerCase()} configuration next to the component, route, or server composition root that owns it.`,
    'Handle pending, unavailable, cancellation, and failure states, then verify the production path.',
  ];
}

function componentGuide(page: DocsPageDefinition): UsageGuideDefinition {
  const steps = [
    'Import the themed component from @askrjs/themes/components; use @askrjs/ui directly only when building a custom visual system.',
    `Keep ${page.title.toLowerCase()} labels, state, and application actions visible at the call site instead of styling internal DOM nodes.`,
    'Verify keyboard behavior, focus movement or return, disabled state, and both standard themes.',
  ];
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
      `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@askrjs/themes/components';

<Select value={status()} onValueChange={status.set}>
  <SelectTrigger aria-label="Project status"><SelectValue /></SelectTrigger>
  <SelectContent>
    {statuses.map((item) => <SelectItem value={item.id}>{item.label}</SelectItem>)}
  </SelectContent>
</Select>`,
    ],
    [
      /ARIA and Ref Utilities|Icon Contract/,
      `import { Button, Input } from '@askrjs/themes/components';
import { SearchIcon } from '@askrjs/lucide';

<label for="project-search">Search projects</label>
<Input id="project-search" name="query" />
<Button aria-label="Run search"><SearchIcon aria-hidden="true" /></Button>`,
    ],
    [
      /Combobox and Command/,
      `import { Combobox, ComboboxInput, ComboboxList, ComboboxOption } from '@askrjs/themes/components';

<Combobox value={owner()} onValueChange={owner.set}>
  <ComboboxInput aria-label="Project owner" />
  <ComboboxList>
    {people.map((person) => <ComboboxOption value={person.id}>{person.name}</ComboboxOption>)}
  </ComboboxList>
</Combobox>`,
    ],
    [
      /Calendar and Date Picker/,
      `import { DatePicker, DatePickerInput } from '@askrjs/themes/components';

<DatePicker value={dueDate()} onValueChange={dueDate.set}>
  <DatePickerInput aria-label="Project due date" />
</DatePicker>`,
    ],
    [
      /Native Select and Input OTP/,
      `import { InputOTP, InputOTPGroup, InputOTPSlot, NativeSelect } from '@askrjs/themes/components';

<NativeSelect name="timezone" aria-label="Timezone">
  <option value="America/New_York">Eastern time</option>
</NativeSelect>
<InputOTP maxlength={6} value={code()} onValueChange={code.set}>
  <InputOTPGroup>{[0, 1, 2, 3, 4, 5].map((index) => <InputOTPSlot index={index} />)}</InputOTPGroup>
</InputOTP>`,
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
      `import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@askrjs/themes/components';

<ScrollArea class="activity-log">
  <ScrollAreaViewport>{events.map((event) => <ActivityRow event={event} />)}</ScrollAreaViewport>
  <ScrollAreaScrollbar orientation="vertical"><ScrollAreaThumb /></ScrollAreaScrollbar>
</ScrollArea>`,
    ],
    [
      /Alert, Badge, Empty, Skeleton, Spinner, and Stat/,
      `import { Alert, AlertDescription, AlertTitle, Badge, Empty, EmptyDescription, EmptyTitle, Spinner } from '@askrjs/themes/components';

{query.pending ? <Spinner aria-label="Loading projects" /> :
 query.error ? <Alert variant="destructive"><AlertTitle>Could not load projects</AlertTitle><AlertDescription>{query.error.message}</AlertDescription></Alert> :
 query.data.length === 0 ? <Empty><EmptyTitle>No projects</EmptyTitle><EmptyDescription>Create a project to get started.</EmptyDescription></Empty> :
 <Badge>{query.data.length} active</Badge>}`,
    ],
    [
      /Monaco Editor/,
      `import { MonacoEditor } from '@askrjs/monaco';

<MonacoEditor
  value={source()}
  language="typescript"
  onChange={(value) => source.set(value ?? '')}
  options={{ minimap: { enabled: false } }}
/>`,
    ],
    [
      /Icons and Logos|Lucide Gallery/,
      `import { GitHubLogo } from '@askrjs/logos';
import { SearchIcon } from '@askrjs/lucide';

<SearchIcon size={18} aria-hidden="true" />
<a href={repositoryUrl}><GitHubLogo aria-label="GitHub repository" /></a>`,
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
  <FieldLabel for="project-name">Project name</FieldLabel>
  <Input id="project-name" name="name" required />
  <FieldHint>Shown to everyone in the workspace.</FieldHint>
  <Button type="submit">Save project</Button>
</Field>`,
    ],
    [
      /Checkbox/,
      `import { Checkbox, Field, FieldLabel } from '@askrjs/themes/components';

<Field>
  <Checkbox id="email-updates" checked={enabled()} onCheckedChange={enabled.set} />
  <FieldLabel for="email-updates">Email project updates</FieldLabel>
</Field>`,
    ],
    [
      /Radio Group/,
      `import { FieldLabel, RadioGroup, RadioGroupItem } from '@askrjs/themes/components';

<RadioGroup value={plan()} onValueChange={plan.set}>
  <FieldLabel><RadioGroupItem value="team" /> Team</FieldLabel>
  <FieldLabel><RadioGroupItem value="business" /> Business</FieldLabel>
</RadioGroup>`,
    ],
    [
      /Select/,
      `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@askrjs/themes/components';

<Select value={status()} onValueChange={status.set}>
  <SelectTrigger aria-label="Project status"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="active">Active</SelectItem>
    <SelectItem value="paused">Paused</SelectItem>
  </SelectContent>
</Select>`,
    ],
    [
      /Slider/,
      `import { Field, FieldLabel, Slider } from '@askrjs/themes/components';

<Field>
  <FieldLabel for="capacity">Capacity: {capacity()}</FieldLabel>
  <Slider id="capacity" min={1} max={100} value={[capacity()]} />
</Field>`,
    ],
    [
      /Switch/,
      `import { Field, FieldLabel, Switch } from '@askrjs/themes/components';

<Field>
  <Switch id="public" checked={isPublic()} onCheckedChange={isPublic.set} />
  <FieldLabel for="public">Public project</FieldLabel>
</Field>`,
    ],
    [
      /Toggle/,
      `import { Toggle, ToggleGroup, ToggleGroupItem } from '@askrjs/themes/components';

<Toggle pressed={bold()} onPressedChange={bold.set}>Bold</Toggle>
<ToggleGroup type="single" value={alignment()} onValueChange={alignment.set}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
</ToggleGroup>`,
    ],
    [
      /Dialog|Drawer|Sheet/,
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
      /Popover|Hover Card|Tooltip/,
      `import { Button, Popover, PopoverContent, PopoverTrigger } from '@askrjs/themes/components';

<Popover>
  <PopoverTrigger asChild><Button variant="outline">Filters</Button></PopoverTrigger>
  <PopoverContent><ProjectFilters /></PopoverContent>
</Popover>`,
    ],
    [
      /Menu|Menubar/,
      `import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '@askrjs/themes/components';

<Dropdown>
  <DropdownTrigger aria-label="Project actions">Actions</DropdownTrigger>
  <DropdownContent>
    <DropdownItem onSelect={archive}>Archive</DropdownItem>
    <DropdownItem onSelect={duplicate}>Duplicate</DropdownItem>
  </DropdownContent>
</Dropdown>`,
    ],
    [
      /Tabs/,
      `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@askrjs/themes/components';

<Tabs value={tab()} onValueChange={tab.set}>
  <TabsList aria-label="Project sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview"><ProjectOverview /></TabsContent>
  <TabsContent value="activity"><ProjectActivity /></TabsContent>
</Tabs>`,
    ],
    [
      /Table|Data Table|Virtual/,
      `import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@askrjs/themes/components';

<Table>
  <TableHead><TableRow><TableHeaderCell>Name</TableHeaderCell><TableHeaderCell>Status</TableHeaderCell></TableRow></TableHead>
  <TableBody>{projects.map((project) => (
    <TableRow key={project.id}><TableCell>{project.name}</TableCell><TableCell>{project.status}</TableCell></TableRow>
  ))}</TableBody>
</Table>`,
    ],
    [
      /Accordion|Collapsible/,
      `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@askrjs/themes/components';

<Accordion type="single" collapsible>
  <AccordionItem value="billing">
    <AccordionTrigger>How billing works</AccordionTrigger>
    <AccordionContent>Usage is calculated per workspace.</AccordionContent>
  </AccordionItem>
</Accordion>`,
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
  <Toast open={saved()} onOpenChange={saved.set}>
    <ToastTitle>Project saved</ToastTitle>
    <ToastDescription>Your changes are now visible.</ToastDescription>
  </Toast>
</ToastHost>`,
    ],
    [
      /Card|Avatar|Item|Typography|Display|Layout|Chrome/,
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
  return {
    intro: `${page.title} should use the standard themed surface unless the application is deliberately implementing its own design system on top of @askrjs/ui.`,
    steps,
    code,
  };
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
  route('/projects/:projectId', ProjectPage);
});

await createSPA({ root: document.getElementById('app')!, registry });`,
    ],
    [
      /^Add SSR to an SPA$/,
      'Reuse the SPA route registry on the server, serialize its initial data into the document, and switch the browser entry from createSPA to hydrateSPA.',
      `import { hydrateSPA } from '@askrjs/askr/boot';
import { renderToString } from '@askrjs/askr/ssr';

// Server entry
const rendered = await renderToString({ registry, url: request.url });

// Browser entry
await hydrateSPA({ root: document.getElementById('app')!, registry });`,
    ],
    [
      /^Build an Authenticated Full-Stack App$/,
      'Resolve the session on the server, enforce permissions at both route and handler boundaries, and expose only the principal data needed for rendering.',
      `import { createAuth, requirePermission, requireUser } from '@askrjs/auth';

const auth = createAuth({ sessions: sessionStore, principals: principalStore });
const canManageProjects = [requireUser(), requirePermission('projects:write')];

router.post('/projects', ...canManageProjects, createProject);`,
    ],
    [
      /^Build an API-Only Server$/,
      'Compose a context-first router, validate every external input, and return explicit response helpers from handlers.',
      `import { createRouter, created, notFound, ok } from '@askrjs/server';

export const router = createRouter()
  .get('/projects/:id', async (context) => {
    const project = await context.dependencies.projects.get(context.params.id);
    return project ? ok(project) : notFound();
  })
  .post('/projects', async (context) => created(
    await context.dependencies.projects.create(await context.bind<CreateProjectInput>())
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
  status: route.query.status ?? 'active',
  page: Number(route.query.page ?? 1),
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
      `import { requirePermission, requireUser } from '@askrjs/auth';

const canReadBilling = [requireUser(), requirePermission('billing:read')];

route('/billing', BillingPage, { auth: { requirements: canReadBilling } });
router.get('/api/billing', ...canReadBilling, getBilling);`,
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
      `<form method="post" action="/artifacts" enctype="multipart/form-data">
  <label for="artifact">Build artifact</label>
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
      `import { state } from '@askrjs/askr';

it('should show the new quantity given increment when clicked', () => {
  const quantity = state(1);
  quantity.set(quantity() + 1);
  expect(quantity()).toBe(2);
});`,
    ],
    [
      /Production Readiness/,
      'Verify the locked published packages, tests, production renderer, generated routes, and deployment fallback in the same order CI uses.',
      `npm ci
npm run lint
npm run test
npm run build
npm run verify:static`,
    ],
    [
      /Migration from React/,
      'Move local values to state, computed values to derive, and effect-owned asynchronous work to cancellable resources before changing routing or rendering mode.',
      `import { derive, state } from '@askrjs/askr';
import { resource } from '@askrjs/askr/resources';

const projectId = state(initialProjectId);
const project = resource(({ signal }) => loadProject(projectId(), signal), [projectId]);
const title = derive(() => project.data?.name ?? 'Loading project');`,
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

<Show when={project()} fallback={<ProjectSkeleton />}>
  {(project) => <ProjectDetails project={project} />}
</Show>

<Match value={status()}>
  <Case when="ready"><ReadyState /></Case>
  <Case when="failed"><FailureState /></Case>
</Match>`,
    ],
    [
      /Scopes/,
      'Define a typed scope once, provide it at the ownership boundary, and read it only from descendants that require the service.',
      `import { defineScope, readScope } from '@askrjs/askr';

const ProjectsScope = defineScope<ProjectsService>(defaultProjects);

<ProjectsScope value={projects}>
  <ProjectRoutes />
</ProjectsScope>

const projects = readScope(ProjectsScope);`,
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
      `const projectRoute = route('/projects/:projectId', ProjectPage);

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
const status = () => route.query.status ?? 'active';

updateRouteQuery({ status: 'paused', page: 1 });`,
    ],
    [
      /Loaders and Deferred/,
      'Return critical loader data directly and wrap slower independent work in defer so the page can stream a stable shell.',
      `import { defer } from '@askrjs/askr/router';

route('/projects/:projectId', ProjectPage, {
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
  policy: ({ auth }) =>
    auth.permissions.includes('admin') ? allow() : forbidden(),
});`,
    ],
    [
      /Route Metadata/,
      'Attach title and description metadata to the route so SSG and browser navigation use the same document contract.',
      `route('/projects/:projectId', ProjectPage, {
  meta: ({ data }) => ({
    title: data.project.name + ' | Projects',
    description: data.project.summary,
  }),
});`,
    ],
    [
      /Mutations and Invalidation/,
      'Describe the write, the cache prefixes it affects, and whether successful writes invalidate those prefixes.',
      `import { createMutation } from '@askrjs/askr/data';

const renameProject = createMutation({
  action: ({ id, name }, { signal }) => api.projects.rename(id, name, { signal }),
  affects: ({ id }) => ['project:' + id, 'projects'],
  afterSuccess: 'invalidate',
});

await renameProject.execute({ id, name });`,
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
  <Field><FieldLabel for="name">Name</FieldLabel><Input id="name" name="name" required /></Field>
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
      `router.get('/projects/:id', async (context) => {
  const project = await context.dependencies.projects.get(context.params.id);
  return project ? ok(project) : notFound();
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
  save(new FormData(event.currentTarget));
}}>
  <label for="name">Project name</label>
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

expect(matchRoute('/projects/p1', { routes: registry.routes })?.params.id).toBe('p1');
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
  return { intro: match[1], steps: sharedSteps(page), code: match[2] };
}

export function buildUsageGuide(
  page: DocsPageDefinition,
  exactExample?: string
): UsageGuideDefinition {
  if (exactExample) {
    return {
      intro: `Start with this complete ${page.title.toLowerCase()} shape, then replace the example data and application service with your own.`,
      steps: sharedSteps(page),
      code: exactExample,
    };
  }

  const focusedGuide = topicGuide(page);
  if (focusedGuide) return focusedGuide;

  if (page.navGroup === 'Getting Started') {
    return {
      intro:
        'Create a readable starter, run it unchanged, and make one small production build after the first route works.',
      steps: [
        'Choose startkit for the recommended product baseline; choose spa, ssr, ssg, or full-stack only when that delivery boundary is already known.',
        'Run the generated application and read its route registry, scripts, and route-tree test before editing them.',
        'Add one page, update the expected route set, then build and preview the real output.',
      ],
      code: `npx @askrjs/cli@0.0.5 create startkit my-app
cd my-app
npm run dev
npm run build`,
    };
  }

  if (page.navGroup === 'Fundamentals') {
    return {
      intro:
        'Put reactive state inside the component that owns the interaction and derive display values from it during render.',
      steps: sharedSteps(page),
      code: `import { derive, state } from '@askrjs/askr';

export function Quantity() {
  const count = state(1);
  const label = derive(() => 'Quantity: ' + count());

  return <button onClick={() => count.set(count() + 1)}>{label()}</button>;
}`,
    };
  }

  if (page.navSection === 'Routing') {
    return {
      intro:
        'Register a route once and let the same registry drive browser navigation, SSR, and static generation.',
      steps: sharedSteps(page),
      code: `import { createRouteRegistry, group, route } from '@askrjs/askr/router';

export const registry = createRouteRegistry(() => {
  group({ layout: AppLayout }, () => {
    route('/', HomePage);
    route('/projects/:projectId', ProjectPage);
  });
});`,
    };
  }

  if (page.navSection === 'Data') {
    return {
      intro:
        'Define the cache key and cancellable fetch contract once, then create the query where a component needs the result.',
      steps: sharedSteps(page),
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
      steps: sharedSteps(page),
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
      steps: sharedSteps(page),
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
        'Define an executable schema once and reuse its jsonSchema representation in the HTTP contract and generated-client workflow.',
      steps: sharedSteps(page),
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
      steps: sharedSteps(page),
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
      steps: sharedSteps(page),
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
      steps: sharedSteps(page),
      code: `import { createRouter, created } from '@askrjs/server';

export const router = createRouter().post('/projects', async (context) => {
  const input = await context.bind<CreateProjectInput>();
  const project = await context.dependencies.projects.create(input);
  return created(project);
});`,
    };
  }

  if (page.navSection === 'Charts') {
    return {
      intro:
        'Create a typed plot factory once, give the root stable row data, and compose only the scales, marks, and interactions the chart needs.',
      steps: sharedSteps(page),
      code: `import { createPlot } from '@askrjs/charts';

const Plot = createPlot<ProjectRow>();

<Plot.Root data={rows} rowKey={(row) => row.id} label="Revenue by day">
  <Plot.Axis axis="x" />
  <Plot.Axis axis="y" />
  <Plot.Line x="createdAt" y="revenue" />
</Plot.Root>`,
    };
  }

  if (page.navGroup === 'UI & Components') {
    return componentGuide(page);
  }

  if (page.navGroup === 'Tooling') {
    return {
      intro:
        'Run the published CLI through the project package boundary and review generated artifacts before committing them.',
      steps: sharedSteps(page),
      code: `npx @askrjs/cli@0.0.5 add page audit-log
npx @askrjs/cli@0.0.5 add action approve-request --route /requests/{id}
npx @askrjs/cli@0.0.5 openapi --check
npx @askrjs/cli@0.0.5 ssg --config ./ssg.config.ts --output ./dist`,
    };
  }

  if (page.navGroup === 'Guides') {
    return {
      intro:
        'Start from an explicit route registry and add one application boundary at a time so browser, server, and production behavior stay testable.',
      steps: sharedSteps(page),
      code: `export const registry = createRouteRegistry(() => {
  group({ layout: AppLayout }, () => {
    route('/', DashboardPage);
    route('/projects/:projectId', ProjectPage);
    route('/404', NotFoundPage);
  });
});`,
    };
  }

  if (page.navGroup === 'Reference') {
    const importPath = page.packages[0]?.importPath ?? '@askrjs/askr';
    return {
      intro:
        'Import only the entrypoint that owns the API. Use generated reference pages for exact signatures and this guide for behavioral constraints.',
      steps: sharedSteps(page),
      code: `import * as api from '${importPath}';

// Stay on the published entrypoint instead of reaching into dist/ or src/.
const availableExports = Object.keys(api);`,
    };
  }

  return {
    intro:
      'Begin at the owning package boundary, keep the application contract explicit, and verify the generated or server result before adding abstraction.',
    steps: sharedSteps(page),
    code: `import { state } from '@askrjs/askr';

const ready = state(false);
ready.set(true);`,
  };
}
