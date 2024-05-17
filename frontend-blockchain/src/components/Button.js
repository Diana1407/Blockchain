import { useEffect } from "react";  
import styles from "./Button.module.css";
//V1
// function Button(props){
//     return <div>Press</div>;
// }

//V2
const Button=(props)=> {return <div onClick={props.onClick}>{props.text}</div>;}


// const Button=(props)=> {
//     useEffect(() => {
//         console.log("button mounted");

//         return () => {
//             console.log("button unmounted");
//         };
//     };
// )}


export default Button;

