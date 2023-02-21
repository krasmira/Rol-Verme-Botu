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

  if (command === 'rolver') { //Prefixten sonraki komutumuz burayı istediğiniz gibi değiştirebilirsiniz.
    if (!message.member.roles.cache.some(role => ['yetkiliRol1', 'yetkiliRol2'].includes(role.id))) { //Bu komutu kullanmasını istediğiniz rollerin idsini yazınız.
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
    const role1 = message.guild.roles.cache.get('Rol 1'); //Rol 1 rolünün id sini yazalım.
    const role2 = message.guild.roles.cache.get('Rol 2'); //Rol 1 rolünün id sini yazalım.
    if (!role1) {
      return message.reply('Geçersiz rol ID\'si: uyari1');
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


client.login('Token'); //Botumuzun tokenini yazalım.
