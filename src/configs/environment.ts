import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_BASE_API_ENDPOINT: z.string(),
});

const configServer = configSchema.safeParse({
  NEXT_PUBLIC_BASE_API_ENDPOINT: process.env.NEXT_PUBLIC_BASE_API_ENDPOINT,
});

if (!configServer.success) {
  console.error(configServer.error.issues);
  throw new Error("Invalid .env variable values");
}

const envConfig = configServer.data;
export default envConfig;
