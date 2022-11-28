import Image from 'next/image';
import Link from 'next/link';
import { listPreviewPosts } from '../lib/posts';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
  return {
    props: {
      posts: await listPreviewPosts(),
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.splash}>
          <Image
            src="/images/profile.png"
            width={128}
            height={128}
            alt="John Doe Avatar"
            className={styles.avatar}
          />
        </div>
        <h1 className={styles.title}>John Doe</h1>
      </header>
      <main>
        <section className={styles.paragraphs}>
          <p>
            Hello, I'm John. I'm a software engineer. This is a blog built with
            Next.js. You can contact me on{' '}
            <a
              href="http://twitter.com/johndoe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            .
          </p>
        </section>
        <section className={styles.paragraphs}>
          <h2>Blog</h2>
          <ul className={styles.list}>
            {posts.map(post => (
              <li key={post.id} className={styles.listItem}>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
                <br />
                <small>
                  <time dateTime={post.publishedAt}>
                    {post.formattedPublishedAt}
                  </time>
                </small>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
