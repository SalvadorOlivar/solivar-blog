import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import estimateReadingTime from './estimateReadingTime';

export default function getPostMetadata(basePath) {
    const folder = path.join(process.cwd(), basePath);
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter(file => file.endsWith('.md'));

    // Get the file data
    const posts = markdownPosts.map((fileName) => {
        const filePath = path.join(folder, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContents);
        const rawDate = matterResult.data.date;
        const normalizedDate = rawDate instanceof Date
            ? rawDate.toISOString().slice(0, 10)
            : String(rawDate ?? '');
        return {
            title: matterResult.data.title,
            description: matterResult.data.description,
            date: normalizedDate,
            readingTimeMinutes: estimateReadingTime(matterResult.content),
            tags: typeof matterResult.data.tags === 'string'
                ? matterResult.data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                : Array.isArray(matterResult.data.tags)
                    ? matterResult.data.tags.map(tag => String(tag).trim()).filter(Boolean)
                    : [],
            slug: fileName.replace('.md', '')
        };
    });

    const toTimestamp = (value) => {
        const timestamp = Date.parse(String(value ?? ''));
        return Number.isNaN(timestamp) ? 0 : timestamp;
    };

    return posts.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
}
