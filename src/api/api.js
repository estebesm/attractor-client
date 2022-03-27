const GITHUB_API_URL = 'https://api.github.com'
const LOCAL_API_URL = 'http://localhost:5000'

export const getUser = (token) => fetch(`${GITHUB_API_URL}/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .catch(err => console.log(err))

export const getToken = () => fetch(`${LOCAL_API_URL}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        }})
        .then(res => res.json())
        .then(res => res.token)
        .catch(err => console.log(err))

export const logIn = () => {
    window.open(`${LOCAL_API_URL}/auth/github`, "_self");
};

export const logOut = (callback) => {
    window.open(`${LOCAL_API_URL}/auth/logout`, "_self");
    sessionStorage.setItem("token", null)
    console.log('log out')
    callback()
};

export const editProfile = (token, name, bio, company, location) => fetch(`${GITHUB_API_URL}/user`, {
         method: "PATCH",
         headers: {
             'Authorization': `Bearer ${token}`,
         },
         body: JSON.stringify({
              location, name, bio, company
         })
     })
        .then(res => res.json())
        .catch(err => console.log(err))

export const getPublicRepos = (login) => fetch(`${GITHUB_API_URL}/users/${login}/repos`, {
        method: "GET",
    })
    .then(res => res.json())
    .catch(err => console.log(err))

export const getPrivateRepos = (token, user) => fetch(`${GITHUB_API_URL}/user/repos`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    method: "GET",
})
    .then(repos => repos.json())
    .then(repos => repos.filter(repo => repo.private))
    .catch(err => console.log(err))


export const searchUsers = (user) => fetch(`${GITHUB_API_URL}/search/users?q=${user}&per_page=10`, {
    method: 'GET',
})
    .then(res => res.json())
    .catch(err => console.log(err))

