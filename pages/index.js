import { useState, useEffect } from 'react';
import fire from '../config/firebase-config';
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import Link from 'next/link'
// import { getSortedPostsData } from '../lib/posts'

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

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
        <section>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et mollis erat. Morbi vel mi vel tellus ullamcorper rhoncus sed vel augue. Duis leo lectus, tempus luctus hendrerit non, condimentum in odio. Nullam dignissim eu est eget bibendum. Nulla facilisi. Nam euismod felis sit amet ex mollis pretium. Quisque vitae elit lacus. Cras placerat eleifend vehicula. Curabitur faucibus quam lacus, ut fermentum elit tincidunt nec. Donec tincidunt sodales leo, vitae molestie nisl suscipit sed. Nunc in ex nec lacus feugiat egestas. Ut lectus mi, malesuada vel tellus vitae, iaculis sollicitudin nisl. Morbi consequat, arcu eget sagittis mollis, tortor ligula pellentesque lorem, nec mollis mauris urna et lorem. Aliquam erat volutpat. In interdum erat ut nunc posuere, quis molestie libero pharetra.

In a fringilla nisi, quis sodales mauris. Donec ut quam eget est hendrerit convallis sed sit amet eros. Donec nibh massa, tristique at nisi sit amet, viverra luctus risus. Vestibulum rutrum ipsum ligula, nec eleifend justo consectetur nec. Cras malesuada auctor lectus, in varius mi volutpat sed. Sed vulputate aliquet enim, in tempus sapien convallis nec. Donec iaculis libero ac ligula facilisis ullamcorper. Pellentesque sollicitudin vitae sem nec pretium.

Nam tincidunt tristique elit vitae dictum. Aliquam pharetra imperdiet tincidunt. Vestibulum laoreet finibus ligula, quis lobortis lorem dignissim ac. Nulla a pulvinar leo, vel finibus tortor. Sed egestas tincidunt rutrum. Aliquam vel est blandit, rutrum felis et, scelerisque magna. Ut sapien dolor, blandit nec condimentum eget, congue ut tortor. Proin auctor viverra est ac placerat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean aliquet mi sed diam euismod dignissim quis sit amet mauris. Nam pharetra finibus mauris, aliquet volutpat lectus iaculis eu. Duis ultricies ligula eu lacus porttitor molestie. Aenean lacinia nisi id risus rutrum, non condimentum mauris auctor. Maecenas vulputate justo in felis auctor pretium.

Vestibulum cursus viverra sapien in bibendum. Etiam feugiat porta magna nec facilisis. Proin vel nibh at urna condimentum ultricies. Duis justo dolor, consectetur in ullamcorper ut, porta nec tellus. Pellentesque ac volutpat lectus, sit amet imperdiet nisi. Etiam dignissim facilisis turpis. Integer in quam viverra, auctor lacus nec, rutrum nisi. Etiam a dapibus nisl. Quisque feugiat tellus eget lacinia elementum. In sit amet mauris diam. Nulla sit amet justo justo.

Vivamus efficitur, massa nec consectetur fermentum, nisl mauris tempor orci, ut dictum erat erat ac tellus. Curabitur nec egestas mauris. Duis vel pellentesque nisi, vel blandit tellus. Donec ullamcorper magna id consectetur maximus. Phasellus egestas mi in ante vestibulum, vel sodales lectus consequat. Maecenas eu sapien gravida, placerat nunc et, facilisis nibh. Aliquam eu risus id magna vulputate aliquet. Proin ullamcorper blandit urna, et tincidunt eros. Aliquam malesuada felis at ex cursus convallis. Vivamus ut volutpat lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        </section>
    </Layout>
  )
}