const http = require('http');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
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
    res.write(`ENV variables (${process.env / 2}):\n${envs.join("\n")}\n`);

    res.end();
  })  
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
