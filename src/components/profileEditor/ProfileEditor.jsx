import React, {useRef, useState} from 'react';
import './profileEditor.scss';
import {editProfile, getUser} from "../../api/api";
import Loading from "../loading/Loading";

const ProfileEditor = ({user, setUser}) => {
    const [name, setName] = useState(user.name)
    const [bio, setBio] = useState(user.bio)
    const [company, setCompany] = useState(user.company)
    const [location, setLocation] = useState(user.location)

    const [loading, setLoading] = useState(false)

    const token = sessionStorage.getItem('token');

    const updateProfile = () => {
        setLoading(true);
        editProfile(token, name, bio, company, location)
            .then(res => getUser(token))
            .then(user => {
                setUser({
                    ...user,
                    name,
                    bio,
                    company,
                    location
                })
            })
        setLoading(false);
    }

    return (
        loading ?
        <Loading/>
        :
        <div className={'profileEditor'}>
            <label>
                name
                <input placeholder={'name'}
                       value={name}
                       onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                bio
                <input placeholder={'bio'}
                       value={bio}
                       onChange={e => setBio(e.target.value)}
                />
            </label>
            <label>
                company
                <input placeholder={'company'}
                       value={company}
                       onChange={e => setCompany(e.target.value)}
                />
            </label>
            <label>
                location
                <input placeholder={'location'}
                       value={location}
                       onChange={e => setLocation(e.target.value)}
                />
            </label>
            <button onClick={updateProfile}>
                edit profile
            </button>
        </div>
    );

};

export default ProfileEditor;