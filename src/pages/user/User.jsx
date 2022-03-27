import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import {getPublicRepos} from "../../api/api";
import Repo from "../../components/repo/Repo";
import Loading from "../../components/loading/Loading";

const User = () => {

    const param = useParams();
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPublicRepos(param.user)
            .then(repos => {
                const mappedRepos = repos.map(repo => ({
                    name: repo.name,
                    url: repo.html_url,
                    ownerName: param.user,
                    ownerUrl: repo.owner.html_url
                }))
                setRepos(mappedRepos);
            });
        setLoading(false);
    }, []);

    return (
        <div>
            {loading ?
                <Loading/>
                :
                <>
                <Header/>
                    <Container>
                        <h1>
                            {param.user}
                        </h1>
                        <h2>
                            Public repositories
                        </h2>
                            { repos.length ? repos.map(repo =>
                                <Repo name={repo.name}
                                      url={repo.url}
                                      ownerName={repo.ownerName}
                                      ownerUrl={repo.ownerUrl}
                                />
                            )
                                :
                            <h3>
                                 doesn't have public repositories
                            </h3>

                    }
                    </Container>
                </>
            }
        </div>
    );
};

export default User;