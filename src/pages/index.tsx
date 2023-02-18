import { Box } from '@chakra-ui/react';
import { Content } from 'client/components/content';
import Layout from 'client/components/layout';
import RachelCarson from 'common/content/rachelCarson.mdx';

export default function HomePage() {
  return (
    <Layout title="Home" description="Home">
      <Box m={{ base: 6, md: 8 }}>
        <Content content={RachelCarson} />
      </Box>
    </Layout>
  );
}
