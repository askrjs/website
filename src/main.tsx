import { createSPA, hydrateSPA } from '@askrjs/askr/boot';
import './styles.css';

async function main() {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Missing #app root element.');
  }

  const { routeRegistry: registry } = await import('./pages/_routes');

  if (root.childNodes.length > 0) {
    await hydrateSPA({ root, registry });
    return;
  }

  await createSPA({ root, registry });
}

void main();
