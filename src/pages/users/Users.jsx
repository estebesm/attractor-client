import React, {useEffect, useState} from 'react';
import './users.scss';
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import searchIcon from './searchIcon.png'
import {searchUsers} from "../../api/api";
import {Link, useLocation} from "react-router-dom";
import {useDebounce} from "../../hooks/useDebounce";

const Users = () => {
    const location = useLocation();

    const [totalCount, setTotalCount] = useState(null);
    const [users, setUsers] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [searching, setSearching] = useState(false);

    const debouncedInputValue = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedInputValue) {
            setSearching(true);
            searchUsers(debouncedInputValue).then(results => {
                setSearching(false);
                setTotalCount(results.total_count)
                setUsers(results.items.map(item => item.login))
            });
        } else {
            setUsers([]);
        }
    }, [debouncedInputValue]);

    return (
        <div className={'users'}>
            <Header/>
                <Container>
                    <h1>Search users</h1>
                    <div className={'searchSection'}>
                        <input value={inputValue}
                               onChange={e => setInputValue(e.target.value)}
                        />
                        <button onClick={() => {}}>
                            <img src={searchIcon} alt={'search'}/>
                        </button>
                    </div>
                    {searching ?
                        <div>searching...</div>
                        :
                        <>
                            <div className={'totalCount'}>
                                {totalCount || totalCount === 0 ?
                                    'Total Count: ' + totalCount
                                    :
                                    'Search'
                                }
                            </div>
                            <div className={'usersList'}>
                                {users ?
                                    users.length ?
                                    users.map(user =>
                                    <div className={'user'}>
                                    <Link to={`${location.pathname}/${user}`}>
                                {user}
                                    </Link>
                                    </div>
                                    )
                                    :
                                    <h3>Users not found</h3>
                                    :
                                    <h3></h3>
                                }
                            </div>
                        </>
                    }
            </Container>
        </div>
    );
};

export default Users;