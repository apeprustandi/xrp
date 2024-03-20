const fetch = require('node-fetch');
const fs = require('fs');
const readlineSync = require("readline-sync");
const { HttpsProxyAgent } = require('https-proxy-agent');

const rotatorProxyUrls = [
  'http://duniakedol-rotate:ApRi191099@p.webshare.io:80/',
  'http://duniakedol2-rotate:ApRi191099@p.webshare.io:80/'
];

function acakUrlProxy(array) {
  const indeksAcak = Math.floor(Math.random() * array.length);
  return array[indeksAcak];
}

const hapusFile = async (filePath) => {
  if (fs.existsSync(filePath)) {
    // Menghapus file jika ada
    try {
        fs.unlinkSync(filePath);
        console.log(`File ${filePath} berhasil dihapus.`);
    } catch (err) {
        console.error(`Gagal menghapus file ${filePath}: ${err}`);
    }
  } else {
    console.log(`File ${filePath} tidak ditemukan.`);
  }
}

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

const bikinFile = async (noAkun, email, myCookie, wallet, tag, userAgent, namaFile) => {
  const suksesAccount = {
    akun:noAkun,
    email,
    myCookie,
    wallet,
    tag,
    userAgent,
  };
  
  const existingData = await fs.promises.readFile(namaFile, 'utf-8').catch(() => "[]");
  let parsedData;
  try {
    parsedData = JSON.parse(existingData);
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    parsedData = [];
  }
  parsedData.push(suksesAccount);
  const suksesJSON = JSON.stringify(parsedData, null, 2);
  await fs.promises.writeFile(namaFile, suksesJSON).catch(err => console.error('Error writing to file:', err));
}  


const countdownAndWithdraw = async () => {
  const printCountdown = remainingTime => {
    process.stdout.write(`${Math.floor(remainingTime / 60)} menit ${remainingTime % 60} detik\r`);
  };
  let remainingTime = 130; //dalam detik
  const intervalId = setInterval(async () => {
    remainingTime--;
    printCountdown(remainingTime);
    if (remainingTime === 0) {
      clearInterval(intervalId);
    }
  }, 1000); // Update setiap 1 detik
  await new Promise(resolve => setTimeout(resolve, remainingTime * 1000)); // menunggu sampai hitung mundur selesai
};


