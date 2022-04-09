import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import './search.css'


export const SearchBar = ({}) => {
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, []);

    useEffect(() => {
        if (!showDropdown) return;
        let ignoreSearch = document.getElementById("search")

        const closeMenu = (e) => {
            let target = e.target
            if(target === ignoreSearch || ignoreSearch.contains(target)){
                return;
            }
            setShowDropdown(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showDropdown]);

    const getFilteredUsers = (query, users) => {

        if(!query) {
            return users;
        }
        
        return users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()))
    }
   const filteredUsers = getFilteredUsers(query, users)
    

    return (
        <div className="search">
            <input type="text"
            onChange={e => setQuery(e.target.value)}
            id="search"
            placeholder="Search"
            autoComplete='off'
            onClick={() => setShowDropdown(true)}
            />
            {showDropdown && (
                <div id="search-list" >
                    {filteredUsers.map(value => (
                        <Link  key={value.id} onClick={() => setShowDropdown(false)} to={`/users/${value.id}`}>
                            <div className="user-link-search">
                            <img alt="profile_image" src={value.profile_image}/>
                            {value.username}
                            </div>
                        </Link>
                    ))}
                </div>            
            )}
        </div>    
    )
}


