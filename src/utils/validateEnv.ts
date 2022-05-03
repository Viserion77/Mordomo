export const validateEnv = () => {
  if (!process.env.BOT_TOKEN) {
    console.warn("Missing Discord bot token.");
    return false;
  }

  if (!process.env.DATABASE_URL) {
    console.warn("Missing postgres connection.");
    return false;
  }
  return true;
};
