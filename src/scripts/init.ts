import fs from 'fs';
import { uploadDir, logDir } from '@/config';

function checkFolders() {
  const mkdirIfNotExists = (path: string) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  };

  mkdirIfNotExists(uploadDir);
  mkdirIfNotExists(logDir);
}

export default () => {
  checkFolders();
};
