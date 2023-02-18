import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import { trpc } from 'client/trpc';
import type { AppProps } from 'next/app';

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('white', 'gray.900')(props)
      }
    })
  },
  colors: {
    black: {
      '50': '#19191A',
      '100': '#19191A',
      '200': '#19191A',
      '300': '#19191A',
      '400': '#19191A',
      '500': '#19191A',
      '600': '#19191A',
      '700': '#19191A',
      '800': '#19191A',
      '900': '#19191A'
    },
    white: {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#ffffff',
      '400': '#ffffff',
      '500': '#ffffff',
      '600': '#ffffff',
      '700': '#ffffff',
      '800': '#ffffff',
      '900': '#ffffff'
    },
    gray: {
      '50': '#F2F2F3',
      '100': '#DADADC',
      '200': '#C2C3C6',
      '300': '#ABABB0',
      '400': '#93949A',
      '500': '#7B7C84',
      '600': '#636369',
      '700': '#4A4B4F',
      '800': '#27282a',
      '900': '#141415'
    }
  }
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default trpc.withTRPC(App);
