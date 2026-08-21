const http=require('http'),fs=require('fs'),path=require('path'),url=require('url');
const T={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.json':'application/json'};
http.createServer((req,res)=>{
 let p=decodeURIComponent(url.parse(req.url).pathname);
 if(p==='/')p='/index.html';
 const f=path.join(__dirname,path.normalize(p).replace(/^([.]{2}[\/\\])+/,''));
 fs.readFile(f,(e,d)=>{
  if(e){res.writeHead(404);return res.end('Not found')}
  const ext=path.extname(f).toLowerCase();
  res.writeHead(200,{'Content-Type':T[ext]||'application/octet-stream','Cache-Control':ext==='.html'?'no-cache':'public, max-age=31536000'});
  res.end(d);
 });
}).listen(process.env.PORT||3000,()=>console.log('up'));
