import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import {json} from 'body-parser';
import multer from 'multer';

import { v4 as uuidv4 } from 'uuid';


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const fs = require('fs');

var upload = multer({dest:'store/img'});



/*
var multer = require('multer'); 

//multer 의 diskStorage를 정의
var storage = multer.diskStorage({
  //경로 설정
  destination : function(req, file, cb){    

    cb(null, 'publics/images/');
  },

  //실제 저장되는 파일명 설정
  filename : function(req, file, cb){
  //파일명 설정을 돕기 위해 요청정보(req)와 파일(file)에 대한 정보를 전달함
    var testSn = req.body.TEST_SN;
    var qSn = req.body.Q_SN;

    //Multer는 어떠한 파일 확장자도 추가하지 않습니다. 
    //사용자 함수는 파일 확장자를 온전히 포함한 파일명을 반환해야 합니다.        
    var mimeType;

    switch (file.mimetype) {
      case "image/jpeg":
        mimeType = "jpg";
      break;
      case "image/png":
        mimeType = "png";
      break;
      case "image/gif":
        mimeType = "gif";
      break;
      case "image/bmp":
        mimeType = "bmp";
      break;
      default:
        mimeType = "jpg";
      break;
    }

    cb(null, testSn + "_" + qSn + "." + mimeType);
  }
});

var upload = multer({storage: storage});
*/
var typeis = require('type-is');

var client_id = '3drD3UpiyFjeG6w9uCgd';
var client_secret = 'NsUtV7X43b';
var state = uuidv4();
var redirectURI = encodeURI("http://lion124.iptime.org:3000/callback");
var api_url = "";


polka() // You can also use Express
  .use(
    json(),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
  )
  .use('img', sirv('store/img'))
  .post('/upload', upload.any() ,function(req,res,next){
    res.end(req.files[0].filename);
  })
  .get('/load/:name' ,function(req,res,next){
    var filename = req.params.name;
    //__dirname
    console.log('store/img/'+filename);
    fs.exists('store/img/'+filename, function (exists) {
        if (exists) {
            fs.readFile('store/img/'+filename, function (err,data){
                res.end(data);
            });
        } else {
            res.statusCode = 404;
            res.end('file is not exists');
        }
    })
  })
  .get('/naverlogin', function (req, res) {
    var api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + 'state';
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
  })
  .get('/callback', function (req, res) {
    var api_code = req.query.code;
    state = req.query.state;
    var api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='+ client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + api_code + '&state=' + state;
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    var request = require('request');
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  })
  .listen(PORT, err => {
    if (err) console.log('error', err);
  })
  .use(
    sapper.middleware()
  );
