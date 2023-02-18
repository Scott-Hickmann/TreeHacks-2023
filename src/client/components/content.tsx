import { Button, Heading, Link, Stack } from '@chakra-ui/react';
import { MDXComponents, MDXContent } from 'mdx/types.js';

export interface ContentProps {
  content: MDXContent;
}

const commonHeadingProps = { pt: 4 } as const;

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
  a: ({ children, ...props }) => (
    <Link color="blue.500" {...props} target="_blank">
      {children}
    </Link>
  )
};

export function Content({ content: MDXComponent }: ContentProps) {
  return (
    <Stack spacing={4}>
      <MDXComponent
        components={{
          ...components,
          Button: ({ children }) => <Button>{children}</Button>
        }}
      />
    </Stack>
  );
}
