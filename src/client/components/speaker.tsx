import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { Fragment, useEffect, useRef, useState } from 'react';

export type SpeakerProps = React.PropsWithChildren<{
  name: string;
  profileSrc: string;
  speakingSrc: string;
  isOpen: boolean;
  onClose: () => void;
}>;

const GPT_AGENT_URL = process.env.NEXT_PUBLIC_GPT_AGENT_URL;

function splitSentences(buffer: string, trim = true) {
  const messagesAndPunctuation = buffer.split(/([.?!])/g);
  const messages = [];
  for (let i = 0; i < messagesAndPunctuation.length; i += 2) {
    const message =
      messagesAndPunctuation[i] + (messagesAndPunctuation[i + 1] ?? '');
    if (!trim || message) messages.push(message);
  }
  return messages;
}

export interface DialogPartProps {
  name: string;
  sentences: string[];
}

function DialogPart({ name, sentences }: DialogPartProps) {
  if (!sentences.length) return null;
  return (
    <Stack spacing={2}>
      <Text fontWeight="bold">{name}</Text>
      <Text>{sentences.join(' ')}</Text>
    </Stack>
  );
}

interface Info {
  conversationId: string;
  parentMessageId: string;
}

export function Speaker({
  name,
  isOpen,
  onClose,
  profileSrc,
  speakingSrc
}: SpeakerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [conversation, setConversation] = useState<
    { user: string[]; bot: string[] }[]
  >([
    {
      user: [],
      bot: ['Say hi to start chatting with me!']
    }
  ]);
  const [info, setInfo] = useState<Info>();
  const [input, setInput] = useState<string>('');
  const scrollable = useRef<HTMLDivElement>(null);

  const send = () => {
    setIsRunning(true);
    setConversation((conversation) => [
      ...conversation,
      { user: splitSentences(input), bot: [] }
    ]);
    if (!GPT_AGENT_URL) throw new Error('GPT_AGENT_URL is not defined');
    const ws = new window.WebSocket(GPT_AGENT_URL);
    let buffer = '';
    ws.onmessage = (event) => {
      let message:
        | { type: 'data'; data: string }
        | { type: 'info'; data: Info };
      try {
        message = JSON.parse(event.data);
      } catch (error) {
        console.error(error);
        return;
      }
      if (message.type === 'data') {
        const { data } = message;
        buffer += data;
        const sentences = splitSentences(buffer, false);
        if (sentences.length > 1) {
          setConversation((conversation) => {
            const last = conversation[conversation.length - 1];
            return [
              ...conversation.slice(0, -1),
              { user: last.user, bot: [...last.bot, ...sentences.slice(0, -1)] }
            ];
          });
          buffer = sentences[sentences.length - 1];
        }
      } else if (message.type === 'info') {
        setInfo(message.data);
        ws.close();
      } else {
        console.error('Unknown message type', message);
      }
    };
    ws.onopen = () => {
      ws.send(JSON.stringify({ input, info }));
      setInput('');
    };
    ws.onclose = () => {
      setIsRunning(false);
    };
  };

  useEffect(() => {
    if (scrollable.current) {
      scrollable.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollable, conversation]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      scrollBehavior="inside"
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow="hidden" display="flex" flexDirection="column">
          <VStack overflow="hidden" display="flex" flexDirection="column">
            <Image
              src={isRunning ? speakingSrc : profileSrc}
              alt="Rachel Carson"
              width="full"
              maxW="200px"
              maxH="200px"
              objectFit="cover"
              objectPosition="top"
              borderRadius="full"
            />
            <Stack spacing={8} width="full" overflow="auto">
              {conversation.map(({ user, bot }, index) => (
                <Fragment key={index}>
                  <DialogPart name="Me" sentences={user} />
                  <DialogPart name={name} sentences={bot} />
                </Fragment>
              ))}
              <Box ref={scrollable} />
            </Stack>
          </VStack>
        </ModalBody>
        <ModalFooter
          py={6}
          borderTopWidth={1}
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Input
            placeholder="Message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                send();
              }
            }}
            mr={6}
          />
          <Button colorScheme="blue" isDisabled={isRunning} onClick={send}>
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
