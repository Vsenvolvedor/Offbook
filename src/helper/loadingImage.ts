import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";
import { BookData } from "../pages/Home";

export default async function loadingImage(data:BookData) {
  const imageUnit8ArrayData = await readBinaryFile(data.thumb,{dir: BaseDirectory.AppData});
  const imageBlob = new Blob([imageUnit8ArrayData.buffer]);
  const imageUrl = URL.createObjectURL(imageBlob);
  return {imageUrl,imageBlob};
};
