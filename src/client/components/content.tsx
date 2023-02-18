import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import { MDXComponents, MDXContent } from 'mdx/types.js';

import { Speaker } from './speaker';

export interface ContentProps {
  content: MDXContent;
}

const commonHeadingProps = { mt: 6, mb: 4 } as const;
const imagePadding = { base: 4, lg: 6 } as const;

const components: MDXComponents = {
  h1: ({ children }) => (
    <Heading as="h1" size="2xl" {...commonHeadingProps}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size="xl" {...commonHeadingProps}>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size="lg" {...commonHeadingProps}>
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading as="h4" size="md" {...commonHeadingProps}>
      {children}
    </Heading>
  ),
  h5: ({ children }) => (
    <Heading as="h5" size="sm" {...commonHeadingProps}>
      {children}
    </Heading>
  ),
  h6: ({ children }) => (
    <Heading as="h6" size="xs" {...commonHeadingProps}>
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <Text mt={4} fontFamily="article">
      {children}
    </Text>
  ),
  blockquote: ({ children }) => (
    <Text as="span" fontSize="xl">
      {children}
    </Text>
  ),
  a: ({ children, ...props }) => (
    <Link color="blue.500" {...props} target="_blank">
      {children}
    </Link>
  )
};

export function Content({ content: MDXComponent }: ContentProps) {
  return (
    <Box textAlign="left" margin="auto" maxW="80ch">
      <MDXComponent
        components={{
          ...components,
          Button: ({ children }) => <Button>{children}</Button>,
          Image: ({ src, alt, float, width, children, source }) => (
            <Stack
              pb={imagePadding}
              pl={float === 'right' ? { ...imagePadding, base: 0 } : 0}
              pr={float === 'left' ? { ...imagePadding, base: 0 } : 0}
              margin="auto"
              mt={commonHeadingProps.mt}
              float={{ base: 'none', lg: float }}
              width={{ base: 'full', lg: width }}
              textAlign={{ base: 'center', lg: 'left' }}
              fontSize="sm"
            >
              <Image src={src} alt={alt} />
              <Stack spacing={0}>
                <Box />
                {children}
                {source && (
                  <Text fontStyle="italic" fontFamily="article">
                    {source}
                  </Text>
                )}
              </Stack>
            </Stack>
          ),
          SpeakerImage: ({ src, alt, float, width, children, source }) => (
            <Stack
              pb={imagePadding}
              pl={float === 'right' ? { ...imagePadding, base: 0 } : 0}
              pr={float === 'left' ? { ...imagePadding, base: 0 } : 0}
              margin="auto"
              mt={commonHeadingProps.mt}
              float={{ base: 'none', lg: float }}
              width={{ base: 'full', lg: width }}
              textAlign={{ base: 'center', lg: 'left' }}
              fontSize="sm"
              marginTop={{ base: 0, lg: 1.5 }}
            >
              <Image src={src} alt={alt} />
              <Stack spacing={0}>
                <Box />
                {children}
                {source && (
                  <Text fontStyle="italic" fontFamily="article">
                    {source}
                  </Text>
                )}
                <Button size="sm" variant="outline">
                  Talk with me
                </Button>{' '}
                {/* TODO scott pls implement :3 */}
              </Stack>
            </Stack>
          ),
          Speaker
        }}
      />
    </Box>
  );
}
