const fetch = require('node-fetch');
const fs = require('fs');
const readlineSync = require("readline-sync");
const { HttpsProxyAgent } = require('https-proxy-agent');

// const rotatorProxyUrl = 'http://duniakedol-rotate:ApRi191099@p.webshare.io:80/';//kartun
const rotatorProxyUrl = 'http://aucmstty-rotate:tb8v847c7zib@p.webshare.io:80/'; //apepdewa

const countdownAndWithdraw = async () => {
  const printCountdown = remainingTime => {
    process.stdout.write(`${Math.floor(remainingTime / 60)} menit ${remainingTime % 60} detik\r`);
  };
  let remainingTime = 5; //dalam detik
  const intervalId = setInterval(async () => {
    remainingTime--;
    printCountdown(remainingTime);
    if (remainingTime === 0) {
      clearInterval(intervalId);
    }
  }, 1000); // Update setiap 1 detik
  await new Promise(resolve => setTimeout(resolve, remainingTime * 1000)); // menunggu sampai hitung mundur selesai
};

const fakeIpIndonesia = () => {
  const firstOctet = Math.floor(Math.random() * 256);
  const secondOctet = Math.floor(Math.random() * 256);
  const thirdOctet = Math.floor(Math.random() * 256);
  const fourthOctet = Math.floor(Math.random() * 256);
  return `${firstOctet}.${secondOctet}.${thirdOctet}.${fourthOctet}`;
};

