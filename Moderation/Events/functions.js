const CezaDatabase = require("../Models/Ceza");
const CezapuanDatabase = require("../Models/Cezapuanı");
const StaffDatabase = require("../Models/Yetkili");
const CezaExtraRolesDatabase = require("../Models/ExtraCeza");
const CezaSayıDatabase = require("../Models/CezaSayı")
const { MessageEmbed } = require("discord.js");
const { MessageButton } = require('discord-buttons')
const cfg = require("../Configs/config.json")
const levelDatabase = require("../Models/GuildSeviye");

module.exports = (client, moment) => {

   client.vegasRenkler = new Array("#6959cd","#1f0524", "#0b0067", "#4a0038", "#07052a", "#FFDF00", "#00FFFF", "#0091CC", "#0047AB", "#384B77", "#ffffff", "#000000", "#04031a", "#f9ffba");

   client.normalEmbed = (message, msj) => {
     return {
       embed: {
         description: message,
         author: { name: msj.author.tag, icon_url: msj.author.avatarURL({dynamic: true}) },
         color: "RANDOM",}}}
  
  const sayiEmojiler = {
   0: "<a:say0:781563809601028138>",
   1: "<a:say1:781563820711215134>",
   2: "<a:say2:781563830932602892>",
   3: "<a:say3:781563855704555571>",
   4: "<a:say4:781563863199252511>",
   5: "<a:say5:781563882392387585>",
   6: "<a:say6:781563893621194763>",
   7: "<a:say7:781563901669670932>",
   8: "<a:say8:781563913623830599>",
   9: "<a:say9:781563925329608734>"
};

 client.emojiSayi = function(sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi);
  for (var x = 0; x < arr.length; x++) {
  yeniMetin += (sayiEmojiler[arr[x]] == "" ? arr[x] : sayiEmojiler[arr[x]]);}
  return yeniMetin;}
  
 client.uyarıEmbed = (message, msj) => {
    return {
     embed: {
      description: message,
      author: { name: `${msj.guild.member(msj.author).user.tag} Uyarıldı!`, icon_url: msj.author.avatarURL({dynamic: true}) },
      color: "RANDOM",}}};
  
  client.yetersizYetki = (message, msj) => {
    return {
     embed: {
      description: `Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`,
      author: { name: msj.author.tag, icon_url: msj.author.avatarURL({dynamic: true}) },
      color: "RANDOM",}}};
  
  client.timemessage = (content, Channel, timeout) => {
   const channel = client.channels.cache.get(Channel);
   if (channel) channel.send(content).then((msg) => msg.delete({ timeout: timeout })).catch(() => { });};
  
  client.message = (content, Channel) => {
   const channel = client.channels.cache.get(Channel);
   if (channel) channel.send(content).catch(() => { });};

  let yasaklı = ["oc","mal","avel","aptal","sikiş","sikik","yavşak","oç","amq","aw","awk","kabrini","fuck","f4ck","am","sanal 8","sex","ölmüşlerini","karını","kızını","sikim","pornhub","awq","mq","amcık","anal","götten","sikiyim","oç","allahoc","allahoç","aw","porno","porn","pornhub","awq","allahamk","allahaq","0r0spuc0cu","4n4n1 sk3r1m","p1c","@n@nı skrm","evladi","orsb","orsbcogu","amnskm","anaskm","mk","oc","abaza","abazan","ag","a\u011fz\u0131na s\u0131\u00e7ay\u0131m","fuck","shit","ahmak","seks","sex","allahs\u0131z","amar\u0131m","ambiti","am biti","amc\u0131\u011f\u0131","amc\u0131\u011f\u0131n","amc\u0131\u011f\u0131n\u0131","amc\u0131\u011f\u0131n\u0131z\u0131","amc\u0131k","amc\u0131k ho\u015faf\u0131","amc\u0131klama","amc\u0131kland\u0131","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","am\u0131k","am\u0131na","amına","am\u0131nako","am\u0131na koy","am\u0131na koyar\u0131m","am\u0131na koyay\u0131m","am\u0131nakoyim","am\u0131na koyyim","am\u0131na s","am\u0131na sikem","am\u0131na sokam","am\u0131n feryad\u0131","am\u0131n\u0131","am\u0131n\u0131 s","am\u0131n oglu","am\u0131no\u011flu","am\u0131n o\u011flu","am\u0131s\u0131na","am\u0131s\u0131n\u0131","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amina koyay\u0131m","amina koyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amin oglu","amiyum","amk","amkafa","amk \u00e7ocu\u011fu","amlarnzn","aml\u0131","amm","ammak","ammna","amn","amna","amnda","amndaki","amngtn","amnn","amona","amq","ams\u0131z","amsiz","amsz","amteri","amugaa","amu\u011fa","amuna","ana","anaaann","anal","analarn","anam","anamla","anan","anana","anandan","anan\u0131","anan\u0131","anan\u0131n","anan\u0131n am","anan\u0131n am\u0131","anan\u0131n d\u00f6l\u00fc","anan\u0131nki","anan\u0131sikerim","anan\u0131 sikerim","anan\u0131sikeyim","anan\u0131 sikeyim","anan\u0131z\u0131n","anan\u0131z\u0131n am","anani","ananin","ananisikerim","anani sikerim","ananisikeyim","anani sikeyim","anann","ananz","anas","anas\u0131n\u0131","anas\u0131n\u0131n am","anas\u0131 orospu","anasi","anasinin","anay","anayin","angut","anneni","annenin","annesiz","anuna","aq","a.q","a.q.","aq.","ass","atkafas\u0131","atm\u0131k","att\u0131rd\u0131\u011f\u0131m","attrrm","auzlu","avrat","ayklarmalrmsikerim","azd\u0131m","azd\u0131r","azd\u0131r\u0131c\u0131","babaannesi ka\u015far","baban\u0131","baban\u0131n","babani","babas\u0131 pezevenk","baca\u011f\u0131na s\u0131\u00e7ay\u0131m","bac\u0131na","bac\u0131n\u0131","bac\u0131n\u0131n","bacini","bacn","bacndan","bacy","bastard","basur","beyinsiz","b\u0131z\u0131r","bitch","biting","boner","bosalmak","bo\u015falmak","cenabet","cibiliyetsiz","cibilliyetini","cibilliyetsiz","cif","cikar","cim","\u00e7\u00fck","dalaks\u0131z","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domald\u0131","domald\u0131n","domal\u0131k","domal\u0131yor","domalmak","domalm\u0131\u015f","domals\u0131n","domalt","domaltarak","domalt\u0131p","domalt\u0131r","domalt\u0131r\u0131m","domaltip","domaltmak","d\u00f6l\u00fc","d\u00f6nek","d\u00fcd\u00fck","eben","ebeni","ebenin","ebeninki","ebleh","ecdad\u0131n\u0131","ecdadini","embesil","emi","fahise","fahi\u015fe","feri\u015ftah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibi\u015f","gibmek","gibtiler","goddamn","godo\u015f","godumun","gotelek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","goyiim","goyum","goyuyim","goyyim","g\u00f6t","g\u00f6t deli\u011fi","g\u00f6telek","g\u00f6t herif","g\u00f6tlalesi","g\u00f6tlek","g\u00f6to\u011flan\u0131","g\u00f6t o\u011flan\u0131","g\u00f6to\u015f","g\u00f6tten","g\u00f6t\u00fc","g\u00f6t\u00fcn","g\u00f6t\u00fcne","g\u00f6t\u00fcnekoyim","g\u00f6t\u00fcne koyim","g\u00f6t\u00fcn\u00fc","g\u00f6tveren","g\u00f6t veren","g\u00f6t verir","gtelek","gtn","gtnde","gtnden","gtne","gtten","gtveren","hasiktir","hassikome","hassiktir","has siktir","hassittir","haysiyetsiz","hayvan herif","ho\u015faf\u0131","h\u00f6d\u00fck","hsktr","huur","\u0131bnel\u0131k","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","imansz","ipne","iserim","i\u015ferim","ito\u011flu it","kafam girsin","kafas\u0131z","kafasiz","kahpe","kahpenin","kahpenin feryad\u0131","kaka","kaltak","kanc\u0131k","kancik","kappe","karhane","ka\u015far","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","keva\u015fe","kevvase","koca g\u00f6t","kodu\u011fmun","kodu\u011fmunun","kodumun","kodumunun","koduumun","koyarm","koyay\u0131m","koyiim","koyiiym","koyim","koyum","koyyim","krar","kukudaym","laciye boyad\u0131m","libo\u015f","madafaka","malafat","malak","mcik","meme","memelerini","mezveleli","minaamc\u0131k","mincikliyim","mna","monakkoluyum","motherfucker","mudik","oc","ocuu","ocuun","O\u00c7","o\u00e7","o. \u00e7ocu\u011fu","o\u011flan","o\u011flanc\u0131","o\u011flu it","orosbucocuu","orospu","orospucocugu","orospu cocugu","orospu \u00e7oc","orospu\u00e7ocu\u011fu","orospu \u00e7ocu\u011fu","orospu \u00e7ocu\u011fudur","orospu \u00e7ocuklar\u0131","orospudur","orospular","orospunun","orospunun evlad\u0131","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspu\u00e7ocu\u011fu","oruspu \u00e7ocu\u011fu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","\u00f6k\u00fcz","\u00f6\u015fex","patlak zar","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin evlad\u0131","pezevenk","pezo","pic","pici","picler","pi\u00e7","pi\u00e7in o\u011flu","pi\u00e7 kurusu","pi\u00e7ler","pipi","pipi\u015f","pisliktir","porno","pussy","pu\u015ft","pu\u015fttur","rahminde","revizyonist","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","serefsiz","sevgi koyar\u0131m","sevi\u015felim","sexs","s\u0131\u00e7ar\u0131m","s\u0131\u00e7t\u0131\u011f\u0131m","s\u0131ecem","sicarsin","sie","sik","sikdi","sikdi\u011fim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikesicenin","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmi\u015f","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","siki\u015f","siki\u015fen","siki\u015fme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt","sikti","siktigimin","siktigiminin","sikti\u011fim","sikti\u011fimin","sikti\u011fiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktim","siktimin","siktiminin","siktir","siktir et","siktirgit","siktir git","siktirir","siktiririm","siktiriyor","siktir lan","siktirolgit","siktir ol git","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokar\u0131m","sokarim","sokarm","sokarmkoduumun","sokay\u0131m","sokaym","sokiim","soktu\u011fumunun","sokuk","sokum","soku\u015f","sokuyum","soxum","sulaleni","s\u00fclaleni","s\u00fclalenizi","s\u00fcrt\u00fck","\u015ferefsiz","\u015f\u0131ll\u0131k","taaklarn","taaklarna","tarrakimin","tasak","tassak","ta\u015fak","ta\u015f\u015fak","tipini s.k","tipinizi s.keyim","tiyniyat","toplarm","topsun","toto\u015f","vajina","vajinan\u0131","veled","veledizina","veled i zina","verdiimin","weled","weledizina","whore","xikeyim","yaaraaa","yalama","yalar\u0131m","yalarun","yaraaam","yarak","yaraks\u0131z","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraam\u0131","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarra\u011f","yarra\u011f\u0131m","yarra\u011f\u0131m\u0131","yarraimin","yarrak","yarram","yarramin","yarraminba\u015f\u0131","yarramn","yarran","yarrana","yarrrak","yavak","yav\u015f","yav\u015fak","yav\u015fakt\u0131r","yavu\u015fak","y\u0131l\u0131\u015f\u0131k","yilisik","yogurtlayam","yo\u011furtlayam","yrrak","z\u0131kk\u0131m\u0131m","zibidi","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini"];
   client.chatKoruma = async Msg => {
   if (!Msg) return;
   let inv = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
   if (inv.test(Msg)) return true;
   let link = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;  
   if (link.test(Msg)) return true;
   if ((yasaklı).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(Msg))) return true;
   return false;};
  
   client.shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  client.format = sure => {
   return moment.duration(sure).format("D [gün,] H [saat,] m [dakika,] s [saniye.]");};
  
  client.toDate = date => {
   return moment(date).format("DD MM YYYY HH:mm");};
  
  client.punish = async(kisiID, tur, sebep) => {
   const SetupDatabase = require("../Models/Setup")
   const res = await SetupDatabase.findOne({})
   let guildID = res && res.guildID ? res.guildID : ""
   if (guildID === "") return
   let vegas = client.guilds.cache.get(guildID).members.cache.get(kisiID);
   if (!vegas) return;
   if (tur == "ban") return vegas.ban({ reason: sebep })}
  
  client.çek = (User, MsgAuthor) => {
   User.voice.setChannel(MsgAuthor.voice.channelID).catch(() => { })}
  
  client.git = (User, MsgAuthor) => {
   MsgAuthor.voice.setChannel(User.voice.channelID).catch(() => { })}
  
  client.taşı = (User, Channel) => {
   User.voice.setChannel(Channel).catch(() => { })}
  
    client.chunkArray = (arr, chunkSize) => {
        const chunks = [];
        let currentChunk = [];
        for (let i = 0; i < arr.length; i++) {
          currentChunk.push(arr[i]);
          if ((i !== 0 && i % chunkSize === 0) || i === arr.length - 1) {
            chunks.push(currentChunk);
            currentChunk = [];
          };
        };
        return chunks;
      };
  
  client.KüfürControls = ["yarram","doeda","amkcocu","penis","pussy","amcık","oc","sikiş","sikik","yavşak","oç","amq","aw","awk","kabrini","fuck","f4ck","am","sex","ölmüşlerini","sikim","pornhub","awq","mq","amcık","anal","götten","sikiyim","oç","allahoc","allahoç","aw","porno","porn","pornhub","awq","allahamk","allahaq","0r0spuc0cu","4n4n1 sk3r1m","p1c","@n@nı skrm","evladi","orsb","orsbcogu","amnskm","anaskm","mk","oc","ag","a\u011fz\u0131na s\u0131\u00e7ay\u0131m","fuck","shit","ahmak","seks","sex","allahs\u0131z","amar\u0131m","ambiti","am biti","amc\u0131\u011f\u0131","amc\u0131\u011f\u0131n","amc\u0131\u011f\u0131n\u0131","amc\u0131\u011f\u0131n\u0131z\u0131","amc\u0131k","amc\u0131k ho\u015faf\u0131","amc\u0131klama","amc\u0131kland\u0131","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","am\u0131k","am\u0131na","amına","am\u0131nako","am\u0131na koy","am\u0131na koyar\u0131m","am\u0131na koyay\u0131m","am\u0131nakoyim","am\u0131na koyyim","am\u0131na s","am\u0131na sikem","am\u0131na sokam","am\u0131n feryad\u0131","am\u0131n\u0131","am\u0131n\u0131 s","am\u0131n oglu","am\u0131no\u011flu","am\u0131n o\u011flu","am\u0131s\u0131na","am\u0131s\u0131n\u0131","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amina koyay\u0131m","amina koyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amin oglu","amiyum","amk","amkafa","amk \u00e7ocu\u011fu","amlarnzn","aml\u0131","amm","ammak","ammna","amn","amna","amnda","amndaki","amngtn","amnn","amona","amq","ams\u0131z","amsiz","amsz","amteri","amugaa","amu\u011fa","amuna","ana","anaaann","anal","analarn","anam","anamla","anan","anana","anandan","anan\u0131","anan\u0131","anan\u0131n","anan\u0131n am","anan\u0131n am\u0131","anan\u0131n d\u00f6l\u00fc","anan\u0131nki","anan\u0131sikerim","anan\u0131 sikerim","anan\u0131sikeyim","anan\u0131 sikeyim","anan\u0131z\u0131n","anan\u0131z\u0131n am","anani","ananin","ananisikerim","anani sikerim","ananisikeyim","anani sikeyim","anann","ananz","anas","anas\u0131n\u0131","anas\u0131n\u0131n am","anas\u0131 orospu","anasi","anasinin",,"anneni","annenin","annesiz","anuna","aq","a.q","a.q.","aq.","atkafas\u0131","atm\u0131k","att\u0131rd\u0131\u011f\u0131m","avrat","ayklarmalrmsikerim","azd\u0131m","azd\u0131r","azd\u0131r\u0131c\u0131","babaannesi ka\u015far","baban\u0131","baban\u0131n","babani","babas\u0131 pezevenk","baca\u011f\u0131na s\u0131\u00e7ay\u0131m","bac\u0131na","bac\u0131n\u0131","bac\u0131n\u0131n","bacini","bacn","bacndan","bacy","bastard","basur","beyinsiz","b\u0131z\u0131r","bitch","biting","boner","bosalmak","bo\u015falmak","\u00e7\u00fck","dalaks\u0131z","dallama","daltassak","dalyarak","dalyarrak","dassagi","diktim","dildo","dkerim","domal","domalan","domald\u0131","domald\u0131n","domal\u0131k","domal\u0131yor","domalmak","domalm\u0131\u015f","domals\u0131n","domalt","domaltarak","domalt\u0131p","domalt\u0131r","domalt\u0131r\u0131m","domaltip","domaltmak","d\u00f6l\u00fc","d\u00f6nek","d\u00fcd\u00fck","eben","ebeni","ebenin","ebeninki","ebleh","ecdad\u0131n\u0131","ecdadini","embesil","emi","fahise","fahi\u015fe","feri\u015ftah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibi\u015f","gibmek","gibtiler","goddamn","godo\u015f","gotelek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","goyiim","goyum","goyuyim","goyyim","g\u00f6t","g\u00f6t deli\u011fi","g\u00f6telek","g\u00f6t herif","g\u00f6tlalesi","g\u00f6tlek","g\u00f6to\u011flan\u0131","g\u00f6t o\u011flan\u0131","g\u00f6to\u015f","g\u00f6tten","g\u00f6t\u00fc","g\u00f6t\u00fcn","g\u00f6t\u00fcne","g\u00f6t\u00fcnekoyim","g\u00f6t\u00fcne koyim","g\u00f6t\u00fcn\u00fc","g\u00f6tveren","g\u00f6t veren","g\u00f6t verir","gtelek","gtn","gtnde","gtnden","gtne","gtten","gtveren","hasiktir","hassikome","hassiktir","has siktir","hassittir","haysiyetsiz","hayvan herif","ho\u015faf\u0131","h\u00f6d\u00fck","hsktr","huur","\u0131bnel\u0131k","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","imansz","ipne","iserim","i\u015ferim","ito\u011flu it","kafam girsin","kafas\u0131z","kafasiz","kahpe","kahpenin","kahpenin feryad\u0131","kaka","kaltak","kanc\u0131k","kancik","kappe","karhane","ka\u015far","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","keva\u015fe","kevvase","koca g\u00f6t","kodu\u011fmun","kodu\u011fmunun","kodumun","kodumunun","koduumun","koyarm","koyay\u0131m","koyiim","koyiiym","koyim","koyum","koyyim","krar","kukudaym","laciye boyad\u0131m","libo\u015f","madafaka","malafat","malak","mcik","meme","memelerini","mezveleli","minaamc\u0131k","mincikliyim","mna","monakkoluyum","motherfucker","mudik","oc","ocuu","ocuun","O\u00c7","o\u00e7","o. \u00e7ocu\u011fu","o\u011flan","o\u011flanc\u0131","o\u011flu it","orosbucocuu","orospu","orospucocugu","orospu cocugu","orospu \u00e7oc","orospu\u00e7ocu\u011fu","orospu \u00e7ocu\u011fu","orospu \u00e7ocu\u011fudur","orospu \u00e7ocuklar\u0131","orospudur","orospular","orospunun","orospunun evlad\u0131","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspu\u00e7ocu\u011fu","oruspu \u00e7ocu\u011fu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","\u00f6k\u00fcz","\u00f6\u015fex","patlak zar","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin evlad\u0131","pezevenk","pezo","pic","pici","picler","pi\u00e7","pi\u00e7in o\u011flu","pi\u00e7 kurusu","pi\u00e7ler","pipi","pipi\u015f","pisliktir","porno","pussy","pu\u015ft","pu\u015fttur","rahminde","revizyonist","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","serefsiz","sevgi koyar\u0131m","sevi\u015felim","sexs","s\u0131\u00e7ar\u0131m","s\u0131\u00e7t\u0131\u011f\u0131m","s\u0131ecem","sicarsin","sie","sik","sikdi","sikdi\u011fim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikesicenin","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmi\u015f","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","siki\u015f","siki\u015fen","siki\u015fme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt","sikti","siktigimin","siktigiminin","sikti\u011fim","sikti\u011fimin","sikti\u011fiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktim","siktimin","siktiminin","siktir","siktir et","siktirgit","siktir git","siktirir","siktiririm","siktiriyor","siktir lan","siktirolgit","siktir ol git","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokar\u0131m","sokarim","sokarm","sokarmkoduumun","sokay\u0131m","sokaym","sokiim","soktu\u011fumunun","sokuk","sokum","soku\u015f","sokuyum","soxum","sulaleni","s\u00fclaleni","s\u00fclalenizi","s\u00fcrt\u00fck","\u015ferefsiz","\u015f\u0131ll\u0131k","taaklarn","taaklarna","tarrakimin","tasak","tassak","ta\u015fak","ta\u015f\u015fak","tipini s.k","tipinizi s.keyim","tiyniyat","toplarm","topsun","toto\u015f","vajina","vajinan\u0131","veled","veledizina","veled i zina","verdiimin","weled","weledizina","whore","xikeyim","yaaraaa","yalama","yalar\u0131m","yalarun","yaraaam","yarak","yaraks\u0131z","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraam\u0131","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarra\u011f","yarra\u011f\u0131m","yarra\u011f\u0131m\u0131","yarraimin","yarrak","yarram","yarramin","yarraminba\u015f\u0131","yarramn","yarran","yarrana","yarrrak","yavak","yav\u015f","yav\u015fak","yav\u015fakt\u0131r","yavu\u015fak","y\u0131l\u0131\u015f\u0131k","yilisik","yogurtlayam","yo\u011furtlayam","yrrak","z\u0131kk\u0131m\u0131m","zibidi","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini"];
   
  client.getDate = (date, type) => {
   let sure;
   date = Number(date);
   if (type === "saniye") { sure = (date * 1000) }
   else if (type === "dakika") { sure = (60 * 1000) * date }
   else if (type === "saat") { sure = ((60 * 1000) * 60) * date }
   else if (type === "gün") { sure = (((60 * 1000) * 60) * 24) * date }
   else if (type === "hafta") { sure = ((((60 * 1000) * 60) * 24) * 7) * date }
   else if (type === "ay") { sure = ((((60 * 1000) * 60) * 24) * 30) * date }
   else if (type === "yıl") { sure = ((((((60 * 1000) * 60) * 24) * 30) * 12) + 5) * date };
   return sure;};

  client.setRoles = async(memberID, rolID) => {
   const SetupDatabase = require("../Models/Setup")
   const res = await SetupDatabase.findOne({})
   let guildID = res && res.guildID ? res.guildID : ""
   if (guildID === "") return
   const doc = await SetupDatabase.findOne({guildID: guildID})
   let boosterTrue = doc && doc.boosterRole ? doc.boosterRole : ""
   let punitiveRole = doc && doc.punitiveRole ? doc.punitiveRole : ""
   let victim = client.guilds.cache.get(guildID).members.cache.get(memberID);
   if(victim.roles.cache.has(boosterTrue)) {
   let ayarlanacak = victim.roles.cache.filter(x => x.managed).map(x => x.id).concat(rolID)
   victim.roles.set(ayarlanacak).catch(() => { })
   } else {
   victim.roles.set(rolID).catch(() => { })}}
  
  client.react = (msg, Tür) => {
   if (Tür == "tick") return msg.react(cfg.Emoji.TickEmoji)
   if (Tür == "red") return msg.react(cfg.Emoji.RedEmoji)}

  Array.prototype.chunk = function(chunk_size) {
     let myArray = Array.from(this);
     let tempArray = [];
     for (let index = 0; index < myArray.length; index += chunk_size) {
       let chunk = myArray.slice(index, index + chunk_size);
       tempArray.push(chunk);
     }
     return tempArray;
   }

  client.capsCheck = (partialValue, totalValue) => {
   return (100 * partialValue) / totalValue;
  } 
  
  client.parseTime = duration => {
    let arr = []
    if (duration / 3600000 > 1) {
      let val = parseInt(duration / 3600000)
      let durationn = parseInt((duration - (val * 3600000)) / 60000)
      arr.push(`${val} saat`)
      arr.push(`${durationn} dk.`)
    } else {
      let durationn = parseInt(duration / 60000)
      arr.push(`${durationn} dk.`)
    }
    return arr.join(", ")
  }
  
  client.checkCeza = async function(uye, msg, CezaPuanı) {  
   const SetupDatabase = require("../Models/Setup")
   const res = await SetupDatabase.findOne({guildID: msg.guild.id})
   let boosterTrue = res && res.boosterRole ? res.boosterRole : ""
   let punitiveRole = res && res.punitiveRole ? res.punitiveRole : ""
   let cezaPuanıLog = res && res.cezaPuanıLog ? res.cezaPuanıLog : ""
   let jailLog = res && res.jailLog ? res.jailLog : ""
   if (CezaPuanı >= 250) {
    await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanı250sınırceza: 1 } }, { upsert: true });
    let CezaPuanıCheck = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id});
    if (CezaPuanıCheck.cezapuanı250sınırceza >= 3) {
     let count = await CezaDatabase.countDocuments().exec();
      count = count == 0 ? 1 : count + 1;   
     await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $set: { cezapuanı250sınırceza: 0 } }, { upsert: true }); 
     uye.roles.cache.has(boosterTrue) ?  uye.roles.set([boosterTrue, punitiveRole]) : uye.roles.set([punitiveRole])
     let CezaExtraRolesData = await CezaExtraRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
     if (!CezaExtraRolesData) {
      let newCezaa = new CezaExtraRolesDatabase({guildID: msg.guild.id, userID: uye.id, roles: uye.roles.cache.map(x => x.id)}).save();
    } else{
      CezaExtraRolesData.roles.push(uye.roles.cache.map(x => x.id)); 
      CezaExtraRolesData.save();
    }
    await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
    await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { jail: 1 } }, { upsert: true });
    await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıjail: 15 } }, { upsert: true });
    await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,jail3days: true,time: 259200000,date: Date.now(),finishDate: Date.now()+259200000,Reason: "+ 250 Cezapuanı",Type: "Jail"}).save()
    let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
    let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
    let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
    let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
    let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
    let toplam = chatMute+sesMute+ban+jail;
     msg.channel.send(`${uye} üyesinin ceza puanı + 250 olduğu için 3 gün boyunca cezalıya atıldı.`)
     if (client.channels.cache.get(jailLog)) client.channels.cache.get(jailLog).send(new MessageEmbed().setColor("RED").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.user.tag.replace("`", "")}\` - \`${uye.id}\`) üyesi 3 gün süreliğine cezalıya atıldı.\n\n• Cezalı Başlangıç: \`${moment(Date.now()).locale("TR").format("LLL")}\`\n• Cezalı Bitiş: \`${moment(Date.now()+259200000).locale("TR").format("LLL")}\`\n• Cezalı Sebebi: \`+ 250 Ceza puanı\``))    
     if (client.channels.cache.get(cezaPuanıLog)) client.channels.cache.get(cezaPuanıLog).send(`${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam}** ceza puanına ulaştınız.`)
   return}return}       
  }
  
  client.checkChannelPerms = async function(type, perms, channel, view) {  
    
   let Channel = client.channels.cache.get(channel)
   if (!Channel) return
   if (view === true) {
    if (type === "array") {
     if (perms.length === 0) return 
     perms.forEach(perm => {
      Channel.updateOverwrite(perm, { SEND_MESSAGES: false, VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true })     
     })
   } else if (type === "string") {
    if (type === "")  return
    Channel.updateOverwrite(perms, { SEND_MESSAGES: false, VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true })     
   }
   } if (view === false) {
      if (type === "array") {
       if (perms.length === 0) return 
       perms.forEach(perm => {
       Channel.updateOverwrite(perm, { SEND_MESSAGES: false, VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false })     
   })
   } else if (type === "string") {
     if (type === "")  return
     if (perms === "") return 
     Channel.updateOverwrite(perms, { SEND_MESSAGES: false, VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false })     
   }        
   }
  }  

  client.addChatMute = async(uye, reason, time, guildID, msg) => {
   const CezaDatabase = require("../Models/Ceza");
   const CezapuanDatabase = require("../Models/Cezapuanı");
   const CezaSayıDatabase = require("../Models/CezaSayı")
   const SetupDatabase = require("../Models/Setup")
   const ms = require("ms")
   const moment = require("moment")
   let member = client.guilds.cache.get(guildID).members.cache.get(uye);
   const data = await CezaDatabase.findOne({ guildID: guildID, userID: member.id, chatmuted: true})
   if (!data) {
   let CezapuanData = await CezapuanDatabase.findOne({ guildID: guildID, userID: member.id})
   let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
   let voiceMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
   let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
   let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
   let CezaPuanı = chatMute+voiceMute+ban+jail;
   const res = await SetupDatabase.findOne({guildID: guildID})
   let cezaPuanıLog = res && res.cezaPuanıLog ? res.cezaPuanıLog : ""
   let chatMuteLog = res && res.chatMuteLog ? res.chatMuteLog : ""
   let mutedRole = res && res.mutedRole ? res.mutedRole : ""
   let count = await CezaDatabase.countDocuments().exec();
    count = count == 0 ? 1 : count + 1; 
   let extraMuteNumber; if(CezaPuanı > 201) extraMuteNumber = "1h";if(CezaPuanı === 201) extraMuteNumber = "1h";if(CezaPuanı < 200) extraMuteNumber = "30m";if(CezaPuanı === 200) extraMuteNumber = "30m";if(100 === CezaPuanı) extraMuteNumber = "30m";if(CezaPuanı < 100) extraMuteNumber = "25m";if(CezaPuanı === 100) extraMuteNumber = "25m";if(CezaPuanı === 71) extraMuteNumber = "25m";if(CezaPuanı < 70) extraMuteNumber = "5m";if(CezaPuanı === 70) extraMuteNumber = "5m";if(41 === CezaPuanı) extraMuteNumber = "5m";if(CezaPuanı === 40) extraMuteNumber = "3m";if(CezaPuanı < 40) extraMuteNumber = "3m";if(21 === CezaPuanı) extraMuteNumber = "3m";if(CezaPuanı < 20) extraMuteNumber = "0";if(20 === CezaPuanı) extraMuteNumber = "0";if(CezaPuanı === 1) extraMuteNumber = "0";if(CezaPuanı == `0`) extraMuteNumber = "0";
   let extraMuteString; if(CezaPuanı > 201) extraMuteString = " \`(+1 saat)\`";if(CezaPuanı === 201) extraMuteString = " \`(+1 saat)\`";if(CezaPuanı < 200) extraMuteString = " \`(+30 dakika)\`";if(CezaPuanı === 200) extraMuteString = " \`(+30 dakika)\`";if(100 === CezaPuanı) extraMuteString = " \`(+30 dakika)\``";if(CezaPuanı < 100) extraMuteString = " \`(+25 dakika)\`";if(CezaPuanı === 100) extraMuteString = " \`(+25 dakika)\`";if(CezaPuanı === 71) extraMuteString = " \`(+25 dakika)\`";if(CezaPuanı < 70) extraMuteString = " \`(+5 dakika)\`";if(CezaPuanı === 70) extraMuteString = " \`(+5 dakika)\`";if(41 === CezaPuanı) extraMuteString = " \`(+5 dakika)\`";if(CezaPuanı === 40) extraMuteString = " \`(+3 dakika)\`";if(CezaPuanı < 40) extraMuteString = " \`(+3 dakika)\`";if(21 === CezaPuanı) extraMuteString = " \`(+3 dakika)\`";if(CezaPuanı < 20) extraMuteString = "";if(20 === CezaPuanı) extraMuteString = "";if(CezaPuanı === 1) extraMuteString = "";if(CezaPuanı == `0`) extraMuteString = "";
   let msTime = ms(time)+ms(extraMuteNumber)
   let finishDate = Date.now()+ms(time)+ms(extraMuteNumber) 
   let muteTime = require("humanize-duration")(msTime, { language: "tr", round: true, conjunction: ", ", serialComma: false})
    await CezaSayıDatabase.findOneAndUpdate({ guildID: guildID, userID: member.id}, { $inc: { chatmute: 1 } }, { upsert: true });
    await CezapuanDatabase.findOneAndUpdate({ guildID: guildID, userID: member.id}, { $inc: { cezapuanıchatmute: 8 } }, { upsert: true });
    await new CezaDatabase({guildID: guildID, authorID: client.user.id, cezaID: count, userID: member.id, time: muteTime, date: Date.now(), chatmuted: true,finishDate: finishDate, Reason: reason, Type: "Chat Mute"}).save()
   msg.channel.send(`${cfg.Emoji.TickEmoji} ${member} kişisi ${muteTime}${extraMuteString} boyunca metin kanallarında susturuldu. (Ceza Numarası: \`#${count}\`)`)
   if (client.guilds.cache.get(guildID).roles.cache.get(mutedRole)) member.roles.add(mutedRole)   
   if (client.channels.cache.get(chatMuteLog)) client.channels.cache.get(chatMuteLog).send(new MessageEmbed().setColor("RED").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${member} (\`${member.id}\`) üyesi metin kanallarında susturuldu.\n\n• Mute Atılma: \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Mute Bitiş: \`${moment(finishDate).locale('TR').format('LLL')}\`\n• Süre: \`${muteTime}\`\n\n• Sebep: \`${reason}\``)) 
   if (client.channels.cache.get(cezaPuanıLog)) {
    if (CezaPuanı+8 === 8) { 
     client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${member}: aldığınız **#${count}** ID'li ceza ile ilk ceza puanlandırmanız yapıldı **${CezaPuanı+8}** ceza puanına ulaştınız.`)
   } else client.channels.cache.get(cezaPuanıLog).send(`${cfg.Emoji.RedEmoji} ${member}: aldığınız **#${count}** ID'li ceza ile **${CezaPuanı}** ceza puanından **${CezaPuanı+8}** ceza puanına ulaştınız.`)
   }    
   client.checkCeza(member, msg, CezaPuanı+8) 
   } else { 
    let timeII = require("humanize-duration")(ms(time), { language: "tr", round: true, conjunction: ", ", serialComma: false}) 
    let zmn = data.finishDate+ms(time)
     data.time = timeII
     data.finishDate = zmn
     data.save()  
    msg.channel.send(`${cfg.Emoji.TickEmoji} ${member} Limiti aştığın için mute sürene \`+ ${timeII}\` daha eklendi.`)
   }
  } 
  
 client.roleControl = async(level, member) => {
  const SetupDatabase = require("../Models/Setup")
  const doc = await SetupDatabase.findOne({})
  let guildID = doc && doc.guildID ? doc.guildID : ""
  if (guildID === "") return
  const res = await SetupDatabase.findOne({guildID: guildID})
  let levelLog = res && res.levelLog ? res.levelLog : ""
  let LevelData = await levelDatabase.findOne({ guildID: guildID});
  if (LevelData && LevelData.LevelAward.find(x => x.level == level)) {
   LevelData.LevelAward.filter(x => x.level == level).forEach(async x => {
  if (member.roles.cache.has(x.role)) return
  if (client.channels.cache.has(levelLog)) client.channels.cache.get(levelLog).send(`<@!${member.id}> tebrikler! **${level}.seviyeye** gelerek  \`${member.guild.roles.cache.get(x.role).name}\`  rol(leri) kazandın.`)
   member.roles.add(x.role).catch(() => { })
  LevelData.LevelAward.filter(x => x.level < level).forEach(async z => {   
   member.roles.remove(z.role).catch(() => { })})})}}  
 
}