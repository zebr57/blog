import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require('fs')
const https = require('https')
const path = require('path')

const keyPath = path.resolve('../','cert.key')
const certPath = path.resolve('../','cert.crt')
console.log(keyPath);
console.log(certPath);
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
}
const server = https.createServer(options, (req, res) => {
  res.end('https server')
})

server.listen(3050, () => {
  console.log('https server start!');
})