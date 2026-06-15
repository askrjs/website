import { ProofStrip } from '../../../components/site-primitives';
import type { HomeStat } from './types';

export function HomeProofStrip(props: { stats: HomeStat[] }) {
  return (
    <ProofStrip
      items={props.stats.map((stat) => ({
        value: stat.value,
        label: stat.label,
        detail:
          stat.label === 'Core runtime'
            ? 'inspectable core'
            : 'published package',
      }))}
    />
  );
}
