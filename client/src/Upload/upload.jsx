import AWS from 'aws-sdk';

const UploadImage = (file, callback) => {
  const REGION = `ap-northeast-2`;
  const COGNITO = `ap-northeast-2:fda440b7-107d-459e-a616-76f8de5ef57c`;
  const BUCKET_NAME = `fourmenair-image-pool`;

  AWS.config.update({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: COGNITO,
    }),
  });

  const fileCheck = (file) => {
    console.log(file);
    const fileSize = file.size;
    const maxSize  = 1 * 1024 * 1024;
    if (fileSize > maxSize){
      console.log("최대 첨부파일 사이즈는 1MB입니다.");
      return false;
    }
    return true;
  }

  const createUUID = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  if (!file) return new Error('file does not exist');
  if (!fileCheck(file)) return new Error('file exceeds size limit');

  const TYPE = file.type.split("/")[1];
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: BUCKET_NAME,
      Key: createUUID() + '.' + TYPE,
      Body: file,
    },
  });

  upload.promise()
  .then(data => {
    console.log('파일 URL', data.Location);
    console.log('파일 이름', data.Key)
    console.log('success')
    callback({ message: 'success', url: data.Location, file: data.Key });
  }).catch(err => {
    console.log('err');
    callback(new Error(`can't connect to s3 bucket`));
  });
};

export default UploadImage;