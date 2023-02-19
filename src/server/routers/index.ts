import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { TRPCClientError } from '@trpc/client';
import { publicProcedure, router } from 'server/trpc';
import { z } from 'zod';

async function getGenericAudio(message: string, isFemale: boolean) {
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
  if (!GOOGLE_PRIVATE_KEY) {
    throw new TRPCClientError('GOOGLE_PRIVATE_KEY is not set');
  }
  const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
  if (!GOOGLE_CLIENT_EMAIL) {
    throw new TRPCClientError('GOOGLE_CLIENT_EMAIL is not set');
  }
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  if (!GOOGLE_CLIENT_ID) {
    throw new TRPCClientError('GOOGLE_CLIENT_ID is not set');
  }

  const client = new TextToSpeechClient({
    credentials: {
      private_key: GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
      client_email: GOOGLE_CLIENT_EMAIL,
      client_id: GOOGLE_CLIENT_ID
    }
  });

  const [response] = await client.synthesizeSpeech({
    input: { text: message },
    voice: {
      languageCode: 'en-GB',
      name: isFemale ? 'en-GB-Neural2-A' : 'en-GB-Neural2-B'
    },
    audioConfig: { audioEncoding: 'MP3' }
  });
  if (!response.audioContent) {
    throw new TRPCClientError('No audio content');
  }
  return Array.from(response.audioContent as Uint8Array);
}

export const appRouter = router({
  tts: publicProcedure
    .input(
      z.object({
        input: z.string(),
        isFemale: z.boolean()
      })
    )
    .query(({ input: { input, isFemale } }) => {
      return getGenericAudio(input, isFemale);
    })
});

export type AppRouter = typeof appRouter;
