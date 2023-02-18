import {
  Button,
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
  useDisclosure
} from '@chakra-ui/react';

export type SpeakerProps = React.PropsWithChildren<{ name: string }>;

export function Speaker({ name, children }: SpeakerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Button onClick={onOpen}>Speak with {name}</Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Text>Hello, my name is {name}. How are you today?</Text>
              <Input placeholder="Message" />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue">Send</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
