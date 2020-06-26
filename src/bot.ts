import { CommandoClient as Client, CommandoClientOptions } from 'discord.js-commando';

export default class Bot extends Client {
  private config: CommandoClientOptions;

  constructor(config: CommandoClientOptions) {
    super({ owner: config.owner });
    this.config = config;
  }

  public start(token: string): this
  {
    this.login(token);
    this.on('ready', this.greet);
    this.on('error', console.error);
    this.on('reconnecting', () => console.log('Reconnecting ...'));
    this.on('disconnect', () => console.warn('Disconnected'));

    return this;
  }

  greet(): void {
    console.log(`Logged in as ${this.user.tag}`);
  }
}