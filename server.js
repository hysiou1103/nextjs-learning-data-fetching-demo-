// JSON Server 設定
const jsonServer = require('json-server');
const server = jsonServer.create(); // 創建 JSON Server 伺服器
const router = jsonServer.router('db.json'); //將 db.json 作為 API 數據來源
const middlewares = jsonServer.defaults();

server.use(middlewares); // 使用 JSON Server 預設的 middleware
server.use((req, res, next) => {
  console.log('Request received'); // 當有請求進來時，會在終端機印出 Request received
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use(router);
server.listen(3100, () => {
  // 運行在 localhost:3100
  console.log('JSON Server is running');
});
