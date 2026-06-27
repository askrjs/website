import { ShowcaseTemplate } from '../../shared/page-templates';

export function ThemesPage() {
  return (
    <ShowcaseTemplate
      badge="Reference"
      title="Theme reference"
      summary="Token groups, light and dark defaults, and CSS entry points for styling Askr pages."
      bullets={[
        'Start with --ak-* tokens before adding site-specific selectors',
        'Set data-theme and data-theme-choice before hydration to avoid color flash',
        'Use default theme CSS for common controls, surfaces, navigation, and layout',
      ]}
      metrics={[
        { label: 'Token groups', value: '10+' },
        { label: 'Default modes', value: '2' },
        { label: 'CSS entry points', value: 'many' },
      ]}
    />
  );
}
