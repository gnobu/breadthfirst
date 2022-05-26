import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import BankDetails from './components/bank';
import image01 from './images/image01.jpg';
import {ClassCount} from './components/classBank';
import Count from './components/bank';
import MirrorInput, {FormUpdate} from './components/state';
import ClassMirrorInput from './components/classState';
import WaterBoil from './components/LiftState';
import FetchRes, {FetchGit} from './components/fetchingData';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, Contacts, Error, ShowNum } from './components/reactRouter';
import { SignUp, SignIn, Home } from './components/breadthFirst';



const root = ReactDOM.createRoot(document.getElementById('root'));
// const btn = <button onClick={sayHello}> click</button>;

// let username = 'gnobu';
// let fullName = 'Ubong Inyang';

// function sayHello(e) {
//   e.target.style.backgroundColor = '#000000';
//   e.target.style.color = '#ffffff';
// }

function UserInfo(props) {
  const idx = props.idx;
  let users = [
    {handle : 'gnobu', fullName: 'Ubong Inyang'},
    {handle : 'AKfour7', fullName: "Kingsley Akwa"}
  ];
  // console.log(props.username);
  return <div>
      <h1>{users[idx].fullName}</h1>
      <h2>&#64;{users[idx].handle}</h2>
    </div>;
}

// function Auth(props) {
//   return props.username === "gnobu"?
//     <div>
//       <h1>{props.fullName}</h1>
//       <h2>&#64;{props.username}</h2>
//     </div>
//     :<h2>Not the right user...</h2>
// }


function MyDetails(props){
  const [data, setData] = useState(null);

  async function fetchRes(){
    const req = await fetch('/api.json');
    if (req.ok){
      const res = await req.json();
      setData(res);
    }
  }

  useEffect(() => {
    fetchRes();
  })

  return(
    <>
      {
        data === null
        ? <>User data loading</>
        : <>{JSON.stringify(data)}</>
      }
    </>
  )
}


const User = createContext();

function ShowSignedIn(props) {
  const name = useContext(User);
  return (
    <>Hello, my name is {name}</>
  )
}



function Ref(props) {
  const x = useRef(1);

  function update(e){
    x.current = e.target.value;
    console.log(x.current)
  }
  return (
    <>
      <>{JSON.stringify(x)}</>
      <input value={x.current} onChange={update} />
    </>
  )
}




root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    {/* <h1>Hello World!</h1> shows on all pages. */}
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={ <SignUp /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path='/contacts' element={<Contacts />} />
      <Route path="/contacts/:num" element={<ShowNum />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
<>
    <div className="profile">
      <div className="imageWrap">
        <img src={image01} alt="sunset in the horizon"/>
      </div>
      {/* <UserInfo username={username} fullName={fullName}/> */}
      {/* <Auth username={username} fullName={fullName}/> */}
      <UserInfo idx = {1}/>
      {/* {btn}
      <hr/> */}
    </div>
    <ClassCount />
    <br />
    <Count />
    <br />
    <MirrorInput />
    <br />
    <ClassMirrorInput />
    <br />
    <FormUpdate />
    <br />
    <WaterBoil />
    {/* <br />
    <FetchRes /> */}
    <br />
    <FetchGit />
    <br />
    <MyDetails />
    <br />
    <User.Provider value='Sam'>
      <ShowSignedIn />
    </User.Provider>
    <br />
    <Ref />
  </>