import fs from 'fs';
import matter from 'gray-matter';

export default function getPostMetadata(basePath) {
    const folder = basePath + '/'
    const files = fs.readdirSync(folder)
    const markdownPosts = files.filter(file => file.endsWith('.md'))

    // Get the file data
    const posts = markdownPosts.map((fileName) => {
        const fileContents = fs.readFileSync(`${basePath}/${fileName}`, 'utf8')
        const matterResult = matter(fileContents)
        return {
            title: matterResult.data.title,
            description: matterResult.data.description,
            date: matterResult.data.date,
            tags: typeof matterResult.data.tags === 'string'
                ? matterResult.data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                : Array.isArray(matterResult.data.tags)
                    ? matterResult.data.tags
                    : [],
            slug: fileName.replace('.md', '')
        }
    })

    return posts
}