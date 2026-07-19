import { createSPA, hydrateSPA } from '@askrjs/askr/boot';
import './styles.css';

async function main() {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Missing #app root element.');
  }

  const registry = window.location.pathname.startsWith('/docs')
    ? (await import('./pages/_routes')).createClientRouteRegistry(
        window.location.pathname
      )
    : (await import('./pages/marketing/_routes')).marketingRouteRegistry;

  if (root.childNodes.length > 0) {
    await hydrateSPA({ root, registry });
    return;
  }

  await createSPA({ root, registry });
}

void main();
