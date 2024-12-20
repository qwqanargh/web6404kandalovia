const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Подключаем данные
const middlewares = jsonServer.defaults({
    static: path.join(__dirname) // Подключаем папку с сайтом
});

// Устанавливаем CORS-заголовки
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`JSON Server with static files is running on http://localhost:${PORT}`);
});
