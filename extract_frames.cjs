const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        for (const [key, b64] of Object.entries(data)) {
          const base64Data = b64.replace(/^data:image\/jpeg;base64,/, '');
          fs.writeFileSync(`public/collections/frame_${key.replace('.', '_')}.jpg`, base64Data, 'base64');
          console.log(`Saved frame_${key}.jpg`);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
        console.log('ALL FRAMES SAVED SUCCESSFULLY!');
        setTimeout(() => process.exit(0), 500);
      } catch (e) {
        console.error('Error saving frames:', e);
        res.writeHead(500);
        res.end(e.message);
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(4829, () => {
  console.log('Server listening on port 4829');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    'http://127.0.0.1:5173/test_frames.html'
  ]);

  chrome.on('close', (code) => {
    console.log('Chrome exited with code', code);
  });
});

