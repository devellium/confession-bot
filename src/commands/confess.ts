import { SparkCommand, CommandType } from '@spark.ts/handler';
import { ChannelType, EmbedBuilder, TextChannel } from 'discord.js';
import { env } from '../util/env.js';

export default new SparkCommand({
  type: CommandType.Text,
  async run({ message, client, args }) {
    if (!args.join('')) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('❌ | Error')
            .setDescription(`Please send your confession.\nExample: \`confess hello\``)
            .setColor('Red')
        ],
      });
    }

    const channel = await client.channels.fetch(env.CHANNEL_ID) as TextChannel | null;

    if (!channel) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('❌ | Error')
            .setDescription(`Could not find the requested channel. (\`${env.CHANNEL_ID}\`)`)
            .setColor('Red')
        ],
      });
    }

    if (message.channel.type === ChannelType.GuildText) {
      if (message.deletable) {
        await message.delete();
      }
    }

    if (message.channel.type === ChannelType.DM) {
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('✅ | Success')
            .setDescription(`Successfully sent your confession to \`#${channel.name}\`.`)
            .setColor('Green')
        ],
      });
    }

    return channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('Anonymous Confession')
          .setDescription(args.join(' '))
          .setFooter({ text: 'Type "confess" to send a confession.' })
          .setColor('#ff9999')
      ]
    });
  },
});
