import { useState, useEffect } from 'react';
import fire from '../config/firebase-config';
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import Link from 'next/link'
import Date from '../components/date'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) {

  const [textOriginal, setTextOriginal] = useState([]);

  useEffect(() => {
    fire.firestore()
      .collection('OriginalText')
      .onSnapshot(snap => {
        const originalText = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(originalText)
        setTextOriginal(originalText);
      });
  }, []);

  console.log(textOriginal)
  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
        <section className={utilStyles.headingMd}>
          <p>[Your Self Introduction]</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>

        <section className={utilStyles.headingMd}>
          <p>Ajouter un text à la base de donnée</p>
          <p>
            <Link href={'/texts/addText'}>
              <a>Commencé</a>
            </Link>
          </p>
        </section>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Textes Originaux</h2>
          <ul className={utilStyles.list}>
            {textOriginal.map(TO =>
              <li key={TO.id}>
                <Link href="/texts/[text]" as={'/texts/' + TO.id}>
                  <a>{TO.title}</a>
                </Link>
              </li>
            )}
          </ul>
        </section>
    </Layout>
  )
}