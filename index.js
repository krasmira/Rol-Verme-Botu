const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '-'; // Bot prefixi

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} kullanıcı adı ile giriş yaptı!`);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('-') || message.author.bot) return;
  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'warn') {
    if (!message.member.roles.cache.some(role => ['834480283881308241', '726845950785486858'].includes(role.id))) {
      return;
    }
    if (!args[0]) {
      return message.reply('Uyarılacak kullanıcıyı etiketle veya ID\'sini gir.');
    }
    let member = message.mentions.members.first();
    if (!member) {
      member = await message.guild.members.fetch(args[0]).catch(err => {});
      if (!member) {
        return message.reply('Geçerli bir kullanıcı belirtmelisin.');
      }
    }
    const role1 = message.guild.roles.cache.get('1076919419055374427');
    const role2 = message.guild.roles.cache.get('1077169502074196019');
    if (!role1) {
      return message.reply('Geçersiz rol ID\'si: 1076919419055374427');
    }
    if (!member.roles.cache.has(role1.id) && !member.roles.cache.has(role2.id)) {
      await member.roles.add(role1);
      message.reply(`Kullanıcıya ${role1.name} rolü verildi.`);
    } else if (member.roles.cache.has(role1.id) && !member.roles.cache.has(role2.id)) {
      await member.roles.remove(role1);
      await member.roles.add(role2);
      message.reply(`Kullanıcıdan ${role1.name} rolü alındı, ${role2.name} rolü verildi.`);
    }
  }
});


client.login('MTA3Njk1MDEyMzEwOTY4NzMyOA.GckV28.io7Qghk1olj5DyJNgdisjadGaTi23PafEgtXsY');
