const aws = require("aws-sdk"); 

aws.config.update({
    accessKeyId: "AKIAY3L35MCRRMC6253G", 
    secretAccessKey: "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",
    region: "ap-south-1"
});


let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new aws.S3({ apiVersion: "2006-03-01" });
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "pk_newFolder/folderInsideFolder/oneMore/foo/" + file.originalname, 
            Body: file.buffer,
        };
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err });
            }
            return resolve(data.Location);
        });
    });
};


const myAws = async (req, res) => {
    try {
        let files = req.files;
        if (files && files.length > 0) {
            let uploadedFileURL = await uploadFile(files[0]);
            res.status(201).send({ status: true, data: uploadedFileURL });
        }
        else {
            res.status(400).send({ status: false, msg: "No file to write" });
        }
    }
    catch (err) {
        console.log("error is: ", err);
        res.status(500).send({ status: false, msg: "Error in uploading file to s3" });
    }
};


module.exports = { uploadFile, myAws };