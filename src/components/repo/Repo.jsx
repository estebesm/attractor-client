import React from 'react';
import './repo.scss'

const Repo = (props) => {
    const {name, url, ownerName, ownerUrl} = props
    return (
        <div className={'repo'}>
            name: {name}<br/>
            url: <a href={url} target={'_blank'}>{url}</a> <br/>
            owner name: {ownerName}<br/>
            owner url:  <a href={ownerUrl} target={'_blank'}>
                            {ownerUrl}
                        </a>
        </div>
    );
};

export default Repo;