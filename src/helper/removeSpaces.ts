export default function removeSpaces(rawText:string) {
  const text = rawText.replace(' ', '-');
  return text;
}