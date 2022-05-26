import { useState, useEffect } from "react";

export default function FetchRes(props) {
    const [data, setData] = useState(null);

    async function getData() {
        const req = await fetch("https://api.github.com/users");
        if(req.ok){
            const res = await req.json();
            setData(prev => res);
        }
    }
    useEffect(() => {
        getData()
    })

    return data
        ? <div className="width-100"a>{data.map(datum => {
            return (
                <div>
                    name: {datum.login}
                    <img src={datum.avatar_url} alt="user's avatar"/>
                </div>
            )
        })}</div>
        : <h1>Loading...</h1>
}



const styles = {
    height: 150,
    width: 150,
    border: '1px solid black',
    borderRadius: '50%'
}

export function FetchGit(props){
    const [name, setName] = useState('');
    const [data, setData] = useState(null);

    function update(e){
        setName(prev => e.target.value);
    }

    async function getData() {
        const req = await fetch(`https://api.github.com/users/${name}`);
        if(req.ok){
            const res = await req.json();
            setData(prev => ({name: res.login, pic: res.avatar_url}))
        }
    }

    useEffect(()=> {
        getData()
    }, [name])

    return (
        <div>
            <input value={name} onChange={update} placeholder="github username" />
            {data===null
            ? <h1>Loading...</h1>
            : <div>
                <img src={data.pic} alt="user avatar" style={styles} />
                <h2>{data.name}</h2>
            </div>}
        </div>
    )
}