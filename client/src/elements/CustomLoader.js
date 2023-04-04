import React from 'react';
import {CircleLoader} from "react-spinners";

const CustomLoader = () => {
  return (
    <div className={'absolute top-0 left-0 right-0 bottom-0 grid place-items-center backdrop-blur z-10 '}>
        <CircleLoader color="#323232" />
    </div>
  )
}

export default CustomLoader;