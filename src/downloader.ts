import { createDirectory, sanitizeFilename } from 'utils';
import youtubedl, { Flags } from 'youtube-dl-exec';

export async function download360pVideo(url: string, basePath: string): Promise<void> {
    try {
        // get title
        const title = await youtubedl(url, {
            getTitle: true
        }) as string;
        const outputFileName = sanitizeFilename(title);
        console.log('FileName: ', outputFileName);

        // Get available formats
        const formats = await youtubedl(url, {
            listFormats: true
        }) as string;

        // Parse the formats to find the format code for 360p with sound
        const formatLines = formats.split('\n');
        let formatCode = null;
        for (const line of formatLines) {
            if (line.includes('360p') && line.includes('audio only') === false) {
                const parts = line.trim().split(/\s+/);
                formatCode = parts[0];
                break;
            }
        }

        if (!formatCode) {
            throw new Error('360p format with sound not found');
        }

        // create directory for output if needed
        await createDirectory(`${basePath}/output`);

        // Download the video in 360p format with sound and save as MP4
        await youtubedl(url, {
            format: `${formatCode}+bestaudio`,
            output: `${basePath}/output/${outputFileName}.mp4`,
            'merge-output-format': 'mp4'
        } as Flags);

        console.log('Download completed!');
    } catch (err) {
        console.error('Error:', err);
    }
}