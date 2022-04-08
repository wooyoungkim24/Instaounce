import './search'
import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react'
import { getAllUsers } from '../../store/userPages'
import { Link } from 'react-router-dom'


export const SearchBar = ({}) => {
    const [wordEntered, setWordEntered] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [users, setUsers] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, []);
    
    const handleFilter = (e) => {
        const searchWord = e.target.value
        setWordEntered(searchWord)
        const newFilter = users.filter((value) => {
            return value.username.toLowerCase().includes(searchWord.toLowerCase())
        })
        if(searchWord === ''){
            setFilteredData([])
        }
        setFilteredData(newFilter)
    }

    const clearInput = () => {
        setFilteredData([])
        setWordEntered("")
    }
  

    return (
        <div className="search">
               <div className="searchInputs">
                   <input 
                   type="text"
                   placeholder="Search"
                   onChange={handleFilter}
                   value={wordEntered}
                   />
                   <div className="searchIcon">
                   {filteredData.length === 0 ? 
                   <i class="fa-solid fa-magnifying-glass"></i>
                   : <i id="clearBtn" onClick={clearInput} class="fa-solid fa-xmark"></i>}
                   </div>
               </div>
               {filteredData.length != 0 && (
                    <div className="dataResult">
                        {users.slice(0,15).map(user => (
                            <Link className="data-item" to={`/users/${user.id}`} key={user.id}>
                                <p>{user.username}</p>
                                </Link>
                        ))}
                    </div>
               )}

        </div>
        
    )
}


