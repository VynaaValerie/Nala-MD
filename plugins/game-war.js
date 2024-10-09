
let handler = async (m, { conn, usedPrefix, participants }) => {
conn.level = global.db.data.users[m.sender]
  conn.fight = conn.fight ? conn.fight : {}
  const delay = time => new Promise(res=>setTimeout(res,time));

  if (typeof conn.fight[m.sender] != "undefined" && conn.fight[m.sender] == true) return m.reply(`*Tidak bisa melakukan battle Kucing kamu sedang bertarung bro.*`)
  if (new Date - global.db.data.users[m.sender].lastmulung< 1800000) throw `kucing anda sudah kecapean berkelahi tunggu ${msToTime(time - new Date())} lagi`
 
  let users = participants.map(u => u.id)
  var lawan
	lawan = users[Math.floor(users.length * Math.random())]
  while (typeof global.db.data.users[lawan] == "undefined" || lawan == m.sender){
    lawan = users[Math.floor(users.length * Math.random())]
  }

  let lamaPertarungan = getRandom(1,1)

  m.reply(`*Pet Kamu* (${global.db.data.users[m.sender].kucing}, ${global.db.data.users[m.sender].kuda}, ${global.db.data.users[m.sender].naga}, ${global.db.data.users[m.sender].phonix}, ${global.db.data.users[m.sender].kyubi}, ${global.db.data.users[m.sender].centaur}, ${global.db.data.users[m.sender].griffin}, ${global.db.data.users[m.sender].serigala}) menantang *${conn.getName(lawan)}* (${global.db.data.users[lawan].kucing}, ${global.db.data.users[lawan].kuda}, ${global.db.data.users[lawan].naga}, ${global.db.data.users[lawan].phonix}, ${global.db.data.users[lawan].kyubi}, ${global.db.data.users[lawan].centaur}, ${global.db.data.users[lawan].griffin}, ${global.db.data.users[lawan].serigala}) dan sedang dalam pertarungan sengit.\n\nTunggu ${lamaPertarungan} menit lagi dan lihat siapa yang menang.`)

  conn.fight[m.sender] = true

  await delay(1 * 1 * lamaPertarungan)

  let alasanKalah = ['Naikin lagi levelnya😐','Cupu','Kurang hebat','Ampas Petnya','Pet gembel']
  let alasanMenang = ['Hebat','Pro','Ganas Pet','Legenda Pet','Sangat Pro','Rajin Ngasi Makan Pet']

  let kesempatan = []
  for (i=0;i<global.db.data.users[m.sender].kucing,kuda,naga,phonix,kyubi,centaur,griffin,serigala;i++) kesempatan.push(m.sender)
  for (i=0;i<global.db.data.users[lawan].kucing,kuda,naga,phonix,kyubi,centaur,griffin,serigala;i++) kesempatan.push(lawan)

  let pointPemain = 0
  let pointLawan = 0
  for (i=0;i<10;i++){
    unggul = getRandom(0,kesempatan.length-1)
    if (kesempatan[unggul] == m.sender) pointPemain += 1
    else pointLawan += 1
  }

  if (pointPemain > pointLawan){
    let hadiah = (pointPemain - pointLawan) * 20
    global.db.data.users[m.sender].money += hadiah
    global.db.data.users[m.sender].tiketcoin += 1
    m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*Pet Kamu* (🐱kucing,🐎kuda,🐉naga,🦚phonix,🦊kyubi,🦁centaur,🦅griffin,🐺serigala  ${global.db.data.users[m.sender].kucing,kuda,naga,phonix,kyubi,centaur,griffin,serigala}) MENANG melawan *${conn.getName(lawan)}* ,kucing,kuda,naga,phonix,kyubi,centaur,griffin,serigala}) ${global.db.data.users[lawan].kucing,kuda,naga,phonix,kyubi,centaur,griffin,serigala}) karena kamu ${alasanMenang[getRandom(0,alasanMenang.length-1)]}\n\nHadiah $${hadiah.toLocaleString()}\n+1 Tiketcoin`)
  }else if (pointPemain < pointLawan){
    let denda = (pointLawan - pointPemain) * 20
    global.db.data.users[m.sender].money -= denda
    global.db.data.users[m.sender].tiketcoin += 1
    m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*Kamu* (🐱kucing,🐎kuda, 🐉 naga,🦚phonix,🦊kyubi,🦁centaur,🦅griffin,🐺serigala ${global.db.data.users[m.sender].kucing,kuda,naga,phonix,kyubi,centaur,griffin,serigala}) KALAH melawan *${conn.getName(lawan)}* (🐱kucing,🐎kuda, 🐉 naga,🦚phonix,🦊kyubi,🦁centaur,🦅griffin,🐺serigala ${global.db.data.users[lawan].kucing,kuda,naga,phonix,kyubi,centaur,griffin,serigala}) karena kamu ${alasanKalah[getRandom(0,alasanKalah.length-1)]}\n\nUang kamu berkurang $${denda.toLocaleString()}\n+1 Tiketcoin`)
  }else {
    m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\nHasil imbang kak, ga dapet apa apa 😂`)
  }

  delete conn.fight[m.sender]
}
handler.help = ['warpet']
handler.tags = ['game']
handler.command = /^(warpet)$/i
handler.limit = true
handler.group = true

module.exports = handler

function getRandom(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)) + min
}
