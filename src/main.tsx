import { createSPA, hydrateSPA } from '@askrjs/askr/boot';
import { routeRegistry } from './pages/_routes';
import './styles.css';

async function main() {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Missing #app root element.');
  }

  if (root.childNodes.length > 0) {
    await hydrateSPA({ root, registry: routeRegistry });
    return;
  }

  await createSPA({ root, registry: routeRegistry });
}

void main();
