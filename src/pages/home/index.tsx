import { SiteFrame } from '../../components/site-shell';
import { createHomeModel } from './_model';
import {
  DocsLaneSection,
  HomeDeveloperExperienceSection,
  HomeHeroSection,
  HomeProofStrip,
  ProblemSection,
  ProductionReadinessSection,
  SolutionSection,
  type ArchitectureNode,
  type HomeSection,
  type HomeStat,
  type LaunchStep,
} from './_sections';

export function HomePage() {
  const model = createHomeModel();

  const sections = model.sections as HomeSection[];
  const launchPath = model.launchPath as LaunchStep[];
  const architecturePass = model.architecturePass as ArchitectureNode[];
  const heroStats = model.stats as HomeStat[];

  return (
    <SiteFrame>
      <main class="site-main home-main">
        <HomeHeroSection />

        <div class="container">
          <HomeProofStrip stats={heroStats} />

          <ProblemSection steps={launchPath} />

          <SolutionSection nodes={architecturePass} />

          <HomeDeveloperExperienceSection
            title={model.featureSection.title}
            description={model.featureSection.description}
          />

          {sections.map((section, index) => (
            <DocsLaneSection section={section} index={index} />
          ))}

          <ProductionReadinessSection />
        </div>
      </main>
    </SiteFrame>
  );
}
