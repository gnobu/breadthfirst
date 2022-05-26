import React, {useState} from 'react';

function BankDetails(props){
    const details = {
        0: {
            bank: 'GTBank',
            acctNo: '1423'
        },
        1: {
            bank: 'FirstBank',
            acctNo: '2845'
        },
        2: {
            bank: 'Zenith',
            acctNo: '0913'
        }
    }

    let id = props.id;
    let bankAcct = details[id];

    return (
        <>
            <li>Bank Name: {bankAcct.bank}</li>
            <li>Account Number: {bankAcct.acctNo}</li>
        </>
    )
}

function User(props){
    let users = [
        {n: 'Ubong', id: 0},
        {n: 'Mitchel', id: 1},
        {n: 'Eddy', id: 2}
    ];

    let index = props.idx;
    let arrUser = users[index];
    return (
        <div>
            <p>Name: {arrUser.n}</p>
            <BankDetails id={arrUser.id} />
        </div>
    )
}


function Count(props){
    let [x, changex] = useState(0);
    
    function inc(e) {
      changex(cur => cur+1)
    }
  
    return (
      <div>
        <span>
          <button onClick={()=>changex(x-1)}>decrease</button>
          <span>{x}</span>
          <button onClick={inc}>increase</button>
        </span>
        <User idx={x} />
      </div>
    )
    // return <button onClick={inc}>{x}</button>
  }

export default Count;