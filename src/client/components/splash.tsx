import {
  Box,
  Divider,
  Heading,
  Image,
  Link,
  Stack,
  Text
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
  return (
    <Box
      backgroundSize="cover"
      backgroundPosition="center"
      height="100%"
      width="100%"
    >
      <Heading as="h1" size="2xl" mt={6} mb={4} textAlign="center">
        Talk to History.
      </Heading>
      <Text textAlign="center" fontStyle={'italic'}>
        Learn history, one conversation at a time.
      </Text>
      <Divider orientation="horizontal" margin="20px" />

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        padding="5px"
      >
        <Card
          figure="Reyniere"
          img="images/reyniere/reyniereProfile.jpeg"
          link="/articles/reyniere"
        />
        <Card
          figure="Rachel Carson"
          img="images/rachelCarson/profile.gif"
          link="/articles/rachelCarson"
        />
        <Card
          figure="Katherine Johnson"
          img="images/katherineJohnson/katherineJohnsonProfile.jpg"
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
