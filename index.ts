import { Response,Request } from "express";
const express = require('express');
const router = require('./router/router');
const dotenv = require('dotenv'); 
const cors = require('cors');
const app = express();
dotenv.config()

const port = process.env.PORT;


app.use(express.json());
app.use(cors());
app.use(router);
app.get('/', (req:Request, res:Response) => {
    res.send('New server created');
  });

app.listen(port, () =>{
    console.log('Server is running on http://localhost:'+port);
});



