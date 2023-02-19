import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
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
  Switch,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { trpc } from 'client/trpc';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

export type SpeakerProps = React.PropsWithChildren<{
  articleId: string;
  name: string;
  profileSrc: string;
  speakingSrc: string;
  isOpen: boolean;
  onClose: () => void;
}>;

const GPT_AGENT_URL = process.env.NEXT_PUBLIC_GPT_AGENT_URL;
const GPU_AGENT_URL = process.env.NEXT_PUBLIC_GPU_AGENT_URL;

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
  articleId,
  name,
  isOpen,
  onClose,
  profileSrc,
  speakingSrc
}: SpeakerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [conversation, setConversation] = useState<
    { user: string[]; bot: string[] }[]
  >([]);
  const [info, setInfo] = useState<Info>();
  const [input, setInput] = useState<string>('');
  const scrollable = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement & HTMLAudioElement>(null);
  const ttsQueue = useRef<string[]>([]);
  const videoQueue = useRef<string[]>([]);
  const [lipsEnabled, setLipsEnabled] = useState(
    process.env.NEXT_PUBLIC_LIP_SYNC_DEFAULT === 'true'
  );

  const ttsIsRunning = useRef(false);
  const videoIsRunning = useRef(false);
  const [playing, setPlaying] = useState(false);

  const trpcContext = trpc.useContext();

  const play = useCallback(async () => {
    if (videoIsRunning.current || !isOpen) return;
    videoIsRunning.current = true;
    setPlaying(true);
    while (videoQueue.current.length) {
      const videoUrl = videoQueue.current.shift();
      if (!videoUrl) continue;
      if (!videoRef.current) continue;
      videoRef.current.src = videoUrl;
      videoRef.current.play();
      await new Promise<void>((resolve) => {
        if (!videoRef.current) {
          resolve();
          return;
        }
        const interval = setInterval(() => {
          if (!videoRef.current) {
            ttsQueue.current = [];
            videoQueue.current = [];
          }
          if (!videoRef.current || videoRef.current.ended) {
            clearInterval(interval);
            resolve();
          }
        }, 1000);
        videoRef.current.onended = () => {
          if (videoRef.current) {
            videoRef.current.src = '';
          }
          resolve();
        };
        videoRef.current.onerror = (error) => {
          console.error(error);
          clearInterval(interval);
          resolve();
        };
      });
    }
    videoIsRunning.current = false;
    setPlaying(false);
  }, [isOpen]);

  const tts = useCallback(async () => {
    if (ttsIsRunning.current) return;
    ttsIsRunning.current = true;
    while (ttsQueue.current.length) {
      const input = ttsQueue.current.shift();
      if (!input) continue;
      const data = await trpcContext.client.tts.query({
        input,
        isFemale: true
      });
      if (!data) continue;
      const buffer = new Uint8Array(data);
      const audioBlob = new Blob([buffer], { type: 'audio/wav' });
      if (lipsEnabled) {
        const formData = new FormData();
        formData.append('audio_data', audioBlob, 'audio.wav');
        const query = new URLSearchParams({ name: articleId }).toString();
        for (let i = 0; i < 3; i++) {
          try {
            const response = await fetch(`${GPU_AGENT_URL}/animate?${query}`, {
              method: 'POST',
              body: formData,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch');
            }
            const blob = new Blob([await response.arrayBuffer()], {
              type: 'video/mp4'
            });
            const url = window.URL.createObjectURL(blob);
            videoQueue.current.push(url);
            play();
            break;
          } catch (error) {
            console.error(error);
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } else {
        const audioUrl = window.URL.createObjectURL(audioBlob);
        videoQueue.current.push(audioUrl);
        play();
      }
    }
    ttsIsRunning.current = false;
  }, [articleId, play, trpcContext.client.tts, lipsEnabled]);

  const send = useCallback(() => {
    setIsRunning(true);
    setConversation((conversation) => [
      ...conversation,
      { user: splitSentences(input), bot: [] }
    ]);
    if (!GPT_AGENT_URL) throw new Error('GPT_AGENT_URL is not set');
    if (!GPU_AGENT_URL) throw new Error('GPU_AGENT_URL is not set');
    const ws = new window.WebSocket(GPT_AGENT_URL);
    let buffer = '';
    const botSentences: string[] = [];
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
          const newSentences = sentences.slice(0, -1);
          if (!lipsEnabled) {
            ttsQueue.current.push(...newSentences);
            tts();
          }
          botSentences.push(...newSentences);
          setConversation((conversation) => {
            const last = conversation[conversation.length - 1];
            return [
              ...conversation.slice(0, -1),
              { user: last.user, bot: botSentences }
            ];
          });
          buffer = sentences[sentences.length - 1];
        }
      } else if (message.type === 'info') {
        setInfo(message.data);
        if (lipsEnabled) {
          console.log(
            'Finished generating content, generating text and video...'
          );
          ttsQueue.current.push(botSentences.join(' '));
          tts();
        }
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
  }, [info, input, lipsEnabled, tts]);

  const isUnmountedRef = useRef(false);
  useEffect(() => {
    if (isUnmountedRef.current) return;
    isUnmountedRef.current = false;
    if (conversation.length > 0 || isRunning) return;
    console.log('Pregenerating content...');
    send();
    return () => {
      isUnmountedRef.current = true;
    };
  }, [conversation.length, isRunning, send]);

  useEffect(() => {
    if (!isOpen) return;
    console.log('Play content on open...');
    const timeout = setTimeout(() => {
      play();
    }, 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
      <ModalContent height="full">
        <ModalHeader
          borderBottomWidth={1}
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Stack>
            <HStack justify="space-between" pr={8}>
              <Heading size="md">{name}</Heading>
              <HStack>
                <Text fontSize="sm">Enable Lip Sync</Text>
                <Switch
                  isChecked={lipsEnabled}
                  onChange={() => setLipsEnabled((lipsEnabled) => !lipsEnabled)}
                />
              </HStack>
            </HStack>
            <Center>
              <Box
                width="200px"
                height="200px"
                position="relative"
                borderRadius="full"
                overflow="hidden"
              >
                <Image
                  position="absolute"
                  src={playing ? speakingSrc : profileSrc}
                  alt={name}
                  w="200px"
                  h="200px"
                  objectFit="cover"
                  objectPosition="top"
                />
                <Box
                  position="relative"
                  width="full"
                  height="full"
                  borderRadius="full"
                >
                  {lipsEnabled ? (
                    <video
                      ref={videoRef}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top'
                      }}
                    >
                      <track kind="captions" />
                    </video>
                  ) : (
                    <audio ref={videoRef}>
                      <track kind="captions" />
                    </audio>
                  )}
                </Box>
              </Box>
            </Center>
          </Stack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8} py={4} width="full" overflow="auto">
            {conversation.map(({ user, bot }, index) => (
              <Fragment key={index}>
                <DialogPart name="Me" sentences={user} />
                <DialogPart name={name} sentences={bot} />
              </Fragment>
            ))}
          </Stack>
          <Box ref={scrollable} />
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
