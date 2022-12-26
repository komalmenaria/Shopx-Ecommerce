var AWS = require("aws-sdk");
// Create S3 service object
const s3 = new AWS.S3();


class upload {
    constructor() {
        // Set the Region
        AWS.config.update({
            region: "us-east-1",
            accessKeyId: "AKIA3YPQCS2VMWVWHKRJ",
            secretAccessKey: "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",
        });
    }

    uploadFile(file) {
        return new Promise((resolve, reject) => {
            let key = file.image.name;

             s3.putObject(
                {
                  Key: key,
                  Body: file.image.data,
                  Bucket: "shopx-ecommerce",
                  Expires: 3600,
                },
                (err, s3data) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(key)
                    
                  }
                }
              );
        })
    }
    getFileURL(key) {
       return  new Promise( (resolve, reject) => {
        const url = s3.getSignedUrl('getObject', {
          Bucket: "shopx-ecommerce",
          Key: key,
          Expires: 60 * 60 * 72
      })
      if(err) reject(err);
      resolve(url)
        })
    }
}

module.exports = new upload()