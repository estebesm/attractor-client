import React from 'react';
import './profile.scss'
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import {editProfile} from "../../api/api";
import ProfileEditor from "../../components/profileEditor/ProfileEditor";
import {Link} from "react-router-dom";

const Profile = ({setUser, user}) => {

    return (
        <div>
            <Header setUser={setUser}/>
            <Container>
                <div className='profile'>
                    <div className='left'>
                        <img src={user.avatar_url || user.gravatar_id} alt='avatar'/>
                        <Link to={'/repositories'}>
                            <button>repositories</button>
                        </Link>
                        <Link to={'/users'}>
                            <button>other users</button>
                        </Link>
                    </div>
                    <div className='right'>
                        <div className='primary'>
                            <span className='username'>{user.name}</span>
                            <br/>
                            login: {user.login}
                        </div>
                        <div className='secondary'>
                            email: {user.email}<br/>
                            company: {user.company}<br/>
                            location: {user.location}<br/>
                            description: {user.bio}<br/>
                            url: {user.html_url}
                        </div>
                    </div>
                    <ProfileEditor editProfile = {editProfile}
                                   setUser={setUser}
                                   user={{
                                       name: user.name,
                                       bio: user.bio,
                                       company: user.company,
                                       location: user.location
                                    }}
                    />
                </div>
            </Container>
        </div>
    );
};

export default Profile;
