const fetch = require('node-fetch');
const cheerio = require('cheerio');
const readline = require('readline-sync');


const get_download = (link) => new Promise((resolve,reject) => {
  fetch(link, {method: 'GET'})
  .then(async res => {
    const $ = cheerio.load(await res.text());
    
    let result = '';
    $('div.soraurl').each((i,e) => {
      const resolusi =$(e).find('strong').text();
      result += `[#] ${resolusi}\n`;
      $(e).find('a[target="_blank"]').each((i2, e2) => {
        const link = $(e2).attr('href');
        result += `${i2 +1}. ${link}\n`;
      });
    });

    const judul = $('title').text().split('-');
    judul.splice(-1,1);
    const judul_fix = judul.join('').trim();
    if(judul_fix !== ''){
      console.log(`judul => ${judul_fix}`);
    }

    resolve(result);
  })
  .catch(err => resolve(''));
});



(async () => {
  while(1){
    const link = readline.question('[#] masukkan link animenonton.tv : ');
    const result = await get_download(link);

    if(result === ''){
      console.log('[-] gak nemu linknya sob');
      continue;
    }

    console.log(result);
  }
  

})();