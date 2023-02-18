import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { MDXComponents, MDXContent } from 'mdx/types.js';
import { createContext, useContext } from 'react';
import Tilt from 'react-parallax-tilt';

import { Speaker } from './speaker';

export interface ContentProps {
  content: MDXContent;
}

const Context = createContext<{
  disclosure: ReturnType<typeof useDisclosure>;
}>({
  disclosure: {
    isOpen: false,
    onOpen: () => undefined,
    onClose: () => undefined,
    onToggle: () => undefined,
    isControlled: false,
    getButtonProps: () => undefined,
    getDisclosureProps: () => undefined
  }
});

const commonHeadingProps = { mt: 6, mb: 4 } as const;
const imagePadding = { base: 4, lg: 6 } as const;

const defaultComponents: MDXComponents = {
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

const components: MDXComponents = {
  ...defaultComponents,
  h1: ({ children }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { disclosure } = useContext(Context);
    const { onOpen } = disclosure;
    return (
      <Heading as="h1" size="2xl" {...commonHeadingProps}>
        <HStack align="center" justify="space-between">
          <Text>{children}</Text>
          <Button onClick={onOpen} size="sm" variant="outline">
            Talk with me
          </Button>
        </HStack>
      </Heading>
    );
  },
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
  Boxquote: ({ children }) => {
    const speakerBg = useColorModeValue('gray.50', 'gray.800');
    return (
      <Stack
        display="inline-block"
        p={4}
        bg={speakerBg}
        borderRadius="lg"
        mt={4}
        pt={-4}
      >
        {children}
      </Stack>
    );
  },
  Speaker: (props) => {
    const { disclosure } = useContext(Context);
    const { isOpen, onClose } = disclosure;
    return <Speaker {...props} isOpen={isOpen} onClose={onClose} />;
  },
  SpeakerImage: ({ src, alt, float, width, children, source }) => {
    const { disclosure } = useContext(Context);
    const { onOpen } = disclosure;
    return (
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
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
          <Image
            rounded="lg"
            cursor="pointer"
            src={src}
            alt={alt}
            onClick={onOpen}
          />
        </Tilt>
        <Stack spacing={0}>
          <Box />
          {children}
          {source && (
            <Text fontStyle="italic" fontFamily="article">
              {source}
            </Text>
          )}
          <Button size="sm" variant="outline" onClick={onOpen}>
            Talk with me
          </Button>
        </Stack>
      </Stack>
    );
  }
};

export function Content({ content: MDXComponent }: ContentProps) {
  const disclosure = useDisclosure();

  return (
    <Box textAlign="left" margin="auto" maxW="80ch">
      <Context.Provider value={{ disclosure }}>
        <MDXComponent components={components} />
      </Context.Provider>
    </Box>
  );
}
