const http = require('http');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

let counter = 0;
let state = "";
const server = http.createServer(async (req, res) => {
  counter++;
  
  const url = new URL(req.url, `http://${req.headers.host}/`);
  let slept = 0;
  if (url.searchParams.has('sleep')) {
    slept = parseInt(url.searchParams.get('sleep'));
    await (ms => new Promise(resolve => setTimeout(resolve, ms)))(slept);
  }

  let retCode = 200;
  if (url.searchParams.has('code')) {
    retCode = parseInt(url.searchParams.get('code'));
  }

  res.statusCode = retCode;
  res.setHeader('Content-Type', 'text/plain');

  if (url.searchParams.has('noise')) {
    res.write(require("crypto").randomBytes(parseInt(url.searchParams.get('noise'))).toString('base64'));
    res.end();
    return;
  }

  res.write("Node.JS Sample App\n");
  res.write(`Remote Address:Port: ${req.socket.remoteAddress}:${req.socket.remotePort}\n`);
  res.write(`Local Address:Port: ${req.socket.localAddress}:${req.socket.localPort}\n`);
  
  res.write(`HTTP Version: ${req.httpVersion}\n`);
  res.write(`HTTP Method: ${req.method}\n`);
  res.write(`URL: ${req.url}\n`);
  res.write(`HTTP Headers (${req.rawHeaders.length / 2}):\n`);
  req.rawHeaders.forEach((value, index) => index % 2 && res.write(`${value}\n`) || res.write(`\t${value}: `));
  res.write(`HTTP Trailer Headers (${req.rawTrailers.length / 2}):\n`);
  req.rawTrailers.forEach((value, index) => index % 2 && res.write(`${value}\n`) || res.write(`\t${value}: `));

  res.write(`Request body:\n---\n`);
  req.on('data', chunk => {
    res.write(chunk);
  });
  req.on('end', () => {
    res.write(`\n---\nBytes Read: ${req.socket.bytesRead}\n\n`);

    var os = require("os");
    res.write(`Hostname: ${os.hostname()}\n`);
    res.write(`OS: ${os.platform()} / ${os.type()} / ${os.release()} / ${os.version()}\n`);
    res.write(`OS Uptime / LA: ${os.uptime()} / ${os.loadavg()}\n`);
    res.write(`Process PID: ${process.pid}\n`);
    res.write(`Process Work Dir: ${process.cwd()}\n`);
    res.write(`Process arguments (${process.argv.length}): ${process.argv.join(" ")}\n`);

    let envs = [];
    for (let name in process.env) {
      envs.push(`\t${name}: ${process.env[name]}`);
    }
    res.write(`ENV variables (${process.env.length / 2}):\n${envs.join("\n")}\n`);

    res.write(`\nRequest #${counter}\n`);
    res.write(`Return HTTP code: ${retCode}\n`);
    if (slept > 0) {
      res.write(`Slept (response delay): ${slept} ms\n`);
    }
    if (state !== "" && state !== null) {
      res.write(`Saved state: ${state}\n`);
    }

    if (url.searchParams.has('state')) {
      state = url.searchParams.get('state');
    }

    res.write(`\nUsage: \n- ?sleep=N - response deley in ms (like 2000 = 2 seconds)\n`);
    res.write(`- ?code=N - response HTTP code as a number (like 200 = OK)\n`);
    res.write(`- ?state=S - save some string value between requests\n`);
    res.write(`- ?noise=N - generate N bytes of random data and return it base64 encoded\n`);

    res.end();
  })  
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
