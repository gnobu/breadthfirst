import { Link, useParams } from "react-router-dom"

export function HomePage(props){
    return(
        <div>
            <h1>This is the home page</h1>
            <Link to='/contacts'>Contacts</Link>
        </div>
    )
}

export function Contacts(props){
    return(
        <div>
            <h1>This is the contacts page</h1>
            <Link to='/' >
                Home
            </Link>
        </div>
    )
}

export function ShowNum(props){
    const param = useParams();

    return(
        <div>
            <p>The number is {param.num}</p>
        </div>
    )
}


export function Error(props){
    const errorStyles = {
        position: 'absolute',
        top: 0,
        height: '100vh',
        width: '100%',
        backgroundColor: 'black',
        color: 'silver',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    return(
        <div style={errorStyles}>
            <h1>404: Page not found</h1>
        </div>
    )
}