const apiFaker = async () => {
  const akunIp = await fakeIpIndonesia();
  return new Promise((resolve, reject) => {
    fetch("https://api.suhu.my.id/v2/faker", {
      headers: {
        "X-Forwarded-For": akunIp,
        "X-Real-IP": akunIp,
        "X_REAL_IP": akunIp,
        "HTTP_X_FORWARDED_FOR": akunIp
      }
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

const register = (userAgent, namaLengkap, username, email) => {
  return new Promise((resolve, reject) => {
    fetch('https://xrpearning.com/api.php?act=register', {
      method: 'POST',
      headers: {
        'authority': 'xrpearning.com',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'cookie': 'loclang=en',
        'origin': 'https://xrpearning.com',
        'referer': 'https://xrpearning.com/register.php',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': userAgent,
        'x-requested-with': 'XMLHttpRequest'
      },
      body: new URLSearchParams({
        'fullname': namaLengkap,
        'username': username,
        'email': email,
        'password': 'ApRi191099'
      }),
      agent: new HttpsProxyAgent(rotatorProxyUrl)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

const login = (userAgent, email) => {
  return new Promise((resolve, reject) => {
    fetch('https://xrpearning.com/api.php?act=login', {
      method: 'POST',
      headers: {
        'authority': 'xrpearning.com',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'cookie': 'loclang=en',
        'origin': 'https://xrpearning.com',
        'referer': 'https://xrpearning.com/login.php',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': userAgent,
        'x-requested-with': 'XMLHttpRequest'
      },
      body: new URLSearchParams({
        'email': email,
        'password': 'ApRi191099'
      }),
      agent: new HttpsProxyAgent(rotatorProxyUrl)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const setCookieHeader = res.headers.get('Set-Cookie');
      return res.json().then((data) => {
        resolve({ data, setCookieHeader });
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
};


const withdraw = (myCookie, userAgent, wallet, tag) => {
  return new Promise((resolve, reject) => {
    fetch("https://xrpearning.com/api.php?act=withdraw", {
      method: 'POST',
      headers: {
        'authority': 'xrpearning.com',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'cookie': `loclang=en; login=1; user=${myCookie}; godomain=xrpearning.com; _gid=GA1.2.388133387.1710398895; area=; _ga_YYYLT9KHHC=GS1.1.1710401108.2.0.1710401108.0.0.0; _ga=GA1.1.1298969868.1710398895`,
        'origin': 'https://xrpearning.com',
        'referer': 'https://xrpearning.com/cashout.php',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': userAgent,
        'x-requested-with': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        confirm: 1, // Mengonfirmasi penarikan
        payout_value: 0.000025,
        password: 'ApRi191099',
        xrpAddr: wallet,
        distTag: tag
      }),
      agent: new HttpsProxyAgent(rotatorProxyUrl)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
  });
};




(async () => {
  console.clear()
  let type;
  while (true) {
    console.log("Pilih Menu");
    console.log("1. Withdraw");
    console.log("2. Register");

    const choice = readlineSync.questionInt('Masukkan pilihan Anda: ');
    
    if (choice === 1) {
      type = 'wd';
      break;
    } else if (choice === 2) {
      type = 'reg';
      break;
    }
  }

  
  if (type === 'wd') {
    const selectFile = readlineSync.question('File Akun: ');
    console.log(" ")
  
    const fileAkun = `${selectFile}.json`
    if (!fs.existsSync(fileAkun)) {
      console.log(`File ${fileAkun} tidak ditemukan.`);
      console.clear()
    }
    try {
      let countdownCompleted = false;
      while (!countdownCompleted) {
        const totalAkun = await fs.promises.readFile(`${selectFile}.json`, 'utf8');
        const dataAkun = JSON.parse(totalAkun);
        console.log(`Total     : ${dataAkun.length} Akun`);
        console.log(" ");
  
        for (const user of dataAkun) {            
          try {
              const userAgent = user.userAgent;
              const email = user.email;
              const wallet = user.wallet;
              const tag = user.tag;
              const noAkun = user.akun;
              
              if (userAgent !== undefined) {
                  const myCookie = user.myCookie
                  console.log(`Akun      : ${noAkun}`);
                  console.log(`Email     : ${email}`);
                  
                  const withrawAkun = await withdraw(myCookie, userAgent, wallet, tag);
                  if (!withrawAkun) continue;
                  if(withrawAkun.code === 2){
                    if(withrawAkun.message === 'Incorrect destination tag'){
                      console.log(`Withdraw  : Tag/IP Error`);
                    }else{
                      console.log(`Withdraw  : 0.000037 XRP`);
                    }
                  }
                  if (withrawAkun.code === 1){
                    if(withrawAkun.message === 'Incorrect destination tag'){
                      console.log(`Withdraw  : Tag/IP Error`);
                    }else{
                      console.log(`Withdraw  : Belum 5 Menit`);
                    }
                  }
                  console.log("");
              } else {
                console.log(`Gagal Login ${email}`);
              }
            } catch (error) {
              console.log(`Nent..`);
          }
        }        
        await countdownAndWithdraw();
        countdownCompleted = false; // Setel ke true jika Anda ingin keluar dari loop
      }
    } catch (error) {}
  }
  

  if (type === 'reg') {
    while(true){
      const dataFake = await apiFaker();
      const userAgent = dataFake.browser.user_agent;
      const namaLengkap = dataFake.nama;
      const username = dataFake.username;
      const email = dataFake.email;
      
      const totalAkun = await fs.promises.readFile('NewAkun.json', 'utf8');
      const panjang = JSON.parse(totalAkun).length;
      console.log(`Total     : ${panjang} Akun`)
      console.log(`Username  : ${username}`)
      console.log(`Email     : ${email}`)
      
      const daftarAkun = await register(userAgent, namaLengkap, username, email);
      if (daftarAkun.message === 'ok') {
        console.log(`Register  : Sukses`)
        const suksesAccount = {
          username,
          email,
          userAgent,
          tag: "tagKos",
          wallet: "rw2ciyaNshpHe7bCHo4bRWq6pqqynnWKQg"
        };
        const existingData = await fs.promises.readFile(`NewAkun.json`, 'utf-8').catch(() => "[]");
        let parsedData;
        try {
          parsedData = JSON.parse(existingData);
        } catch (error) {
          console.error('Error parsing JSON data:', error);
          parsedData = [];
        }
        parsedData.push(suksesAccount);
        const suksesJSON = JSON.stringify(parsedData, null, 2);
        await fs.promises.writeFile(`NewAkun.json`, suksesJSON).catch(err => console.error('Error writing to file:', err));
      } else {
        console.log(`Register  : Gagal`)
      }
      console.log(" ")
    }
  }
})();

