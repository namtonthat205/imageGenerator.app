import React from 'react'
import loader from "@/assets/loader.svg"
const Loader = () => {
  return (
    <div className = "flex-center w-full">
        <img src = {loader}/>
        alt = "loader"
        width={24}
        height={24}
        </div>
  )
}

export default Loader