const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const compression = require('compression');
var expressStaticGzip = require('express-static-gzip');

const productRouter = require('./routes/product.js');
const ratingsRouter = require('./routes/ratings.js');
const qnaRouter = require('./routes/qna.js');
const cartRouter = require('./routes/cart.js');
const relProductsRouter = require('./routes/relProduct.js');
const interactionsRouter = require('./routes/interactions.js');
const { createProxyMiddleware } = require('http-proxy-middleware');


// app.use('/qna', qnaRouter);
app.use(createProxyMiddleware('/qna', { target: 'http://44.203.162.118:3001' }));
app.use(createProxyMiddleware('/pro', { target: 'http://ec2-3-93-24-196.compute-1.amazonaws.com:8080' }));
app.use(bodyParser.urlencoded({extended: false, type: 'application/x-www-form-urlencoded'}));
app.use(compression());
app.use(expressStaticGzip(__dirname + '/../client/dist', {
  enableBrotli: true
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/qna', qnaRouter);
// app.use('/product', productRouter);
app.use('/product', relProductsRouter);
app.use('/ratings', ratingsRouter);

app.use('/cart', cartRouter);
app.use('/interactions', interactionsRouter);

app.listen(port, () => console.log('Listening on:', port));