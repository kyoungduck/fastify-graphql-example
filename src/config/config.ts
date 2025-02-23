import { ze } from '@internal/zod-extension';
import { z } from 'zod';

const configZodSchema = z.object({
  webServerPort: ze.intString().transform(Number),
  stage: z.union([
    z.literal('dev'),
    z.literal('alpha'),
    z.literal('production'),
  ]),
});

let config: z.infer<typeof configZodSchema> | null = null;

export const loadConfig = async () => {
  config = configZodSchema.parse({
    ...process.env,
  });
};

export const getConfig = (): z.infer<typeof configZodSchema> => {
  if (config === null) {
    throw new Error('config was not loaded');
  }

  return config;
};
