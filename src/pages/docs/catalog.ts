import { apiManifest } from './api-manifest';
import { headingOverrides } from './content-overrides';
import { docsPrimarySections } from './primary-sections';
import { packageVersions } from './package-versions';
import type {
  DocsHeadingDefinition,
  DocsPageDefinition,
  DocsSearchRecord,
  DocsSectionDefinition,
  DocsStatus,
  PackageReference,
} from './types';

function slug(value: string): string {
  return value
    .replace(/&/g, 'and')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function packageReference(
  name: keyof typeof packageVersions,
  importPath?: string
): PackageReference {
  return {
    name: `@askrjs/${name}`,
    version: packageVersions[name],
    importPath: importPath ?? `@askrjs/${name}`,
  };
}

const pageLoader = () => import('./page');
const apiLoader = () => import('./api-page');

type PageInput = {
  title: string;
  path?: string;
  description?: string;
  headings?: readonly (string | DocsHeadingDefinition)[];
  keywords?: readonly string[];
  aliases?: readonly string[];
  packages?: readonly PackageReference[];
  status?: DocsStatus;
  loader?: DocsPageDefinition['loader'];
};

function guidance(group: string, title: string, heading: string): string {
  const subject = title.toLowerCase();
  const topic = heading.toLowerCase();
  if (/install|import|runtime requirement|package/.test(topic)) {
    return `Install only the package that owns ${subject}, then import from its published entrypoint. Keep the version aligned with package-lock.json so the example, declaration files, and runtime behavior describe the same release.`;
  }
  if (/keyboard|accessibility|aria|focus|dismissal/.test(topic)) {
    return `Exercise ${subject} without a pointer: move focus into the feature, complete its primary action, cancel it, and return focus to the trigger. Supply an accessible name in application code and test the final themed markup with a screen reader.`;
  }
  if (/state|controlled|selection|view/.test(topic)) {
    return `Choose one owner for ${subject} state. Pass the current value down, handle changes at that owner, and derive display-only values instead of copying them into another state cell. This keeps rerenders and URL or server synchronization predictable.`;
  }
  if (/error|failure|rejected|empty|pending|loading/.test(topic)) {
    return `Handle this state next to the ${subject} operation that can produce it. Preserve the last useful context, expose a retry or recovery action, and avoid turning cancellation or an expected empty result into an application error.`;
  }
  if (/server|ssr|stream|hydrate|static|document/.test(topic)) {
    return `Keep the first ${subject} render deterministic. Read request data before rendering, serialize only the data the browser needs, and move DOM-only work into lifecycle-owned tasks so generated or server markup can hydrate without replacement.`;
  }
  if (/route|path|navigation|url|redirect|policy/.test(topic)) {
    return `Declare this ${subject} behavior in the route registry, not inside an unrelated component. Build destinations from route parameters, keep URL-owned state in the URL, and enforce access decisions on the server path as well as during browser navigation.`;
  }
  if (/production|verify|checklist|test|diagnostic/.test(topic)) {
    return `Verify ${subject} at its real boundary: test the success path, the failure or cancellation path, keyboard behavior where applicable, and the production build. For SSR or SSG, inspect the generated HTML before relying on hydration.`;
  }
  if (/overview|purpose|goal|when to|choosing|selection/.test(topic)) {
    return `${title} belongs to the ${group.toLowerCase()} layer. Use it when that layer owns the lifecycle or contract; keep simpler local behavior in state or ordinary components, and move network or request authority to the server boundary.`;
  }
  return `Implement ${heading.toLowerCase()} at the ${subject} boundary: make inputs visible at the call site, keep cleanup with the work that created it, and render the success, unavailable, and failure states where a user can act on them.`;
}

function heading(
  group: string,
  pageTitle: string,
  value: string | DocsHeadingDefinition,
  route?: string
) {
  if (typeof value !== 'string') return value;
  const id = slug(value);
  const override = route ? headingOverrides[route]?.[id] : undefined;
  return {
    id,
    title: value,
    body: override ?? guidance(group, pageTitle, value),
  };
}

function definePage(
  group: string,
  section: string | undefined,
  root: string,
  input: PageInput
): DocsPageDefinition {
  const route = (
    input.path === ''
      ? `/docs/${root}`
      : `/docs/${root}/${input.path ?? slug(input.title)}`
  ) as `/docs${string}`;
  const headings = (
    input.headings ?? ['Overview', 'Working contract', 'Production checklist']
  ).map((value) => heading(group, input.title, value, route));
  return {
    route,
    title: input.title,
    description:
      input.description ??
      `Use ${input.title.toLowerCase()} with the current published Askr packages.`,
    navGroup: group,
    navSection: section,
    status: input.status ?? 'stable',
    packages: input.packages ?? [packageReference('askr')],
    headings,
    keywords: input.keywords ?? [],
    aliases: input.aliases,
    loader: input.loader ?? pageLoader,
  };
}

function sectionPages(
  group: string,
  section: string,
  root: string,
  inputs: readonly PageInput[]
) {
  return inputs.map((input) => definePage(group, section, root, input));
}

const gettingStarted = sectionPages(
  'Getting Started',
  'Start here',
  'getting-started',
  [
    {
      title: 'Getting Started',
      path: '',
      description: 'Install Askr, choose a starter, and ship a first route.',
      headings: [
        'Overview',
        'Prerequisites',
        'The shortest path',
        'Where to go next',
      ],
      keywords: ['install', 'starter', 'first app'],
    },
    {
      title: 'Overview',
      headings: [
        'What Askr owns',
        'What your application owns',
        'Published package baseline',
      ],
    },
    {
      title: 'Installation',
      headings: [
        'Runtime requirements',
        'Create with the CLI',
        'Install packages directly',
        'Verify the install',
      ],
      packages: [packageReference('cli')],
    },
    {
      title: 'Create a Project and Choose a Starter',
      path: 'choose-a-starter',
      headings: [
        'Starter matrix',
        'Product prompts',
        'Readable output',
        'Selection checklist',
      ],
      packages: [packageReference('cli')],
    },
    {
      title: 'First Application',
      headings: [
        'Create the project',
        'Register a route',
        'Add state',
        'Build the application',
      ],
    },
    {
      title: 'Project Structure and Conventions',
      path: 'project-structure',
      headings: [
        'Composition root',
        'Pages and routes',
        'Server boundary',
        'Tests and generated artifacts',
      ],
    },
    {
      title: 'Choosing an Application Mode',
      path: 'application-modes',
      headings: ['SPA', 'SSR', 'SSG', 'Full stack and startkit'],
    },
  ]
);

const fundamentals = sectionPages(
  'Fundamentals',
  'Runtime model',
  'core-concepts',
  [
    {
      title: 'Core Concepts',
      path: '',
      description:
        'Understand components, state, scopes, lifecycle work, and deterministic rendering.',
      headings: [
        'Components are functions',
        'State is explicit',
        'Routes compose the application',
        'Rendering stays deterministic',
      ],
    },
    {
      title: 'Components and JSX',
      headings: [
        'Function components',
        'Props and children',
        'JSX runtime',
        'Composition',
      ],
    },
    {
      title: 'State and Derived Values',
      headings: [
        'Create state',
        'Read and update state',
        'Derived values',
        'Selectors and subscriptions',
      ],
      keywords: ['state', 'derive', 'selector'],
    },
    {
      title: 'Lists with For',
      path: 'lists-with-for',
      headings: [
        'Keyed lists',
        'Identity and reordering',
        'Empty collections',
        'List performance',
      ],
      keywords: ['For'],
    },
    {
      title: 'Conditional Rendering',
      headings: ['Show', 'Match', 'Case', 'Fallback content'],
      keywords: ['Show', 'Match', 'Case'],
    },
    {
      title: 'Scopes',
      headings: [
        'Define a scope',
        'Provide values',
        'Read values',
        'Ownership and cleanup',
      ],
      keywords: ['defineScope', 'readScope'],
    },
    {
      title: 'Component Lifecycle Work',
      path: 'lifecycle-work',
      headings: [
        'Resources and tasks',
        'Events and streams',
        'Timers',
        'Cancellation and cleanup',
      ],
      packages: [packageReference('askr', '@askrjs/askr/resources')],
    },
    {
      title: 'Error Boundaries',
      headings: ['Failure ownership', 'Fallback UI', 'Recovery', 'Reporting'],
    },
    {
      title: 'Determinism and Runtime Rules',
      path: 'determinism',
      headings: [
        'Render purity',
        'Stable initial state',
        'Browser-only work',
        'Hydration diagnostics',
      ],
    },
  ]
);

const routing = sectionPages('Routing & Data', 'Routing', 'routing', [
  {
    title: 'Routing',
    path: '',
    description:
      'Define typed routes, layouts, navigation, loaders, policies, and metadata.',
    headings: [
      'Route registry',
      'Route groups',
      'Navigation lifecycle',
      'Delivery modes',
    ],
    packages: [packageReference('askr', '@askrjs/askr/router')],
  },
  {
    title: 'Definitions and Layouts',
    headings: [
      'Route definitions',
      'Groups and layouts',
      'Nested pages',
      'Fallback routes',
    ],
  },
  {
    title: 'Paths, Parameters, and Destinations',
    path: 'paths-and-parameters',
    headings: [
      'Static and dynamic segments',
      'Typed parameters',
      'Route destinations',
      'Not found behavior',
    ],
  },
  {
    title: 'Navigation and URL State',
    path: 'navigation-and-url-state',
    headings: [
      'Link and navigate',
      'Search parameters',
      'History and scroll',
      'Active route state',
    ],
  },
  {
    title: 'Loaders and Deferred Values',
    path: 'loaders-and-deferred',
    headings: [
      'Route loaders',
      'Deferred values',
      'Pending and rejected states',
      'Cancellation',
    ],
  },
  {
    title: 'Access Policies',
    headings: [
      'Policy decisions',
      'Authentication context',
      'Redirects and denials',
      'Server enforcement',
    ],
  },
  {
    title: 'Route Metadata',
    headings: [
      'Static metadata',
      'Dynamic metadata',
      'Head reconciliation',
      'SSG metadata',
    ],
  },
]);

const data = sectionPages('Routing & Data', 'Data', 'data', [
  {
    title: 'Data',
    path: '',
    description:
      'Choose resources, queries, mutations, and actions by ownership and consistency needs.',
    headings: [
      'Primitive selection',
      'Local lifecycle work',
      'Shared server data',
      'Writes and invalidation',
    ],
  },
  {
    title: 'Choosing a Primitive',
    headings: ['State', 'Resource', 'Query', 'Action or mutation'],
  },
  {
    title: 'Resources',
    headings: [
      'Resource ownership',
      'Dependencies',
      'Pending and failure state',
      'Cancellation',
    ],
    packages: [packageReference('askr', '@askrjs/askr/resources')],
  },
  {
    title: 'Queries and Consistency',
    headings: [
      'Define a query',
      'Consistency modes',
      'Query scopes',
      'Refresh behavior',
    ],
    packages: [packageReference('askr', '@askrjs/askr/data')],
  },
  {
    title: 'Mutations and Invalidation',
    headings: [
      'Create a mutation',
      'Write lifecycle',
      'Targeted invalidation',
      'Optimistic UI',
    ],
    packages: [packageReference('askr', '@askrjs/askr/data')],
  },
  {
    title: 'Server Queries and Preloading',
    path: 'server-queries',
    headings: [
      'Define server queries',
      'Register handlers',
      'Prefetch',
      'Dehydrate and hydrate',
    ],
  },
  {
    title: 'Page Actions and Forms',
    path: 'actions-and-forms',
    headings: [
      'Action contract',
      'Form submission',
      'Validation failures',
      'Redirects and revalidation',
    ],
    packages: [packageReference('askr', '@askrjs/askr/actions')],
  },
]);

const rendering = sectionPages('Rendering', 'Rendering', 'rendering', [
  {
    title: 'Rendering',
    path: '',
    description:
      'Choose client, server, streaming, hydration, or static delivery without changing the component model.',
    headings: [
      'Delivery matrix',
      'Shared application model',
      'Document ownership',
      'Selection checklist',
    ],
  },
  {
    title: 'Client Rendering and Islands',
    path: 'client-and-islands',
    headings: [
      'SPA boot',
      'Client boundaries',
      'Island ownership',
      'When to choose client rendering',
    ],
  },
  {
    title: 'Server-Side Rendering',
    path: 'server-side-rendering',
    headings: [
      'Render requests',
      'Document composition',
      'Data transfer',
      'Operational boundaries',
    ],
    packages: [packageReference('askr', '@askrjs/askr/ssr')],
  },
  {
    title: 'Streaming and Deferred Boundaries',
    path: 'streaming',
    headings: [
      'Streaming lifecycle',
      'Deferred boundaries',
      'Failure handling',
      'Proxy buffering',
    ],
  },
  {
    title: 'Hydration',
    headings: [
      'Adopt server markup',
      'Deterministic first render',
      'Event attachment',
      'Mismatch diagnostics',
    ],
  },
  {
    title: 'Selective Hydration',
    status: 'limited',
    headings: [
      'Boundary selection',
      'Priority',
      'Interaction activation',
      'Fallback behavior',
    ],
  },
  {
    title: 'Static Site Generation',
    path: 'static-site-generation',
    headings: [
      'Static registry',
      'Document rendering',
      'Assets and output',
      '404 and hosting',
    ],
    packages: [
      packageReference('askr', '@askrjs/askr/ssg'),
      packageReference('cli'),
    ],
  },
]);

const server = sectionPages('Server & APIs', 'Server', 'server', [
  {
    title: 'Server',
    path: '',
    description:
      'Build a context-first HTTP application with explicit routing, middleware, actions, realtime, and probes.',
    headings: [
      'Application and router',
      'Context-first handlers',
      'Response helpers',
      'Production boundary',
    ],
    packages: [packageReference('server')],
  },
  {
    title: 'HTTP Routing',
    headings: [
      'Create a router',
      'Define routes',
      'Path parameters',
      'Route composition',
    ],
    packages: [packageReference('server', '@askrjs/server/router')],
  },
  {
    title: 'Context and Responses',
    headings: [
      'Server context',
      'Request state',
      'Response helpers',
      'Problem details',
    ],
  },
  {
    title: 'Request Binding',
    headings: [
      'Bind from context',
      'Supported inputs',
      'Binding errors',
      'Validation boundary',
    ],
    keywords: ['bind'],
  },
  {
    title: 'Middleware and Security',
    headings: [
      'Middleware order',
      'Security headers',
      'Cookies and redirects',
      'Error handling',
    ],
    packages: [packageReference('server', '@askrjs/server/middleware')],
  },
  {
    title: 'Server Actions',
    headings: [
      'Native action requests',
      'Binding and validation',
      'Action responses',
      'Page integration',
    ],
  },
  {
    title: 'Realtime',
    headings: [
      'Server-sent events',
      'Event formatting',
      'WebSocket adapters',
      'Cancellation and cleanup',
    ],
  },
  {
    title: 'Probes',
    headings: [
      'Liveness',
      'Readiness',
      'Dependency checks',
      'Operational responses',
    ],
  },
]);

const auth = sectionPages('Server & APIs', 'Authentication', 'authentication', [
  {
    title: 'Authentication',
    path: '',
    headings: [
      'Identity model',
      'Session boundary',
      'Browser and API clients',
      'Failure behavior',
    ],
    packages: [
      packageReference('auth'),
      packageReference('server', '@askrjs/server/auth'),
    ],
  },
  {
    title: 'Model and Sessions',
    headings: [
      'Authentication context',
      'Session storage',
      'Cookies',
      'Sign out and expiry',
    ],
  },
  {
    title: 'Authorization Requirements',
    path: 'authorization',
    headings: [
      'Route requirements',
      'Policy evaluation',
      'Unauthorized and forbidden',
      'Server enforcement',
    ],
  },
  {
    title: 'JWT',
    headings: [
      'Token verification',
      'Claims and clocks',
      'Key selection',
      'Failure handling',
    ],
    packages: [packageReference('auth', '@askrjs/auth/jwt')],
  },
  {
    title: 'OIDC',
    headings: [
      'Discovery',
      'Authorization flow',
      'Callback validation',
      'Session establishment',
    ],
    packages: [packageReference('auth', '@askrjs/auth/oidc')],
  },
  {
    title: 'Framework Auth Routes',
    path: 'framework-routes',
    headings: [
      '/auth/v1 contract',
      'Login and callback',
      'Session and logout',
      'Safe redirects',
    ],
  },
]);

const contracts = sectionPages(
  'Server & APIs',
  'HTTP Contracts',
  'http-contracts',
  [
    {
      title: 'HTTP Contracts',
      path: '',
      headings: [
        'Endpoint descriptors',
        'Typed client boundary',
        'Schemas',
        'OpenAPI artifacts',
      ],
      packages: [
        packageReference('fetch'),
        packageReference('schema'),
        packageReference('server', '@askrjs/server/openapi'),
      ],
    },
    {
      title: 'Typed Clients',
      headings: [
        'Define endpoints',
        'Create a client',
        'Typed input',
        'Typed output',
      ],
      packages: [packageReference('fetch')],
    },
    {
      title: 'Results, Errors, and Cancellation',
      path: 'results-and-errors',
      headings: [
        'Result handling',
        'Problem responses',
        'Abort signals',
        'Retries',
      ],
    },
    {
      title: 'Codecs and Serialization',
      path: 'codecs',
      headings: [
        'Request encoding',
        'Response decoding',
        'Dates and custom values',
        'Failure diagnostics',
      ],
    },
    {
      title: 'Client Middleware',
      headings: [
        'Middleware pipeline',
        'Authentication headers',
        'Tracing',
        'Retry policy',
      ],
      packages: [packageReference('fetch', '@askrjs/fetch/middleware')],
    },
    {
      title: 'Schemas',
      headings: [
        'Schema construction',
        'Safe parsing',
        'jsonSchema',
        'Error reporting',
      ],
      packages: [packageReference('schema')],
      keywords: ['jsonSchema'],
    },
    {
      title: 'OpenAPI',
      headings: [
        'Authoring operations',
        'jsonSchema contract',
        'Generate and check',
        'Client generation',
      ],
      packages: [
        packageReference('server', '@askrjs/server/openapi'),
        packageReference('cli'),
      ],
    },
  ]
);

const mcp = sectionPages('Server & APIs', 'MCP', 'mcp', [
  {
    title: 'MCP',
    path: '',
    headings: [
      'Server model',
      'Tools and resources',
      'Transports',
      'Operational checklist',
    ],
    packages: [
      packageReference('server', '@askrjs/server/mcp'),
      packageReference('node', '@askrjs/node/mcp'),
    ],
  },
  {
    title: 'Primitives',
    headings: ['Tools', 'Resources', 'Resource templates', 'Prompts'],
  },
  {
    title: 'Schemas, Auth, Context, and Progress',
    path: 'context-and-progress',
    headings: [
      'Input schemas',
      'Authorization',
      'Handler context',
      'Progress notifications',
    ],
  },
  {
    title: 'HTTP Transport',
    headings: [
      'HTTP requests',
      'Responses',
      'Protected resource metadata',
      'Deployment',
    ],
  },
  {
    title: 'SSE Transport',
    headings: [
      'Event stream',
      'Reconnect behavior',
      'Cancellation',
      'Proxy configuration',
    ],
  },
  {
    title: 'Sessions',
    headings: [
      'Session identity',
      'State ownership',
      'Expiry',
      'Horizontal scaling',
    ],
  },
  {
    title: 'Stdio Transport',
    headings: [
      'Node adapter',
      'Input and output',
      'Process lifecycle',
      'Diagnostics',
    ],
  },
]);

const services = sectionPages(
  'Server & APIs',
  'Platform Services',
  'platform-services',
  [
    {
      title: 'Platform Services',
      path: '',
      headings: [
        'Node runtime',
        'Internationalization',
        'Telemetry',
        'Composition',
      ],
    },
    {
      title: 'Node Runtime',
      headings: [
        'Server adapter',
        'MCP adapter',
        'Signals and shutdown',
        'Deployment',
      ],
      packages: [packageReference('node')],
    },
    {
      title: 'Internationalization',
      headings: [
        'Locale ownership',
        'Message lookup',
        'Formatting',
        'SSR consistency',
      ],
      packages: [packageReference('i18n')],
    },
    {
      title: 'OpenTelemetry',
      headings: [
        'Instrumentation boundary',
        'Spans and fields',
        'Redaction',
        'Exporter setup',
      ],
      packages: [packageReference('otel')],
    },
  ]
);

const componentStructure = [
  'Purpose',
  'Install and import',
  'Live examples',
  'Anatomy',
  'State model',
  'Keyboard and accessibility',
  'Styling and tokens',
  'API',
  'Edge cases',
  'Related pages',
] as const;

type ComponentPageInput = PageInput & {
  title: string;
  /** Real @askrjs/ui subpath exports this page covers. Omit (or leave empty)
   *  when no headless primitive ships for this component — several themed
   *  components (Tabs, Sidebar, Card, Badge, Combobox, ...) have no
   *  @askrjs/ui counterpart at all. */
  ui?: readonly string[];
  /** Real @askrjs/themes subpath exports this page covers. */
  themes?: readonly string[];
};

function componentPages(
  section: string,
  inputs: readonly (string | ComponentPageInput)[]
) {
  return inputs.map((value) => {
    const input = typeof value === 'string' ? { title: value } : value;
    const uiPackages = (input.ui ?? []).length
      ? input.ui!.map((path) => packageReference('ui', `@askrjs/ui/${path}`))
      : input.ui
        ? []
        : [packageReference('ui')];
    const themesPackages = (input.themes ?? []).length
      ? input.themes!.map((path) =>
          packageReference('themes', `@askrjs/themes/${path}`)
        )
      : [packageReference('themes')];
    return definePage('UI & Components', section, 'components', {
      ...input,
      headings: input.headings ?? componentStructure,
      packages: input.packages ?? [...uiPackages, ...themesPackages],
    });
  });
}

const componentsLanding = definePage(
  'UI & Components',
  'Foundations',
  'components',
  {
    title: 'UI and Components',
    path: '',
    description:
      'Compose headless behavior with theme-owned appearance, accessible structures, and explicit state.',
    headings: [
      'Headless and themed layers',
      'Package boundaries',
      'Component page contract',
      'Experimental families',
    ],
    packages: [packageReference('ui'), packageReference('themes')],
  }
);
// Foundations pages are conceptual (design-system topics), not single
// components, so they stay on the package roots rather than a fabricated
// per-topic subpath.
const foundations = componentPages('Foundations', [
  'Headless versus Themed',
  'Composition and Accessibility',
  'Theme Tokens, Modes, and Direction',
  'Customization',
  'Structures',
  'Portals and Layers',
  'Collections',
  'Interaction Policies',
  'Focus and Dismissal',
  'Controlled State',
  'ARIA and Ref Utilities',
  {
    title: 'Icon Contract',
    // The data-slot="icon" / data-decorative / sizing-token contract this
    // page documents is implemented by @askrjs/lucide, not by @askrjs/ui or
    // @askrjs/themes — themes only consumes it via [data-slot="icon"]
    // selectors in its default theme CSS.
    packages: [
      packageReference('ui'),
      packageReference('themes'),
      packageReference('lucide'),
    ],
  },
]);
const controls = componentPages('Forms and controls', [
  {
    title: 'Button and Button Group',
    ui: ['button'],
    themes: ['button', 'button-group'],
  },
  { title: 'Input', ui: ['input'], themes: ['input'] },
  { title: 'Textarea', ui: ['textarea'], themes: ['textarea'] },
  { title: 'Checkbox', ui: ['checkbox'], themes: ['checkbox'] },
  { title: 'Radio Group', ui: ['radio-group'], themes: ['radio-group'] },
  { title: 'Select', ui: ['select'], themes: ['select'] },
  { title: 'Slider', ui: ['slider'], themes: ['slider'] },
  { title: 'Switch', ui: ['switch'], themes: ['switch'] },
  {
    title: 'Toggle Family',
    ui: ['toggle', 'toggle-group'],
    themes: ['toggle', 'toggle-group'],
  },
  {
    title: 'Form, Label, Field, and Input Group',
    ui: ['form', 'label'],
    themes: ['form', 'label', 'field', 'input-group'],
  },
]);
// These three have no @askrjs/ui headless primitive at all — they exist
// only as themed components, which is the actual reason they're marked
// experimental rather than a documentation placeholder.
const experimentalControls = componentPages('Experimental controls', [
  {
    title: 'Combobox and Command',
    status: 'experimental',
    ui: [],
    themes: ['combobox', 'command'],
  },
  {
    title: 'Calendar and Date Picker',
    status: 'experimental',
    ui: [],
    themes: ['calendar', 'date-picker'],
  },
  {
    title: 'Native Select and Input OTP',
    status: 'experimental',
    ui: [],
    themes: ['native-select', 'input-otp'],
  },
]);
const overlays = componentPages('Overlays', [
  { title: 'Dialog', ui: ['dialog'], themes: ['dialog'] },
  { title: 'Alert Dialog', ui: ['alert-dialog'], themes: ['alert-dialog'] },
  { title: 'Popover', ui: ['popover'], themes: ['popover'] },
  { title: 'Hover Card', ui: ['hover-card'], themes: ['hover-card'] },
  { title: 'Tooltip', ui: ['tooltip'], themes: ['tooltip'] },
  {
    title: 'Menu, Dropdown, and Context Menu',
    ui: ['menu', 'dropdown'],
    themes: ['dropdown-menu', 'context-menu'],
  },
  {
    title: 'Drawer and Sheet',
    status: 'experimental',
    ui: [],
    themes: ['drawer', 'sheet'],
  },
]);
const navigation = componentPages('Navigation and chrome', [
  { title: 'Menubar', ui: ['menubar'], themes: ['menubar'] },
  { title: 'Tabs', ui: [], themes: ['tabs'] },
  { title: 'Sidebar', ui: [], themes: ['sidebar'] },
  { title: 'Navbar and Navigation Menu', ui: [], themes: ['navigation-menu'] },
  {
    title: 'Breadcrumb and Pagination',
    ui: [],
    themes: ['breadcrumb', 'pagination'],
  },
  { title: 'Application Chrome', ui: [], themes: [] },
]);
const dataLayout = componentPages('Data and layout', [
  { title: 'Table', ui: ['table'], themes: ['table'] },
  { title: 'Data Table', ui: [], themes: ['data-table'] },
  { title: 'Virtual List', ui: ['virtual-list'], themes: [] },
  { title: 'Virtual Table', ui: ['virtual-table'], themes: [] },
  { title: 'Scroll Area', ui: ['scroll-area'], themes: ['scroll-area'] },
  { title: 'Card', ui: [], themes: ['card'] },
  { title: 'Avatar and Item', ui: ['avatar'], themes: ['avatar', 'item'] },
  {
    title: 'Typography and Display Primitives',
    ui: [],
    themes: ['typography'],
  },
  { title: 'Application Layout', ui: [], themes: [] },
  { title: 'Advanced Layout', ui: [], themes: [] },
]);
const feedback = componentPages('Disclosure and feedback', [
  {
    title: 'Accordion and Collapsible',
    ui: ['accordion', 'collapsible'],
    themes: ['accordion', 'collapsible'],
  },
  {
    title: 'Progress',
    ui: ['progress', 'progress-circle'],
    themes: ['progress'],
  },
  { title: 'Toast and Sonner', ui: ['toast'], themes: ['toast', 'sonner'] },
  {
    // Stat (Stat/StatLabel/StatValue/StatDescription) IS a real export, but
    // unlike its siblings on this page it has no dedicated subpath — it's
    // only reachable via the @askrjs/themes/components barrel.
    title: 'Alert, Badge, Empty, Skeleton, Spinner, and Stat',
    ui: [],
    themes: ['alert', 'badge', 'empty', 'skeleton', 'spinner', 'components'],
  },
]);

const charts = sectionPages('UI & Components', 'Charts', 'charts', [
  {
    title: 'Charts',
    path: '',
    headings: [
      'Plot factory',
      'Data and marks',
      'View state and interaction',
      'Production checklist',
    ],
    packages: [packageReference('charts')],
  },
  {
    title: 'Channels and Transforms',
    headings: ['Channels', 'Aggregation', 'Window transforms', 'Row lineage'],
  },
  {
    title: 'Scales',
    headings: ['Scale types', 'Domains', 'Named scales', 'Formatting'],
  },
  {
    title: 'Cartesian Marks',
    headings: ['Lines and areas', 'Bars and points', 'Axes', 'Mixed charts'],
  },
  {
    title: 'Radial Marks',
    headings: ['Arcs', 'Polar values', 'Labels', 'Interaction'],
  },
  {
    title: 'Grid and Annotation Marks',
    headings: ['Cells and rects', 'Rules', 'Text', 'Legends and tooltips'],
  },
  {
    title: 'Interactions',
    headings: ['Brush', 'Zoom', 'Crosshair', 'Selections'],
  },
  {
    title: 'Live Data and View State',
    path: 'live-and-view-state',
    headings: [
      'Append and upsert',
      'Trim rows',
      'Follow latest',
      'Controlled view',
    ],
  },
  {
    title: 'Export',
    headings: ['Data export', 'SVG export', 'PNG export', 'View selection'],
  },
  {
    title: 'Recipes',
    headings: ['Time series', 'Histogram', 'Stacked bars', 'Dashboard polling'],
  },
  {
    title: 'Accessibility and SSR',
    path: 'accessibility-and-ssr',
    headings: [
      'Accessible summary',
      'Heading structure',
      'SSR output',
      'Motion and color',
    ],
  },
  {
    title: 'Migration from Charts 0.1',
    path: 'migration-0-1',
    headings: [
      'Package baseline',
      'Plot model',
      'View state',
      'Export and interaction',
    ],
  },
]);

const integrations = sectionPages(
  'UI & Components',
  'Integrations',
  'integrations',
  [
    {
      title: 'Integrations',
      path: '',
      headings: [
        'Editor integration',
        'Icons and logos',
        'Code splitting',
        'SSR constraints',
      ],
    },
    {
      title: 'Monaco Editor',
      headings: [
        'Lazy loading',
        'Editor ownership',
        'Models and disposal',
        'SSR fallback',
      ],
      packages: [packageReference('monaco')],
    },
    {
      title: 'Icons and Logos',
      headings: [
        'Icon contract',
        'Lucide imports',
        'Brand logos',
        'Accessible labeling',
      ],
      packages: [packageReference('lucide'), packageReference('logos')],
    },
    {
      title: 'Lucide Gallery',
      headings: [
        'Search the gallery',
        'Direct icon imports',
        'Sizing and stroke',
        'Accessibility',
      ],
      packages: [packageReference('lucide')],
      keywords: ['icons', 'lucide'],
      loader: () => import('./lucide-gallery'),
    },
  ]
);

const tooling = sectionPages('Tooling', 'Tooling', 'tooling', [
  {
    title: 'Tooling',
    path: '',
    headings: [
      'CLI workflow',
      'Vite integration',
      'Generated artifacts',
      'Safe updates',
    ],
    packages: [packageReference('cli'), packageReference('vite')],
  },
  {
    title: 'CLI Overview',
    headings: [
      'Available commands',
      'Help and version',
      'Project-local execution',
      'CI usage',
    ],
    packages: [packageReference('cli')],
  },
  {
    title: 'Project Templates and create',
    path: 'create',
    headings: [
      'Published templates',
      'Product prompts',
      'Install control',
      'Agent skills',
    ],
    keywords: ['startkit', 'spa', 'ssr', 'ssg', 'full-stack'],
  },
  {
    title: 'Page and Action Generation',
    path: 'add',
    headings: [
      'Add a page',
      'Add an action',
      'Route option',
      'Generated file review',
    ],
  },
  {
    title: 'OpenAPI and Typed-Client Generation',
    path: 'openapi',
    headings: [
      'Generate OpenAPI',
      'Check drift',
      'Generate a client',
      'CI contract',
    ],
  },
  {
    title: 'SSG Commands',
    path: 'ssg',
    headings: [
      'Configuration',
      'Output directory',
      'Document and assets',
      'Failure reporting',
    ],
  },
  {
    title: 'Dependency Updates',
    headings: ['outdated', 'update', 'upgrade', 'Review and rollback'],
  },
  {
    title: 'Agent Skills and Workflows',
    path: 'skills',
    headings: [
      'Install skills',
      'Sync skills',
      'Review workflow',
      'Project ownership',
    ],
  },
  {
    title: 'Vite Integration and Document Ownership',
    path: 'vite',
    headings: [
      'Askr Vite plugin',
      'Browser build',
      'Server entry',
      'Document ownership',
    ],
    packages: [packageReference('vite')],
  },
]);

const guides = sectionPages(
  'Guides',
  'Application recipes',
  'guides',
  [
    {
      title: 'Guides',
      path: '',
      headings: [
        'Choose a guide',
        'Start from a starter',
        'Keep boundaries explicit',
        'Production finish bar',
      ],
    },
    'Build an SPA',
    'Add SSR to an SPA',
    'Build an Authenticated Full-Stack App',
    'Build an API-Only Server',
    'Generate a Static Site',
    'Build an MCP Server',
    'Forms, Actions, and CRUD',
    'Tables, Filters, and URL State',
    'Dashboards, Charts, and Polling',
    'Protected Routes and Permissions',
    'API Integration and Error Handling',
    'Loading, Empty, Error, and Pending States',
    'Realtime Streams',
    'File Uploads and Artifacts',
    'Environment Configuration',
    'Accessibility',
    'Testing Deterministic Applications',
    {
      title: 'Testing HTTP Applications',
      headings: [
        'Goal and architecture',
        'Request injection',
        'Cookie and redirect flows',
        'Verification',
      ],
      packages: [packageReference('testing'), packageReference('server')],
    },
    'Production Readiness',
    'Migration from React',
  ].map((value) =>
    typeof value === 'string'
      ? {
          title: value,
          headings: [
            'Goal and architecture',
            'Implementation',
            'Failure states',
            'Verification',
          ],
        }
      : value
  )
);

const reference = sectionPages('Reference', 'Reference', 'reference', [
  {
    title: 'Reference',
    path: '',
    headings: [
      'API index',
      'Packages',
      'Behavioral contracts',
      'Compatibility',
    ],
  },
  {
    title: 'API Index',
    path: 'api',
    headings: [
      'Packages and entrypoints',
      'Symbols and anchors',
      'Type-only exports',
      'Snapshot policy',
    ],
    keywords: ['API', 'exports'],
  },
  {
    title: 'Package Map',
    headings: [
      'Runtime packages',
      'Server packages',
      'UI packages',
      'Tooling packages',
    ],
  },
  {
    title: 'JSX Reference',
    headings: ['Elements', 'Props', 'Events', 'Children and fragments'],
  },
  {
    title: 'Behavioral Contracts',
    headings: [
      'Render contract',
      'Ownership',
      'Cancellation',
      'Delivery parity',
    ],
  },
  {
    title: 'Testing Utilities',
    headings: [
      'Query mocks',
      'Invalidation recorder',
      'Route matching',
      'Warnings',
    ],
    packages: [packageReference('askr', '@askrjs/askr/testing')],
  },
  {
    title: 'FX Timing Utilities',
    path: 'fx',
    headings: [
      'Clock contract',
      'Scheduling',
      'Deterministic tests',
      'Cleanup',
    ],
    packages: [packageReference('askr', '@askrjs/askr/fx')],
  },
  {
    title: 'Advanced and Custom Runtimes',
    path: 'custom-runtimes',
    headings: [
      'Create a runtime',
      'Renderer host',
      'Default runtime',
      'Advanced constraints',
    ],
  },
  {
    title: 'Compatibility and Migration Notes',
    path: 'compatibility',
    headings: [
      'Latest-published scope',
      'Clean breaks',
      'Package alignment',
      'Migration checklist',
    ],
  },
  {
    title: 'Glossary',
    headings: [
      'Runtime terms',
      'Routing terms',
      'Data terms',
      'Rendering terms',
    ],
  },
  {
    title: 'Troubleshooting',
    headings: [
      'Hydration mismatches',
      'Package skew',
      'Routing and SSG',
      'Server and network failures',
    ],
  },
]);

const overview: DocsPageDefinition = {
  route: '/docs',
  title: 'Askr Documentation',
  description:
    'Build browser, server, static, and full-stack TypeScript applications with the current published Askr packages.',
  navGroup: 'Overview',
  status: 'stable',
  packages: [packageReference('askr')],
  headings: [
    heading('Overview', 'Askr Documentation', 'Choose a path', '/docs'),
    heading('Overview', 'Askr Documentation', 'Published package set', '/docs'),
    heading('Overview', 'Askr Documentation', 'Application modes', '/docs'),
  ],
  keywords: ['documentation', 'Askr', 'TypeScript'],
  loader: pageLoader,
};

const authoredPages = [
  overview,
  ...gettingStarted,
  ...fundamentals,
  ...routing,
  ...data,
  ...rendering,
  ...server,
  ...auth,
  ...contracts,
  ...mcp,
  ...services,
  componentsLanding,
  ...foundations,
  ...controls,
  ...experimentalControls,
  ...overlays,
  ...navigation,
  ...dataLayout,
  ...feedback,
  ...charts,
  ...integrations,
  ...tooling,
  ...guides,
  ...reference,
];

const apiPages: DocsPageDefinition[] = apiManifest.map((entrypoint) => ({
  route: `/docs/reference/api/${entrypoint.packageName.slice('@askrjs/'.length)}/${entrypoint.slug}`,
  title: entrypoint.importName,
  description: `Published API exports for ${entrypoint.importName} ${entrypoint.version}.`,
  navGroup: 'Reference',
  navSection: 'Generated API',
  status: 'stable',
  packages: [
    {
      name: entrypoint.packageName,
      version: entrypoint.version,
      importPath: entrypoint.importName,
    },
  ],
  headings: [
    {
      id: 'exports',
      title: 'Exports',
      body: `This page is generated from the declarations shipped by ${entrypoint.importName}.`,
    },
  ],
  keywords: [entrypoint.importName, entrypoint.packageName],
  loader: apiLoader,
}));

const orderedPages = [...authoredPages, ...apiPages];
export const docsCatalog: readonly DocsPageDefinition[] = orderedPages.map(
  (page, index) => ({
    ...page,
    previous: orderedPages[index - 1]?.route,
    next: orderedPages[index + 1]?.route,
  })
);

export const docsSections: readonly DocsSectionDefinition[] =
  docsPrimarySections.map(({ label, route }) => {
    const pages = docsCatalog.filter(
      (page) => page.navGroup === label && page.navSection !== 'Generated API'
    );
    return { id: slug(label), label, landingRoute: route, pages };
  });

export const docsByRoute = new Map(
  docsCatalog.map((page) => [page.route, page])
);

export function normalizeDocsRoute(path: string): `/docs${string}` {
  const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return normalized as `/docs${string}`;
}

export function resolveDocsRoute(location: {
  path: string;
  matches: readonly { path: string }[];
}): `/docs${string}` {
  return normalizeDocsRoute(location.matches[0]?.path ?? location.path);
}

export function docsTableOfContents(
  page: DocsPageDefinition
): readonly Pick<DocsHeadingDefinition, 'id' | 'title'>[] {
  if (
    page.navSection === 'Generated API' ||
    page.route === '/docs/integrations/lucide-gallery'
  ) {
    return page.headings;
  }

  const headings: Pick<DocsHeadingDefinition, 'id' | 'title'>[] = [
    {
      id: 'how-to-use',
      title: `How to use ${page.title.toLowerCase()}`,
    },
    ...page.headings,
  ];
  if (page.route === '/docs') {
    headings.push({ id: 'versions', title: 'Published versions' });
  }
  if (page.route === '/docs/tooling/cli-overview') {
    headings.push({ id: 'published-commands', title: 'Published commands' });
  }
  return headings;
}

export const docsSearchRecords: readonly DocsSearchRecord[] =
  docsCatalog.flatMap((page) => [
    {
      route: page.route,
      title: page.title,
      description: page.description,
      group: page.navGroup,
      terms: [
        ...page.keywords,
        ...(page.aliases ?? []),
        ...page.packages.flatMap((pkg) => [pkg.name, pkg.importPath ?? '']),
      ],
    },
    ...page.headings.map((item) => ({
      route: page.route,
      anchor: item.id,
      title: item.title,
      description: page.title,
      group: page.navGroup,
      terms: [page.title],
    })),
  ]);

export { packageVersions as publishedVersions };
