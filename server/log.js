const db = require('./models');
const Log = db.Log;

const createLog = (req, res, next) => {

    const id = req.id;
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const log = {
      userId: id,
      action: req.method, 
      description: `${req.method} dữ liệu: ${fullUrl}`,
    };
    if (['POST'].includes(req.method)) {
      log.description += `\nTạo mới bản ghi: ${JSON.stringify(req.body)}`;
    }
    if (['PUT'].includes(req.method)) {
      log.description += `\nBản ghi sau khi sửa: ${JSON.stringify(req.body)}`;
    }


      Log.create(log)
        .then(data => {
          console.log('Log ghi lại hành động thành công.');
        })
        .catch((err) => {
          console.error('Lỗi khi ghi log: ', err);
          
        });  
        next();

  }
 
module.exports=createLog
