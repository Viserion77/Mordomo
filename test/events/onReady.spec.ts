import {onReady} from '../../src/events/onReady';

const putMock = jest.fn().mockImplementation(() => {
  return Promise.resolve();
});

jest.mock('@discordjs/rest', () => {
  return {
    REST: jest.fn().mockImplementation(() => {
      return {
        setToken: jest.fn().mockImplementation(() => {
          return {
            put: putMock,
          };
        }),
      };
    }),
  };
});

jest.mock('discord-api-types/v9', () => {
  return {
    Routes: {
      applicationGuildCommands: jest.fn().mockImplementation(() => {
        return 'applicationGuildCommands';
      }),
    },
  };
});

const mockClient = jest.fn().mockImplementation(() => {
  return {
    guilds: {
      cache: [
        {},
        {id: 'guild1'},
        {id: 'guild1'},
        {id: 'guild1'},
        {id: 'guild1'},
        {id: 'guild1'},
        {id: 'guild1'},
      ],
    },
    user: {},
  };
});

describe('onReady', () => {
  it('should call put 7 times', async () => {
    const client = mockClient();
    await onReady(client);
    expect(putMock).toHaveBeenCalledTimes(7);
  });
});
