import Head from 'next/head'
import styles from '../styles/Home.module.css'
import getUsers from '../server/db'

export async function getStaticProps() {
var users = getUsers();
  return {
    props: {users}, // will be passed to the page component as props
  }
}

export default function Home({users}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Products Verification</title>
        <meta name="description" content="Products Verification" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.h1}>
          Please Enter Your Email:
        </h1>
        <input className={styles.input}></input>
        <p>{users.username}</p>
      </main>
    </div>
  )
}
