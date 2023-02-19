import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue
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
        width="full"
        maxW={{ base: 'full', md: '300px' }}
        height={{ base: '100px', md: '400px' }}
      >
        <Link href={props.link}>
          <Image
            src={props.img}
            alt={props.figure}
            contrast={1.75}
            objectFit={'cover'}
            objectPosition={'50% 25%'}
            width={'100%'}
            height={'100%'}
          />
          <Box
            position={'absolute'}
            bottom={'0'}
            left={'0'}
            height={'100%'}
            width={'100%'}
            bgGradient="linear(to-b, transparent, gray.800)"
            rounded="lg"
          />
          <Text
            p={4}
            fontSize={{ base: '24px', sm: '40px', md: '25px', lg: '40px' }}
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
      <HStack
        justify="space-between"
        align="start"
        p={6}
        bg={useColorModeValue('white', 'black')}
        px={{ base: 6, md: 8 }}
        borderBottomWidth={1}
        borderBottomColor={useColorModeValue('gray.100', 'black')}
      >
        <Box />
        <Box>
          <Heading as="h1" size="2xl" pb={4} textAlign="center">
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

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        padding="5px"
        spacing={{ base: 2, md: 4 }}
        m={{ base: 0, md: 5 }}
      >
        <Card
          figure="Rachel Carson"
          img="images/rachelCarson/profile.gif"
          link="/articles/rachelCarson"
        />
        <Card
          figure="Sun Tzu"
          img="images/sunTzu/profile.gif"
          link="/articles/sunTzu"
        />
        <Card
          figure="Katherine Johnson"
          img="images/katherineJohnson/profile.gif"
          link="/articles/katherineJohnson"
        />
        <Card
          figure="Gottfried Leibniz"
          img="images/gottfriedLeibniz/profile.gif"
          link="/articles/gottfriedLeibniz"
        />
      </Stack>
    </Box>
  );
}
