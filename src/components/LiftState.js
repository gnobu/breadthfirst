import { useState, useEffect } from "react";

function ChangeTemp(props){
    function update(e){
        const val = e.target.value;
        props.setter(prevTemp => val);
        props.setBoil(prevBool => val>=100);
    }
    return (
        <input type="number" onChange={update} />
    )
}

export default function WaterBoil(props){
    const [temp, setTemp] = useState(99);
    const [willBoil, setWillBoil] = useState(temp >= 100? true: false);

    useEffect(() => console.log('Will always re-run on re-render'))
    useEffect(() => console.log('Will run on mount'), [])
    useEffect(() => console.log('Will run on willBoil'), [willBoil])

    return (
        <div>
            <li>Temperature: {temp}</li>
            <li>Water will {willBoil? 'boil': 'not boil'} at {temp} degrees.</li>
            <p>Change temperature: <ChangeTemp setter={setTemp} setBoil={setWillBoil}/></p>
        </div>
    )
}