import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { findById, listPreviewPosts } from '../../lib/posts';
import styles from '../../styles/Home.module.css';

export async function getStaticProps({ params }) {
  return {
    props: {
      post: await findById(params.id),
    },
  };
}

export async function getStaticPaths() {
  const posts = await listPreviewPosts();
  return {
    paths: posts.map(post => ({
      params: {
        id: post.id,
      },
    })),
    fallback: false,
  };
}

export default function Post({ post }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title}</title>
      </Head>
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
        <Link href="/" className={styles.title}>
          John Doe
        </Link>
      </header>
      <main>
        <article>
          <h1 className={styles.title}>{post.title}</h1>
          <p style={{ color: 'gray' }}>{post.formattedPublishedAt}</p>
          <p>{post.content}</p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/">← Back to home</Link>
          </div>
        </article>
      </main>
    </div>
  );
}
