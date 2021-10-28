import AWS from 'aws-sdk';

const UploadImage = async (file) => {
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
    const fileSize = file.size;
    const maxSize  = 3 * 1024 * 1024;
    if (fileSize > maxSize){
      // console.log("최대 첨부파일 사이즈는 3MB입니다.");
      return false;
    }
    return true;
  }

  function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, (el) => el.toString(36)).join('');
  }

  if (!file) return new Error('file does not exist');
  if (!fileCheck(file)) return new Error('file exceeds size limit');

  const TYPE = file.type.split("/")[1];
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: BUCKET_NAME,
      Key: generateId(32) + '.' + TYPE,
      Body: file,
    },
  });

  let result;
  try {
    result = upload.promise();
  } catch (err) {
    result = err;
  } finally {
    return result;
  }
};

export default UploadImage;