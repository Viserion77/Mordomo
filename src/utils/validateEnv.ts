export const validateEnv = () => {
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.warn('Missing Discord bot token.');
    return false;
  }

  return true;
};
