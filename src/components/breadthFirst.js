
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const linkStyle = {
    marginLeft: '5px'
}


function useLocalStorage(key, val={}) {
    if (!localStorage.getItem(key)){
        localStorage.setItem(key, JSON.stringify(val))
    }
    return JSON.parse(localStorage.getItem(key))
}

export function SignUp(props){
    let users = useLocalStorage("users", {});
    const uname = useRef();
    const pass = useRef();
    const confirm = useRef();
    const skill = useRef();
    
    function submitForm(e) {
        e.preventDefault();
    
        const username = uname.current.value;
        const password = pass.current.value;
        const confirmPassword = confirm.current.value;
        const userSkills = skill.current.value;

        if(Object.hasOwn(users, username)){
            alert("Username already taken");
            return;
        } else if (password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        }

        users[username] = {
            username: username,
            password: password,
            skills: userSkills.split(','),
            friends: []
        }
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created successfully');
    }

    return(
        <form onSubmit={submitForm}>
            <h1>Sign up</h1>
            <input name="username" type="text" ref={uname} placeholder="username" minLength="4" required />
            <br />
            <input type="password" name="password" ref={pass} placeholder="password" minLength="8" required/>
            <br />
            <input type="password" name="confirmpass" ref={confirm} placeholder="confirm password" required/>
            <br />
            <input type="text" name="skill" ref={skill} placeholder="skills (comma separated)" minLength="2" required/>
            <br />
            <button type="submit">sign up</button>
            <p>already have an account?
                <Link style={linkStyle} to="/">sign in</Link>
            </p>
        </form>
    )
}

export function SignIn(props){
    const users = useLocalStorage('users');
    const uname = useRef();
    const pass = useRef();
    const navigate = useNavigate();
    
    function signin(e){
        e.preventDefault();

        const username = uname.current.value;
        const password = pass.current.value;
        
        if(!Object.hasOwn(users, username)){
            alert("username doesn't exist. Check it again or create account");
            return;
        }
        
        const user = users[username];
        
        if(password !== user.password){
            alert("Incorrect password. Try again");
            return;
        }
        
        alert('Signed in successfully!')
        sessionStorage.setItem('signedIn', JSON.stringify(user.username));
        navigate('/home')
    }
    
    return (
        <form onSubmit={signin}>
            <h1>Sign in</h1>
            <input type="text" name="username" placeholder="username" ref={uname} minLength="2" required />
            <br />
            <input type="password" name='password' placeholder="password" ref={pass} minLength="8" required />
            <br />
            <button type="submit">sign in</button>
            <p> New here?
                <Link style={linkStyle} to="/signup">create account</Link>
            </p>
        </form>
    )
}

// const NETWORK = {
//         A: {
//                 skill: 'a',
//                 friends: ['B', 'C']
//             },
//             B: {
//                     skill: 'b',
//                     friends: []
//                 },
//                 C: {
//                         skill: 'c',
//                         friends: ['D', 'E']
//                     },
//                     D: {
//                             skill: 'd',
//                             friends: ['Bab']
//                         },
//                         E: {
//                                 skill: 'e',
//         friends: []
//     },
//     Bab: {
//             skill: 'b',
//             friends: []
//         }
//     }
    
    export function Home(props){
    const skillsrch = useRef();
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const [skillTree, setSkillTree] = useState([]);
    const search = useRef();
    const users = useLocalStorage('users');
    
    
    useEffect(() => {
        if(!sessionStorage.getItem('signedIn')){
            navigate('/');
        }
    },[])
    
    
    function searchFriend(e){
        e.preventDefault();
        
        const friend = search.current.value;
        const match = [];
        for (let user in users){
            if (user.includes(friend)){
                match.push(user);
            }
        }

        setFriends(prev => match);
        // console.log(match);
    }

    function addFriend(e){
        const signedIn = JSON.parse(sessionStorage.getItem('signedIn'));
        console.log(users);
        const added = e.target.id;
        if(signedIn === added){
            alert('cannot add yourself');
            return;
        } else if (users[signedIn].friends.includes(added)){
            alert('Already a friend');
            return;
        }
        users[signedIn].friends.push(added);
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Added ${added} to friends list`);
    }



    function unravel(person, connections){
        const rel = [person];
        let curr = connections[person];

        while(curr !== null){
            rel.push(curr);
            curr = connections[curr];
        }
        rel.reverse();
        setSkillTree(prec => rel);
    }


    
    function searchSkill(e){
        e.preventDefault();
        
        const signedIn = JSON.parse(sessionStorage.getItem('signedIn'));
        const skill = skillsrch.current.value;
        const connections = {[signedIn]: null};
        const searched = [];
        const searching = [signedIn];

        while(searching.length > 0){
            const curr = searching.shift();
            if(users[curr].skills.includes(skill) && curr !== signedIn) return unravel(curr, connections);
            (users[curr].friends || []).forEach(frnd => {
                if (!searched.includes(frnd)) {
                    searching.push(frnd);
                    if(!Object.hasOwn(connections, frnd)) connections[frnd] = curr;
                };
            })
            searched.push(curr);
        }
        alert('Sorry, no match found.');
    }

    return (

        <div>
            <div>
                <form onSubmit={searchFriend}>
                    <input placeholder="search friend username" ref={search} minLength="1" required/>
                    <button type="submit">search</button>
                </form>
                {
                    (friends.length > 0)
                    ? <div>
                        <p>Results:</p>
                        {friends.map((friend, idx) => <div key={idx}>{friend} <button onClick={addFriend} id={friend}>Add friend</button></div>)}
                    </div>
                    : <></>
                }
            </div>
            <div>
                <form onSubmit={searchSkill}>
                    <input placeholder="search skill" ref={skillsrch} minLength="1" required/>
                    <button type="submit">search</button>
                </form>
                {
                    (skillTree.length > 0)
                    ? <div>
                        <p>Results:</p>
                        <p>{skillTree[skillTree.length-1]}</p>
                        <p>Connection:
                        {skillTree.map((person, idx) => <span key={idx}> {person}=&gt;</span>)}</p>
                    </div>
                    : <></>
                }
            </div>
        </div>
    )
}
