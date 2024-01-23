import { BaseDirectory, exists, readTextFile } from "@tauri-apps/api/fs";

export const bookDataPath = 'data\\json\\books.json';

async function readingBookData() {
  const response = await exists(bookDataPath, {
    dir: BaseDirectory.AppData
  })
  if(!response) return null;
  const contents = await readTextFile(bookDataPath, {
    dir: BaseDirectory.AppData
  });
  return contents;
}

export default readingBookData;