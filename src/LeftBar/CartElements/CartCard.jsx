import react from "react";
import './CartCard.css'

export default function CartCard({item}){
    return(
        <>
    <div className="info">  
    <div className="info__title">{item}</div>
    </div>
        </>
    )
}