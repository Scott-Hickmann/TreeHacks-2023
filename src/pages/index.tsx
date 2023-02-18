import { Heading } from '@chakra-ui/react';
import { Content } from 'client/components/content';
import Napoleon from 'common/content/napoleon.mdx';

export default function HomePage() {
  return (
    <>
      <Heading as="h1" size="2xl">
        Hello, TreeHacks!
      </Heading>
      <Content content={Napoleon} />
    </>
  );
}
