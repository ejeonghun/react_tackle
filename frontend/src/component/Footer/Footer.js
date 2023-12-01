import React from "react";
import { useLottie } from "lottie-react";
import Animation from "../Lottie/Law.json";

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

function Footer() {
    <footer className="footer">
        <div className="footer_div">
        <div className="footer_logo">
            <LottieAnimation />
            </div>
        <div className="footer_text">
            <h2>태클</h2>
            <p></p>
            </div>
            </div>
        </footer>
}


export default Footer;