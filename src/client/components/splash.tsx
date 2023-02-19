import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useColorMode
} from '@chakra-ui/react';
import Tilt from 'react-parallax-tilt';

// TODO: parse the image from the markdown

interface CardProps {
  figure: string;
  img: string;
  link: string;
}
function Card(props: CardProps) {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={1000}
      scale={1.05}
      glareEnable={true}
      glareMaxOpacity={0.8}
      glareColor="#ffffff"
      glarePosition="bottom"
      glareBorderRadius="20px" // TODO why is the glare not working?
    >
      <Box
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        width={{ base: '100%', md: '25vh', lg: '32vh' }}
        height={{ base: '100px', md: '50vh' }}
      >
        <Link href={props.link}>
          <Image
            src={props.img}
            alt={props.figure}
            contrast={1.75}
            objectFit={'cover'}
            width={'100%'}
            height={'100%'}
          />
          <Box
            position={'absolute'}
            bottom={'0'}
            left={'0'}
            height={'100%'}
            width={'100%'}
            bgGradient="linear(to-b, transparent, {{colorMode === 'light' ? 'gray.800' : 'gray.200'}}})"
            rounded="lg"
          />
          <Text
            p={4}
            fontSize={{ sm: '40px', md: '25px', lg: '40px' }}
            position={'absolute'}
            bottom={'5%'}
            left={'8%'}
            lineHeight={'1.1'}
            color={'white'}
          >
            {props.figure}
          </Text>
        </Link>
      </Box>
    </Tilt>
  );
}

export default function Splash() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      backgroundSize="cover"
      backgroundPosition="center"
      height="full"
      width="full"
    >
      <HStack justify="space-between" align="start" p={6}>
        <Box />
        <Box>
          <Heading
            as="h1"
            size="2xl"
            pb={4}
            textAlign="center"
            fontWeight={'light'}
          >
            Talk to History.
          </Heading>
          <Text textAlign="center" fontFamily={'montserrat'}>
            Learn history, one conversation at a time.
          </Text>
        </Box>
        <Button aria-label="Toggle color mode" onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </HStack>
      <Divider orientation="horizontal" mb={5} />

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        padding="5px"
      >
        <Card
          figure="Sun Tzu"
          img="images/sunTzu/sunTzuStatic.gif"
          link="/articles/sunTzu.mdx"
        />
        <Card
          figure="Rachel Carson"
          img="images/rachelCarson/profile.gif"
          link="/articles/rachelCarson"
        />
        <Card
          figure="Katherine Johnson"
          img="images/katherineJohnson/profile.gif"
          link="/articles/katherineJohnson"
        />
        <Card
          figure="Diogenes"
          img="images/diogenes/diogenes.jpg"
          link="/articles/diogenes"
        />
      </Stack>
    </Box>
  );
}
