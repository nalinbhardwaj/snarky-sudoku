import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Footer } from './util'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Snarky Sudoku</title>
        <meta name="description" content="Zero-knowledge Sudoku using zk-SNARKs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Snarky Sudoku
        </h1>

        <p className={styles.description}>
          Zero-knowledge Sudoku using
          <code className={styles.code}>zk-SNARKs</code>
        </p>

        <div className={styles.grid}>
          <Link href="/solve">
            <a className={styles.card}>
              <h2>Solve &rarr;</h2>
              <p>Solve a random sudoku and generate a proof for your solution.</p>
            </a>
          </Link>

          <Link href="/verify">
            <a className={styles.card}>
              <h2>Verify &rarr;</h2>
              <p>Verify a pre-image solves the claimed sudoku.</p>
            </a>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
