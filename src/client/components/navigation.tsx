import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  HStack,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export default function Navigation(): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue('white', 'black')}
      px={{ base: 6, md: 8 }}
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue('gray.100', 'black')}
      position="sticky"
      top={0}
      width="full"
      zIndex={999}
    >
      <HStack h={16} align="center" justify="space-between" spacing={4}>
        <HStack
          spacing={{ base: 4, lg: 8 }}
          align="right"
          justify="space-between"
          width="full"
        >
          <Heading>Talk to History.</Heading>
          <Button aria-label="Toggle color mode" onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}
