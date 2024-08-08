import loaderAnimation from "@/assets/loader"
import React from 'react'
import Lottie from 'react-lottie'

const Loader = () =>{
  return (
    <div>
      <Lottie
        isClickToPauseDisabled={true}
        height={100}
        width={100}
        options={
            {
                loop: true,
                autoplay: true,

            }
        }
      />
    </div>
  )
}

export default Loader
