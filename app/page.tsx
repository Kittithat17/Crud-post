"use client"
import Autoslides from "@/components/Autoslide/Autoslide"

import CategoryCards from "@/components/Navbar/CategoryCards"
import { Slidecard } from "@/components/Autoslide/Slidecard"
//import { useEffect, useState } from "react"


// const [product, setProduct] = useState([]);

const page = () => {
  
  return (
    <div className="flex flex-col">
      <Autoslides />
      <h1 className=" uppercase text-center font-bold pt-4" style={{ fontSize: "52px" }}>best sneaker collection</h1>
      <p className=" text-center text-sm  font-medium text-stone-400  pt-4">iafjlkjsfjsdfsfjslfjl;sajflsjfals;fjaslfasf;alsfaslkfkfdlkfkldnfkdnfldfndnflfdfnkdlf
        kdfldflkdjflkd
        <br/>
        jfldjfldjfkdfjddjfldfdfdfdf;lsdfl;kdsfldks;fkds;lfks;kf
      </p>
      

      <CategoryCards/>
      <Slidecard />
      
    </div>
  )
}

export default page