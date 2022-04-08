import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import './search.css'
import UserProfile from '../UserProfile/index'



export const SearchBar = ({}) => {
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, []);


    const getFilteredUsers = (query, users) => {

        if(!query) {
            return users;
        }
        
        return users.filter(user => user.username.includes(query))
    }
   const filteredUsers = getFilteredUsers(query, users)
    

    return (
        <div className="search">
            <input type="text"
            onChange={e => setQuery(e.target.value)}
            id="search"
            placeholder="Search"
            autoComplete='off'
            />
            <div id="search-list" >
                {filteredUsers.map(value => (
                    <div key={value.id} className="user-link-search">
                        <Link to={`/users/${value.id}`}>
                            <img alt="profile_image" src={value.profile_image}/>
                            {value.username}
                        </Link>
                    </div>
                ))}
            </div>            
        </div>    
    )
}


