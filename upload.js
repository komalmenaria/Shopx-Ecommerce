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
      let key = file.imageKey.name;
      // console.log(file.imageKey)

      s3.putObject(
        {
          Key: key,
          Body: file.imageKey.data,
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
    return new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', {
        Bucket: "shopx-ecommerce",
        Key: key,
        Expires: 60 * 60 * 72
      }, function (err, url) {
        if (err) {
          reject(err)
        } else {
          // console.log(url)
          resolve(url)
        
        }
      })
      
    })
  }
}

module.exports = new upload()