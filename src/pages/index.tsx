import { Box } from '@chakra-ui/react';
import { Content } from 'client/components/content';
import Layout from 'client/components/layout';
import Splash from 'client/components/splash';
import RachelCarson from 'common/content/rachelCarson.mdx';
import Diogenes from 'common/content/diogenes.mdx';
import Charlotte from 'common/content/charlotteBronte.mdx';

export default function HomePage() {
  <Layout>
	return <Content content={RachelCarson} />;
  </Layout>
}
