import { S3 } from 'aws-sdk'; // AWS SDK for JavaScript
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from "../trpc";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const fileRouter = createTRPCRouter({
  upload: adminProcedure
    .input(z.object({
      fileContent: z.string(), // base64 encoded file content
      fileName: z.string(),
    }))
    .mutation(async ({ input }) => {
      if (!input.fileContent) throw new Error('No file content provided');
      if (!input.fileName) throw new Error('No file name provided');

      // Decode the base64 file content
      const fileBuffer = Buffer.from(input.fileContent, 'base64');

      const bucketName = process.env.AWS_S3_BUCKET_NAME!;
      const fileName = input.fileName; // Using the provided file name

      const params = {
        Bucket: bucketName,
        Key: fileName, // the name of the file in the bucket (s3 object key name)
        Body: fileBuffer, // file content as a Buffer
      };

      try {
        await s3.putObject(params).promise();

        // Construct the file URL after successful upload
        const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        return {
          status: 'success',
          image_url: imageUrl,
        };
      } catch (error: any) {
        console.error(error);
        return {
          status: 'error',
          image_url: undefined,
          message: error.message,
        };
      }
    }),
});