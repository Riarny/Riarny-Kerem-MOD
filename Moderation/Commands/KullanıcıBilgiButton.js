module.exports = {
  conf: {
    aliases: ["kullanıcıbilgibutton", "kullanıcıbilgibuton", "kullanıcıinfobuton", "kbbutton", "kbbuton"],
    name: "kullanıcıinfobutton",
    usage: 'kullanıcıinfobutton',
    description: 'Belirttiğiniz üyenin bilgilerini görüntülersiniz.',
  },

 run: async ({client, msg, args, author, MessageButton, SetupDatabase}) => {
   
   const res = await SetupDatabase.findOne({guildID: msg.guild.id})
   let commandsTrue = res && res.allCommandsTrue ? res.allCommandsTrue : [] 
  
   if (!msg.member.roles.cache.some(r => commandsTrue.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  
   let GirişTarihim = new MessageButton().setStyle("blurple").setLabel('1').setID('1')  
   let İsimlerim = new MessageButton().setStyle("blurple").setLabel('2').setID('2')  
   let AktifCezalarım = new MessageButton().setStyle("blurple").setLabel('3').setID('3')
   let CezaDurumum = new MessageButton().setStyle("blurple").setLabel('4').setID('4')
   let Davetçim = new MessageButton().setStyle("blurple").setLabel('5').setID('5')
   let Rollerim = new MessageButton().setStyle("blurple").setLabel('6').setID('6')  
   let MesajSayım = new MessageButton().setStyle("blurple").setLabel('7').setID('7')
   let SesSürem = new MessageButton().setStyle("blurple").setLabel('8').setID('8')
   let HesapKurulmaTarihim = new MessageButton().setStyle("blurple").setLabel('9').setID('9')
   let okeyEmoji = new MessageButton().setStyle("green").setLabel('✅').setID('10')
   let bildirimEmoji = new MessageButton().setStyle("grey").setLabel('🔔').setID('11')
   let noEmoji = new MessageButton().setStyle("red").setLabel('❌').setID('12')
 
   msg.channel.send(`Merhabalar, aşağıdaki yönlendirmeler doğrultusunda ilgili tuşlara basarak istediğiniz şey hakkında bilgi sahibi olabilirsiniz.\n\n**1:** Sunucuya katılma tarihinizi öğrenin.\n**2:** Veri tabanındaki eski isimlerinizi görüntüleyin.\n**3:** Devam eden cezalarınızdan 10 tanesini (varsa) görüntüleyin.\n\n**4:** Ceza durumuzunuzu görüntüleyin.\n**5:** Kim tarafından davet edildiğinizi görüntüleyin.\n**6:** Sahip olduğunuzu rolleri görüntüleyin.\n\n**7:** Sunucudaki mesaj sayınızı görüntüleyin.\n**8:** Sunucu sesli sohbetlerinde geçmiş olduğunuzu süreyi görüntüleyin.\n**9:** Hesabınızın oluşturulma tarihini görüntüleyin.\n\n✅**:** Eğer bir cezanız yoksa otomatik olarak son kaydınızdan tekrar kaydolun.\n🔔**:** Sunucunun istatistiklerini görüntüleyin.\n❌**:** Kaydınızı temizleyin ve tekrar teyit verin.`, { components: [ { type: 1, components: [GirişTarihim, İsimlerim, AktifCezalarım],}, { type: 1, components: [CezaDurumum, Davetçim, Rollerim],}, { type: 1, components: [MesajSayım, SesSürem, HesapKurulmaTarihim],}, { type: 1, components: [okeyEmoji, bildirimEmoji, noEmoji],},],})}}