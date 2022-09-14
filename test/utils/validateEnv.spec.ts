import {validateEnv} from '../../src/utils/validateEnv';

describe('validateEnv', () => {
  it('should return false', () => {
    expect(validateEnv()).toBeFalsy();
  });

  it('should set variables and return true', () => {
    process.env.DISCORD_BOT_TOKEN = 'test';

    expect(validateEnv()).toBeTruthy();
  });
});
