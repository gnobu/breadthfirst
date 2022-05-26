import {useState} from 'react'

function MirrorInput(params) {
    const [data, setData] = useState('MirrorUpdate');

    function update(e){
        setData(data => e.target.value)
    }

    return (
        <>
            <input onChange={update} value={data}/>
            <div>{data}</div>
        </>
    );
}
export default MirrorInput;

function FormUpdate(props){
    const [formData, setData] = useState({
        name: '',
        pass: ''
    });

    function updateInput(e){
        let toChange = e.target.id;
        let val = e.target.value;
        setData(formData => {
            return {...formData, [toChange] : val}
        })
    }

    function toJSON(e){
        e.preventDefault();
        const submitted = JSON.stringify(formData);
        console.log(submitted, typeof submitted);
    }

    return (
        <form onSubmit={toJSON}>
            <div>{formData.name}</div>
            <input id="name" value={formData.name} placeholder="Name" onChange={updateInput} />
            <br />
            <div>{formData.pass}</div>
            <input id="pass" value={formData.pass} placeholder="Password" onChange={updateInput} />
            <br />
            <button>submit</button>
        </form>
    )
}
export {FormUpdate};