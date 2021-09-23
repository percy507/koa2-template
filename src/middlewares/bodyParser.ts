import type { File } from 'formidable';
import koaBody from 'koa-body';
import path from 'path';
import fs from 'fs';
import { uploadDir } from '@/config';

export default (): KoaMiddleware => {
  return koaBody({
    formLimit: '56kb',
    jsonLimit: '1mb',
    textLimit: '1mb',
    multipart: true,
    formidable: {
      onFileBegin(_, file: File) {
        const filePath = path.join(uploadDir, file.name as string);
        const reader = fs.createReadStream(filePath);
        const upStream = fs.createWriteStream(filePath);

        reader.on('open', function () {
          reader.pipe(upStream);
        });

        reader.on('error', function (err) {
          throw err;
        });

        file.path = filePath;
      },
    },
  });
};
