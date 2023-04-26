import Layout from "../components/layout"
import { signIn, signOut, useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import styles from "./index.module.css"


export default function IndexPage() {
  const { data: session, status } = useSession()
  const [inputURL, setInputURL] = useState("")
  const [notFound, isNotFound] = useState(false)
  const [supplier, setSupplier] = useState("")

  const [content, setContent] = useState([])
  const [Loaded, isLoaded] = useState(false)
  const [LoadingSubmit, isLoadingSubmit] = useState(false)
  useEffect(() => {
    const fetchData = async () => {

      const res = await fetch("/api/db/ItemToVerify")
      const json = await res.json()
      if (json.done) {
        
        //setContent(JSON.stringify(JSON.parse(json.result)))
        setContent(JSON.parse(json.result))

      }



      const data = {
        email: session.user.email,
      }
  
      const JSONdata = JSON.stringify(data)
      const endpoint = '/api/db/supplier'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
  
      const response = await fetch(endpoint, options)
      const json2 = await response.json()
      
      if (json2.done) {
        
        //setContent(JSON.stringify(JSON.parse(json.result)))
        setSupplier(JSON.parse(json2.result))

      }
      if(json.done && json2.done){
        isLoaded(true)
        console.log(supplier)
      }
    }

  

    fetchData()
  
  }, [Loaded])


  const handleSubmit = async (event) => {

    event.preventDefault()
    isLoadingSubmit(true)
    const data = {
      email: session.user.email,
      itemURL: event.target.inputURL.value,
      itemFound: !notFound,
      itemID: content[0].itemID,
      supID: supplier
    }

    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/db/submitItem'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()
    if(result){
      window.location.reload();
    }
  }


  return (
    <Layout>
      <div>
        {Loaded ?
          <div className={styles.itemCard}>
            <h1>{content[0].name_en}</h1>
            <h1>{content[0].name_ar}</h1>
            <div className={styles.center}>
              <img src={content[0].images_URL} width={400} height={400} style={{ marginTop: "10px", marginBottom: "10px" }}></img>
            </div>
            <div className={styles.info}>
              <p>Brand</p><p>{content[0].brand}</p>
              <p>Size</p><p>{content[0].size}</p>
              <p>Category</p><p>{content[0].primarycategory}</p>
              <p>Sub-category 1</p><p>{content[0].parentcategory1}</p>
              <p>Sub-category 2</p><p>{content[0].parentcategory2}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.center + " " + styles.col}>
                <select value={supplier}
                  onChange={(e) => {
                    setSupplier(e.target.value);
                  }}>
                  <option value="SA-1000-1">Lulu Hypermarket</option>
                  <option value="SA-1100-1">Tamimi Hypermarket</option>
                  <option value="SA-1200-1">Danube</option>
                  <option value="SA-1300-1">Carrefour</option>
                </select>
              </div>
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
                  name="found"
                  onChange={event => isNotFound(event.target.checked)} />
              </div>
              <div className={styles.center}>
                <button type="submit" disabled={LoadingSubmit || ((notFound || inputURL == '') && !(notFound && inputURL == ''))} className={styles.sendBtn}>{LoadingSubmit?"Sending...":"Send"}</button>
              </div>
            </form>
          </div>
          : status == 'authenticated' ?
            <div>
              <h1>Loading..</h1>
            </div> : <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              <h1>Please sign in first</h1>
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
            </div>}
      </div>

    </Layout>
  )
}
