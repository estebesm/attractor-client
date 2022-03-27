import React, {useEffect, useState} from 'react';
import './repositories.scss'
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import {getPrivateRepos, getPublicRepos} from "../../api/api";
import Repo from "../../components/repo/Repo";
import Loading from "../../components/loading/Loading";

const Repositories = ({user}) => {

    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPublicRepos(user.login)
            .then(repos => {
                const mappedRepos = repos.map(repo => ({
                    name: repo.name,
                    url: repo.html_url,
                    ownerName: user.name,
                    ownerUrl: repo.owner.html_url
                }))
                setPublicRepos(mappedRepos);
            });
        setLoading(false);
    }, [])

    const getPrivateReposHandler = () => {
        setLoading(true)
        getPrivateRepos(token, user).then(repos => {
            const mappedRepos = repos.map(repo => ({
                name: repo.name,
                url: repo.html_url,
                ownerName: user.name,
                ownerUrl: repo.owner.html_url
            }))
            if(!mappedRepos.length){
                alert("You don't have private repositories")
            }
            setPrivateRepos(mappedRepos);
            setLoading(false);
        })
    }

    const [publicRepos, setPublicRepos] = useState([]);
    const [privateRepos, setPrivateRepos] = useState([]);

    return (
        <div className={'repositories'}>
            <Header/>
            {loading ?
                <Loading/>
                :
                <Container>
                    <h1>
                        Repositories
                    </h1>
                    <div className={'repo-container'}>
                        <div className={'public'}>
                            <h2>
                                Public
                            </h2>
                            <div className={'reposList'}>
                                {publicRepos.length ?
                                    publicRepos.map(repo =>
                                        <Repo name={repo.name}
                                              url={repo.url}
                                              ownerName={repo.ownerName}
                                              ownerUrl={repo.ownerUrl}
                                              key={repo.url}
                                        />
                                    )
                                    :
                                    <div>
                                        You don't have public repositories
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={'divider'}>

                        </div>
                        <div className={'private'}>
                            <h2>
                                Private
                            </h2>
                            {privateRepos.length ?
                                <div className={'reposList'}>
                                    {privateRepos.map(repo =>
                                        <Repo name={repo.name}
                                              url={repo.url}
                                              ownerName={repo.ownerName}
                                              ownerUrl={repo.ownerUrl}
                                              key={repo.url}
                                        />)
                                    }
                                </div>
                                :
                                <button onClick={getPrivateReposHandler}>
                                    get private repositories
                                </button>
                            }
                        </div>
                    </div>
                </Container>
            }
        </div>
    );
};

export default Repositories;