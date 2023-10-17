import React from "react";
import { Link } from "react-router-dom";

function Write_Btn() {
    return (
        <Link to ="/write">
        <div className="write_btn" style={{height:'64px',width:'64px', borderRadius:'60%', backgroundColor:'rgba(189, 230, 248, 1)', display:'flex', alignItems:'center', position:'fixed'
        ,top:'90vh', right:'2vh', justifyContent:'center', boxShadow:'2px 2px 10px'}}>
            <img src="/img/write_button.png" className='Write_Btn' style={{width:'36px', height:'36px'}}></img>
        </div>
        </Link>
    );
};

export default Write_Btn;