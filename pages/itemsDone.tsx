import Layout from "../components/layout"
import { useState, useEffect } from "react"
import styles from "./index.module.css"
import { signIn, signOut, useSession } from "next-auth/react"


export default function ItemsDonePage() {
  
  const { data: session, status } = useSession()
  const [itemsDoneList, setItemsDoneList] = useState([])
  const [Loaded, isLoaded] = useState(false)
  useEffect(() => {
    const fetchData = async () => {

      const res = await fetch("/api/db/ItemsDoneList")
      const json = await res.json()
      if (json.done) {
        isLoaded(true)
        //setContent(JSON.stringify(JSON.parse(json.result)))
        setItemsDoneList(JSON.parse(json.result))
      }
    }
    fetchData()
    console.log(itemsDoneList)
  }, [Loaded])

  return (
    <Layout>
      
      {Loaded?
    <div>
      <h1>Items Done</h1>
    {itemsDoneList.map((i, index) => {
      return(
        <div key={i.name_en + " " + index}>
       <details className={styles.acc}>
        <summary className={styles.accTitle}>
        {i.name_en}
        </summary>
        <div style={{padding: '10px', display:"flex", flexDirection: "column", gap:"10px"}}>
          <p style={{margin: 0}}>{i.found?"Found: True":"Found: False"}</p>
          <a href={i.found?i.item_URL:""} target="_blank">{i.found?i.item_URL:""}</a>
        
        <div className={styles.info}>
          <p>Brand</p><p>{i.brand}</p>
          <p>Size</p><p>{i.size}</p>
          <p>Category</p><p>{i.primarycategory}</p>
          <p>Sub-category 1</p><p>{i.parentcategory1}</p>
          <p>Sub-category 2</p><p>{i.parentcategory2}</p>
        </div>

        </div>
       </details>
          
        </div>
      )
    })}
  </div>
  : session? 
  <h1>
    Loading...
  </h1>: <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
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
            </div>  
    }
      
    </Layout>
  )
}
