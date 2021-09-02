import { Request, Response, NextFunction } from 'express';

declare function require(params: string): any;

const express: any = require('express');
const app: any = express();
const helmet: any = require('helmet');
const compression: any = require('compression');
const bodyparser: any = require('body-parser');
const config :any = require('./config/Jwtkey');
const cors: any = require('cors');

const port = process.env.PORT || 8080 ;

app.use(cors());
// app.use = 요청들어올 떄 마다 실행
// app.use(session(secret)); // 세션값은 메모리에 저장 서버 재가동시 날아감 휘발성
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(compression());
app.use(helmet());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('jwt-secretKey', config.secret);
app.use(express.static(__dirname + '/public')); 
app.use('/user');

app.get('/', (request: Request, response : Response, next :NextFunction) => {
  response.status(200).json({id:'ani sisisisi'});
});

app.post('/', (request: Request, response : Response, next :NextFunction) => {
  const {id, pwd} = request.body;
  console.log(id,pwd);
  response.status(200).json({id:'12345'});
});

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error(error.stack);
  response.status(500).send('Something broke');
})

app.listen(port, () =>{
  console.log(`Waiting... ${port}`);
})
