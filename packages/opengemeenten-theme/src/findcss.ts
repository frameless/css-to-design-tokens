import { glob, readFile } from 'node:fs/promises';

export const findCss = async (): Promise<string> => {
  const cssPaths = [];
  for await (const entry of glob('**/*.css')) {
    cssPaths.push(entry);
  }
  const allCssContent = await Promise.all(cssPaths.map((path) => readFile(path, 'utf-8')));

  return allCssContent.join('');
};
