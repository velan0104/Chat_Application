import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

const getBase64 = (file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

const uploadFilesToCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
        console.log(file);
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                getBase64(file),
                {
                    resource_type: "auto",
                    public_id: uuid(),
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            )
        })
    })

    try {
        const results = await Promise.all(uploadPromises);
        console.log(results);
        const formattedResults = results.map((result) => ({
            public_id: result.public_id,
            url: result.secur_url,
        }));
        return formattedResults;
    } catch (error) {
        console.log(error);
        throw new Error("Error uploading files to cloudinary: ", error)
    }
};

export { uploadFilesToCloudinary, getBase64 }