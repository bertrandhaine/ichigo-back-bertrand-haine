import fs from 'fs';
import path from 'path';

/**
 * Ensure the directory exists before trying to write/read from it.
 * @param file File path
 */
export function ensurePath(file: string): void {
  const dir = path.dirname(file);

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (e) {
    console.log(e);
  }
}
