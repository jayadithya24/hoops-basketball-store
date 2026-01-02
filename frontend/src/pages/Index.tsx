import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import TechnologySection from '@/components/TechnologySection';
import LegacySection from '@/components/LegacySection';
import ProSeriesSection from '@/components/ProSeriesSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TechnologySection />
      <LegacySection />
      <ProSeriesSection />
    </Layout>
  );
};

export default Index;
