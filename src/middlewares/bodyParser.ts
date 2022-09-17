import koaBody from 'koa-body';
import { nanoid } from 'nanoid';
import path from 'path';

import { uploadDir } from '@/config';

export default (): KoaMiddleware => {
  return koaBody({
    formLimit: '56kb',
    jsonLimit: '1mb',
    textLimit: '1mb',
    multipart: true,
    formidable: {
      onFileBegin(_, file: any) {
        file.name = nanoid(16) + path.extname(file.name);
        file.path = path.join(uploadDir, file.name);

        // this ==> internal formidable instance
        // https://github.com/felixge/node-formidable
        // this.on("file", (_: any, file: File) => {
        //   const reader = fs.createReadStream(filePath);
        //   const upStream = fs.createWriteStream(filePath);

        //   reader.on("open", function () {
        //     reader.pipe(upStream);
        //   });

        //   reader.on("error", function (err) {
        //     throw err;
        //   });
        // });
      },
    },
  });
};
