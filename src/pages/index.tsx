import { Box } from '@chakra-ui/react';
import { Content } from 'client/components/content';
import RachelCarson from 'common/content/rachelCarson.mdx';

export default function HomePage() {
  return (
    <Box p={{ base: 6, md: 8 }}>
      <Content content={RachelCarson} />
    </Box>
  );
}
