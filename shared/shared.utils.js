import AWS from 'aws-sdk';

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

export const s3test = async (file, userId) => {
    try {
        const s3 = await new AWS.S3();

        console.log(s3);
    } catch (error) {
        console.log(error);
    }
};

export const uploadPhoto = async (file, userId) => {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3()
        .upload({
            Bucket: 'instaclone-uploads',
            Key: objectName,
            ACL: 'public-read',
            Body: readStream,
        })
        .promise();
    return Location;
};
