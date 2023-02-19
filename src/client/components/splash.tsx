import {
  Link,
  Box,
  Stack,
  Heading,
  Divider,
  Image,
  Text,
  BackgroundProps
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
      <Link href={props.link}>
        <Box
          maxW={{ base: 'initial', md: '10cm' }}
          borderWidth="1px"
          rounded="lg"
          overflow="hidden"
        >
          <Image
            src={props.img}
            alt={props.figure}
            width="full"
            contrast={1.75}
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
            fontSize="50px"
            position={'absolute'}
            bottom={'5%'}
            left={'8%'}
            lineHeight={'1.1'}
          >
            {props.figure}
          </Text>
        </Box>
      </Link>
    </Tilt>
  );
}

export default function Splash() {
  return (
    <Box
      //   backgroundImage={`url('images/minimalLight.png')`}
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
        justify="space-around"
        padding="50px"
      >
        <Card
          figure="Charlotte Bronte"
          img="images/charlotteBronte/charlotteBronteProfile.jpg"
          link="/articles/charlotteBronte"
        />
        <Card
          figure="Rachel Carson"
          img="images/rachelCarson/profile.gif"
          link="/articles/rachelCarson"
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
