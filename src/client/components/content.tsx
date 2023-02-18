import { Button, Heading, Link } from '@chakra-ui/react';
import { MDXComponents, MDXContent } from 'mdx/types.js';

export interface ContentProps {
  content: MDXContent;
}

const components: MDXComponents = {
  h1: ({ children }) => (
    <Heading as="h1" size="2xl">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size="xl">
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size="lg">
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading as="h4" size="md">
      {children}
    </Heading>
  ),
  h5: ({ children }) => (
    <Heading as="h5" size="sm">
      {children}
    </Heading>
  ),
  h6: ({ children }) => (
    <Heading as="h6" size="xs">
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
    <MDXComponent
      components={{
        ...components,
        Button: ({ children }) => <Button>{children}</Button>
      }}
    />
  );
}
