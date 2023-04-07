import Layout from "../components/layout"
import { signIn, signOut, useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import styles from "./index.module.css"


export default function IndexPage() {
  const { data: session, status } = useSession()
  const [inputURL, setInputURL] = useState("")
  const [notFound, isNotFound] = useState(false)

  const [content, setContent] = useState([])
  const [Loaded, isLoaded] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/db/ItemToVerify")
      const json = await res.json()
      if (json.done) {
        isLoaded(true)
        //setContent(JSON.stringify(JSON.parse(json.result)))
        setContent(JSON.parse(json.result))

      }
    }
    fetchData()
  }, [Loaded])


  return (
    <Layout>
      <div>
        {Loaded ?
          <div className={styles.itemCard}>
            <h1>{content[0].name_en}</h1>
            <h1>{content[0].name_ar}</h1>
            <div className={styles.center}>
              <img src={content[0].images_URL}></img>
            </div>
            <div className={styles.info}>
              <p>Brand</p><p>{content[0].brand}</p>
              <p>Size</p><p>{content[0].size}</p>
              <p>Category</p><p>{content[0].primarycategory}</p>
              <p>Sub-category 1</p><p>{content[0].parentcategory1}</p>
              <p>Sub-category 2</p><p>{content[0].parentcategory2}</p>
            </div>
            <form>
              <div className={styles.center + " " + styles.col}>
                <label htmlFor="inputURL">Product URL:</label>
                <input
                  type="url"
                  value={inputURL}
                  name="inputURL"
                  onChange={event => setInputURL(event.target.value)}
                  className={styles.inputURL} />
              </div>
              <div className={styles.center}>
                <label>Not Found</label>
                <input 
                  type="checkbox"
                  value={inputURL}
                  name="inputURL"
                  onChange={event => isNotFound(event.target.checked)} />
              </div>
              <div className={styles.center}>
                <button disabled={( notFound || inputURL == '' ) && !( notFound && inputURL == '' )} className={styles.sendBtn}>Send</button>
              </div>
            </form>
          </div>
          : status == 'authenticated'?
          <div>
            <h1>Loading..</h1>
          </div>:<div>
            <h1>Please sign in first</h1>
          </div>}
      </div>

    </Layout>
  )
}
