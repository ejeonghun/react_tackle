import React from "react";
import { useLottie } from "lottie-react";
import Animation from "./Law.json";

const LottieAnimation = () => {
    const options = {
      animationData: Animation,
      loop: true,
    };
    const style = {
        width: '52px', height: '52px',
        position: 'absolute',
        top: '0px',
        left: '10px',
        margin: '0px',
        padding: '0px'
    }
  
    const { View } = useLottie(options, style);
  
    return <>{View}</>;
  };

export default LottieAnimation;

