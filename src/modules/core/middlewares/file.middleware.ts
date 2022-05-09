import aws from 'aws-sdk';
import { Router } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new aws.S3({
  credentials: {
    accessKeyId: 'AKIAY6Q5NBEO25Y3LMGF',
    secretAccessKey: `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`,
  },
})

const storage = multerS3({
  s3,
  bucket: 'face-presence',
  acl: 'public-read',
  key(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileMiddleware = ({
  fields,
  name = null,
  tag = 'file',
  access = 'public',
}: {
  fields: any;
  name?: string;
  tag?: string;
  access?: string;
}) => {
  const router = Router({ mergeParams: true });
  const upload = multer({ storage });
  router.use(upload.fields(fields), async (req: any, res, next) => {
    await Promise.all(
      fields.map(async (element: { name: string; maxCount: number }) => {
        if (req.files[element.name] !== undefined) {
          const file = req.files[element.name][0];
          const fileData = {
            name: file.key,
            tag,
            access,
            location: file.location,
          };
          // const fileData = await FileRepository.create({
          //   name: name !== null ? name : file.originalname,
          //   tag,
          //   access,
          //   location: `/file/${file.filename}`,
          // });
          req.body[element.name] = fileData;
        }
      }),
    );
    next();
  });
  return router;
};

export { fileMiddleware };

