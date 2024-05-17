import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Button";
import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import YourComponent from "./YourComponent";
import AdminComponent from "./AdminComponent";

// const router = createBrowserRouter(createRoutesFromElements){
//   <Route path="/" element={HomePage>/}>
//   </Route>
// }

// import { PureComponent } from 'react';

// class Greeting extends PureComponent {
//   render() {
//     return <h1>Hello, {this.props.name}!</h1>;
//   }
// }

// function Greeting(props){
//   console.log(props);
//   const {onClick, name} = props;

//   return (
//     <div onClick={onClick}>
//       <h1>Hello, {name}!</h1>;
//       <p>

//       </p>
//     </div>
//   )
// }

function App() {
  return (
    <div className="App">
      <h1>Interactiunea cu Blockchain </h1>
      <YourComponent />
      <AdminComponent />
    </div>
  );
}

export default App;
