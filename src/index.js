import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import image01 from './image01.jpg';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

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

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
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
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
