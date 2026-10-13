const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = [
  {
    name: 'shiva-reel-01.jpg',
    url: 'https://scontent-lax3-2.cdninstagram.com/v/t51.82787-15/809209415_17968838331165436_1883500747106295602_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=ShqAf8RsXqkQ7kNvwF-xlGf&_nc_oc=Adpe6Ur0_vFyBsdcezX4EK5y-lHdlTyHvGhuhDWtX6e_UfTxiP4EA-Ma7tmuUc9cNus&_nc_zt=23&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_gid=Wb4UTHF5QqnmyJ48hWep_w&_nc_ss=7b60f&oh=00_AQOrZdwINBRYOODUnxSwgK69eG2EHS5XQYy9fQMWpOoxcQ&oe=6AD3CC3E'
  },
  {
    name: 'shiva-reel-02.jpg',
    url: 'https://scontent-atl3-2.cdninstagram.com/v/t51.82787-15/802699373_18071602019723354_469241485225896482_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=SObkkNE18wYQ7kNvwFcVvwh&_nc_oc=AdrI4jkM5tDzWzHoSKCZQXAGXycfAJoGx-QUmQlhV1WbzgxxeZynItsX5W5Q7GRnZK8&_nc_zt=23&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_gid=cTNw3ELa6NFCbpIAQPV8dg&_nc_ss=7b60f&oh=00_AQOMFVFTd8JJL_JlnhhnLIY-mjrmJq1QjKzAopnb6Jsw0Q&oe=6AD3CB7E'
  },
  {
    name: 'shiva-reel-03.jpg',
    url: 'https://scontent-atl3-1.cdninstagram.com/v/t51.71878-15/801326278_1429867895672471_2269419505504674376_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=H48iOl5JM2IQ7kNvwGF2XLt&_nc_oc=AdophzxDiOtai7jwQSopmI1whF4FJ1Fwxao4rDZb_-NG40iKOaglaQBY5TrfJYsqDPo&_nc_zt=23&_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_gid=vAYDD7BR28cSpMvduLV2fA&_nc_ss=7b60f&oh=00_AQNlHsUnZaaoqUgPGoJFVRArVa_mk4ARaEpK4-Tq1RX-Wg&oe=6AD3DB63'
  },
  {
    name: 'shiva-reel-04.jpg',
    url: 'https://scontent-atl3-2.cdninstagram.com/v/t51.82787-15/806082902_18617299438023086_5202926833365770260_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=XFY-WgHDSnAQ7kNvwEPZAM6&_nc_oc=AdpcWw6LNK6MeeIFw9Jwb-M9aMzOeY9gVmIRrhOiCKQWPSsqBAClrZHXQGwEyRlQGgg&_nc_zt=23&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_gid=OQGBLsAjD-azdJaCgR5xWg&_nc_ss=7b60f&oh=00_AQM5VDfCv4cupVGwVgPQ9ukm1Y-QAeHgbcS2SilKr1X5_Q&oe=6AD3DF8E'
  }
];

const outDir = path.join(__dirname, 'public', 'images', 'reels');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(outDir, item.name);
    const file = fs.createWriteStream(dest);
    https.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      console.log(item.name, 'status:', res.statusCode);
      if (res.statusCode !== 200) {
        reject(new Error(`Failed with status ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Saved ${item.name}, size: ${fs.statSync(dest).size} bytes`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of urls) {
    try {
      await download(item);
    } catch (e) {
      console.error(item.name, 'error:', e.message);
    }
  }
}

run();