const register = (myCookie, userAgent, email, username, rotatorProxyUrl) => {
  return new Promise((resolve, reject) => {
    fetch('https://www.xrphash.com/api.php?act=register', {
      method: 'POST',
      headers: {
        'cookie': myCookie,
        'content-type': 'text/plain;charset=UTF-8',
        'user-agent': userAgent
      },
      body: JSON.stringify({
        act: "register", // Mengonfirmasi penarikan
        email: email,
        username: username,
        phone: 85788776599,
        password: "ApRi191099",
        password_repeat: "ApRi191099",
        dialCode:"62"
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

const getCookie = (userAgent) => {
  return new Promise((resolve, reject) => {
    fetch('https://www.xrphash.com/', {
      headers: {
        'authority': 'www.xrphash.com',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': userAgent
      }
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const setCookieHeader = res.headers.get('Set-Cookie');
      return res.text().then((data) => {
        resolve({ data, setCookieHeader });
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
};

const wihdraw = (myCookie, userAgent, wallet, tag, rotatorProxyUrl) => {
  return new Promise((resolve, reject) => {
    fetch('https://www.xrphash.com/api.php?act=withdraw', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'cookie': myCookie,
        'user-agent': userAgent,
        'x-requested-with': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        confirm: 0, // Mengonfirmasi penarikan
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

const login = (myCookie, userAgent, email) => {
  return new Promise((resolve, reject) => {
    fetch('https://www.xrphash.com/api.php?act=login', {
      method: 'POST',
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        'cookie': myCookie,
        'user-agent': userAgent
      },
      body: JSON.stringify({
        act: "login",
        email: email,
        password: "ApRi191099",
        otp: null
      })
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
    console.log("[1] Register");
    console.log("[2] Withdraw");

    const choice = readlineSync.questionInt('Masukkan pilihan Anda: ');
    console.log('')
    
    if (choice === 1) {
      type = 'reg';
      break;
    } else if (choice === 2) {
      type = 'wd';
      break;
    }
  }

  if(type == 'reg'){
    while(true){
      const totalAkun = await fs.promises.readFile(`akun.json`, 'utf8');
      const dataAkun = JSON.parse(totalAkun);
      const bacaWalet = await fs.promises.readFile(`wallete.json`, 'utf8');
      const walletJSON = JSON.parse(bacaWalet);
        try {
          if(dataAkun.length > 100){
            console.log('Rakus Mex...')
            console.log('Akun lebih dari 100')
            process.exit(0)
          }
          const rotatorProxyUrl = await acakUrlProxy(rotatorProxyUrls)
          const dataFake = await apiFaker();
          const userAgent = dataFake.browser.user_agent;
          const username = dataFake.username;
          const email = dataFake.email;
          const wallet = walletJSON[dataAkun.length].alamat
          const tag = walletJSON[dataAkun.length].tag
          const noAkun = dataAkun.length;        
          console.log(`No        : ${noAkun}`);
          console.log(`Email     : ${email}`);
          console.log(`Wallete   : ${wallet}`);
          console.log(`Tag       : ${tag}`);

          const getCok = await getCookie()
          const myCookie = getCok.setCookieHeader.split(' ')[0]
    
          const hasil = await register(myCookie, userAgent, email, username, rotatorProxyUrl)
          if(hasil.parameters[0].includes('/login.php')){

            console.log(`Daftar    : Berhasil`);
            await bikinFile(noAkun, email, myCookie, wallet, tag, userAgent, 'akun.json')
          }else if(hasil.parameters[0].includes('username')){
            console.log(`Daftar    : Sudah digunakan`);
          }else{
            //ulang
            console.log(`Daftar    : ${hasil.parameters[0]}`);
          }
          console.log(" ")
        } catch (error) {
          console.log(error)
        }
    }
  }

  if(type == 'wd'){
    const fileAkun = `akun.json`
    if (!fs.existsSync(fileAkun)) {
      console.log(`File ${fileAkun} tidak ditemukan.`);
      process.exit(0)
    }else{
      const totalAkun = await fs.promises.readFile(fileAkun, 'utf8');
      const dataAkun = JSON.parse(totalAkun);
      console.log(`Total     : ${dataAkun.length} Akun`);
    }
    console.log('')
    const mulai1 = readlineSync.questionInt('Mulai akun berapa: ');
    const stop2 = readlineSync.questionInt('Stop akun berapa: ');
    
    while(true){
      const totalAkun = await fs.promises.readFile(fileAkun, 'utf8');
      const dataAkun = JSON.parse(totalAkun);
      console.log(" ");
      const mulai = mulai1 -1
      const stop = stop2
      for (let i = mulai; i < stop && i < dataAkun.length; i++) {
        const user = dataAkun[i];
        try {
          const rotatorProxyUrl = await acakUrlProxy(rotatorProxyUrls)
          const userAgent = user.userAgent;
          const email = user.email;
          const wallet = user.wallet;
          const tag = user.tag;
          const getCok = await getCookie()
          const myCookie = getCok.setCookieHeader.split(' ')[0]
    
          console.log(`Email     : ${email}`);
          const testLogin = await login(myCookie, userAgent, email)
          if(testLogin.parameters[2].includes('success')){
            const hasilWd = await wihdraw(myCookie, userAgent, wallet, tag, rotatorProxyUrl)
            if(hasilWd.parameters[2].includes('successful')){
              console.log(`Withdraw  : 0.000025 USD`);
            }else if(hasilWd.parameters[2].includes('5 minutes')){
              console.log(`Withdraw  : Belum 5 Menit`);
            }else{
              console.log(`Withdraw  : ${hasilWd.parameters[2]}`);
            }
          }
        } catch (error) {
          console.log(`Error     : ${error}`);
        }
        console.log(" ")
      }
      await countdownAndWithdraw();
    }
  }
})();