import fs from 'fs';
import path from 'path';

function getAllPosts() {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/posts.json')),
  );
}

export function listPreviewPosts() {
  return getAllPosts().map(
    ({ id, title, publishedAt, formattedPublishedAt }) => ({
      id,
      title,
      publishedAt,
      formattedPublishedAt,
    }),
  );
}

export function findById(postId) {
  const post = getAllPosts().find(post => post.id === postId);
  return post;
}
