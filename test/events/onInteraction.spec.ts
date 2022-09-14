import {type Interaction} from 'discord.js';
import {onInteraction} from '../../src/events/onInteraction';
import {CommandList} from '../../src/commands';

const interaction = {
  isCommand: jest.fn().mockImplementation(() => {
    return true;
  }),
  commandName: 'test',
  reply: jest.fn().mockImplementation(() => {
    return Promise.resolve();
  }),
};

jest.mock('../../src/commands', () => ({
  CommandList: [
    {
      data: {
        name: 'test',
      },
      run: jest.fn().mockImplementation(() => {
        return Promise.resolve();
      }),
    },
  ],
}));

describe('onInteraction', () => {
  it('should run the command', async () => {
    await onInteraction(interaction as unknown as Interaction);
    expect(CommandList[0].run).toBeCalled();
  });
});
