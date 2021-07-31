import { v4 as uuidv4 } from 'uuid';


const fs = require('fs');

const sharp = require('sharp');

export function get(req, res, next) {
  
  res.end('get image');

}
export function post(req, res, next) {
  var data = req.body;
  console.log(req);
  const id = uuidv4();
  sharp(data)
    .resize(300,200)
    .toFile(id, function(err){
      console.log(err);
    });
  console.log(id);
  res.end('');
} 
