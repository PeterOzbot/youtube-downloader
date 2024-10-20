import { readFile } from 'fs/promises';

export async function getUrlsFromFile(urlBasePath: string): Promise<string[]> {
    const filePath = `${urlBasePath}/assets/urls`;

    const fileContent = await readFile(filePath, 'utf-8');
    return fileContent.split('\n').filter(line => line.trim() !== '');
}