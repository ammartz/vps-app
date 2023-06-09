import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import { useState, useEffect } from "react"
// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const [itemsLeft, setItemsLeft] = useState([])
  const [itemsDone, setItemsDone] = useState([])
  const [Loaded, isLoaded] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const res1 = await fetch("/api/db/ItemsLeftCount")
      const json1 = await res1.json()
      if (json1.done) {
        //isLoaded(true)
        //setContent(JSON.stringify(JSON.parse(json.result)))
        setItemsLeft(JSON.parse(json1.result))
      }

      const res2 = await fetch("/api/db/ItemsDoneCount")
      const json2 = await res2.json()
      if (json2.done) {
        isLoaded(true)
        //setContent(JSON.stringify(JSON.parse(json.result)))
        setItemsDone(JSON.parse(json2.result))
      }
    }
    fetchData()
  }, [Loaded])

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
            }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>

      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/itemsDone">Items Done</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/me">Me</Link>
          </li>
        </ul>
      </nav>
      <div>{Loaded ? <div className={styles.itemCount}>
        <h3>Items Done: {itemsDone[0].NumberOfItems}</h3>
        <h3>Items left: {itemsLeft[0].NumberOfItems}</h3>
      </div>
        : session? <div className={styles.itemCount}>
        <h3>Items Done: Loading...</h3>
        <h3>Items left: Loading...</h3>
      </div>: <div className={styles.itemCount} />
      }
      </div>
    </header>
  )
}
