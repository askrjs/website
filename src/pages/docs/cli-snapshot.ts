// Generated from @askrjs/cli --help. Do not edit.
export const cliSnapshot = {
  version: '0.0.5',
  commands: [
    'add',
    'create',
    'generate',
    'openapi',
    'skills',
    'ssg',
    'outdated',
    'update',
    'upgrade',
  ],
  templates: ['startkit', 'spa', 'ssr', 'ssg', 'full-stack'],
  help: 'askr - Unified CLI for the Askr platform\n\nUsage:\n  askr <command> [args]\n\nCommands:\n  add        Generate pages or declared actions into an Askr project\n  create     Create a new Askr app from a template or product prompt\n  generate   Generate an @askrjs/fetch client from OpenAPI\n  openapi    Generate or check an OpenAPI YAML artifact\n  skills     Install or sync Askr agent skills\n  ssg        Run static-site generation\n  outdated   List available dependency updates\n  update     Apply safe dependency updates\n  upgrade    Apply latest peer-compatible dependency upgrades\n\nOptions:\n  --help, -h     Show help\n  --version, -v  Print CLI version\n\nExamples:\n  askr create startkit my-app\n  askr create --prompt "Agent workflow console with approvals"\n  askr add page audit-log\n  askr add action approve-request --route /requests/{id}\n  askr skills install\n  askr openapi --check\n  askr skills review foundation --cwd ./candidate-app\n  askr ssg --config ./ssg.config.ts --output ./dist/static\n  askr outdated\n  askr update\n  askr upgrade',
  createHelp:
    'askr create - Project scaffolding for Askr\n\nUsage:\n  askr create [template] <name> [--dir <path>] [--prompt <text>] [--no-install] [--no-skills]\n  askr create --prompt <text> [name] [--no-install] [--no-skills]\n\nTemplates:\n  startkit, spa, ssr, ssg, full-stack\n\nOptions:\n  --prompt <text>  Infer the best template from a product prompt and emit a builder blueprint\n  --dir <path>     Explicit output directory (defaults to ./<name>)\n  --no-install     Skip dependency installation\n  --no-skills      Skip bundled Askr skill installation into skills/\n  --help, -h       Show help\n\nExamples:\n  askr create startkit my-app\n  askr create full-stack my-app\n  askr create startkit acme-dashboard\n  askr create --prompt "Agent workflow console with approvals and analytics"',
} as const;
