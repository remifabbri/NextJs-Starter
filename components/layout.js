import Head from 'next/head'
import styles from './layout.module.scss'
import utilStyles from '../styles/utils.module.scss'
import Link from 'next/link'
import fire from '../config/firebase-config';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth'

const name = 'Mr Translate'
export const siteTitle = 'TranslateTools'



export default function Layout({ children, home }) {
    const auth = useAuth();
    const user = auth.user; 

    // console.log('layout user', user);

    return (
        <>  
            <div className={`${styles.navLayout}`}>
                <div className={`${styles.navLeft}`}>
                    <img
                    src="/images/logo.svg"
                    className={`${styles.navLogo} ${utilStyles.borderCircle}`}
                    alt={name}
                    />
                    
                    <nav>
                        <ul className={`${styles.menuLayout}`}>
                            <li><a href="#Accueil">Accueil</a></li>
                            <li><a href="#Apropos">À propos</a></li>
                            <li><a href="#Contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>

                {!user 
                    ?
                    <div className={`${utilStyles.btnGroup}`} role="group" aria-label="Call to action">            
                        <Link href="/users/register">
                            <a type="button" className={`${utilStyles.ButtonAhref}`} href="#">SignUp</a>
                        </Link>  
                        {/* <span className={`${utilStyles.btnCircle} ${utilStyles.btnOr}`}>or</span> */}
                        <Link href="/users/login">
                            <a type="button" className={`${utilStyles.ButtonAhref}`} href="#">SignIn</a>
                        </Link>
                    </div>
                    :
                    <Link href="/users/profile">
                            <a type="button" className={`${utilStyles.ButtonAhref}`} href="#">{user.name}</a>
                    </Link>
                    // <button className={`${utilStyles.ButtonAhref}`} onClick={handleLogout}>Logout</button>
                    }
            </div>
            <div className={styles.container}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                    />
                    <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                    />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
                <header className={styles.header}>
                    {home ? (
                    <>
                        
                    </>
                    ) : (
                    <>
                        <Link href="/">
                        <a>
                            <img
                            src="/images/profile.jpg"
                            className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                            alt={name}
                            />
                        </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                        <Link href="/">
                            <a className={utilStyles.colorInherit}>{name}</a>
                        </Link>
                        </h2>
                    </>
                    )}
                </header>

                <main>{children}</main>

                {!home && (
                    <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                    </div>
                )}
            </div>
        </>
    )
}