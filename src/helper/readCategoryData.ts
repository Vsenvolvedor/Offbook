import { BaseDirectory, exists, readTextFile } from "@tauri-apps/api/fs";

export const categorieDataPath = 'data\\json\\categories.json';

async function readingCategoriesData() {
  const response = await exists(categorieDataPath, {
    dir: BaseDirectory.AppData
  })
  if(!response) return null;
  const contents = await readTextFile(categorieDataPath, {
    dir: BaseDirectory.AppData
  });
  return contents;
}

export default readingCategoriesData;