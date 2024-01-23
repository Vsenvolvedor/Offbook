import { BaseDirectory, copyFile, createDir, writeBinaryFile } from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";
import removeSpaces from "./removeSpaces";

const basePathArquives = 'data\\arquives';

export async function createArquives(name:string,rawPath:string,extension:string='pdf'): Promise<string> {
  const appDataDirPath = await appDataDir();
  const arquivePath = `${basePathArquives}\\${name}`
  const arquiveFile = `${appDataDirPath}${arquivePath}\\${removeSpaces(name)}.${extension}`
  await createDir(arquivePath, {dir:BaseDirectory.AppData, recursive: true});
  await copyFile(rawPath,arquiveFile);

  return arquiveFile;
};

export async function createArquiveByBinary(name:string,file:FileReader,extension:string='jpg'):Promise<string> {
  const arquiveFile = `${basePathArquives}\\${name}\\${removeSpaces(name)}.${extension}`
  if(!file.result || typeof file.result === 'string') return '';
  await writeBinaryFile({path:arquiveFile, contents:new Uint8Array(file.result)}, {dir: BaseDirectory.AppData});

  return arquiveFile;
};