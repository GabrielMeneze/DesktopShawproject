import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/CardProfile/index';
import "bootstrap/dist/css/bootstrap.min.css";

export function Profile() {
  const { user } = useParams();
  const [listUser, setListUser] = useState({});
  const [repos, setRepos] = useState([]);

  // GET (fetching user data and repositories data)
  useEffect(() => {
    const data = async () => {
      await axios
        .get(`https://api.github.com/users/${user}`)
        .then(async (response) => {
          setListUser(response.data);

          await axios
            .get(`https://api.github.com/users/${user}/repos`)
            .then((res) => {
              setRepos(res.data);
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    };
    data();
  }, []);


  return (
    <>
      <header className="mx-auto userdetails d-flex align-items-center">
        <img className='userimg' src={listUser.avatar_url} alt="" />
        <div className="col-10 mx-auto">
          <p>Id: {listUser.id}</p>
          <p>Login: {listUser.login}</p>
          <p>Profile: {listUser.html_url}</p>
          <p>Created at: {listUser.created_at}</p>
        </div>
      </header>

      <section>
        {repos &&
          repos.map((repo) => {
            return (
              <>
                <Card
                  id={repo.id}
                  name={repo.name}
                  username={repo.full_name}
                  image={listUser.avatar_url}
                  route={repo.html_url}
                />
              </>
            );
          })}
      </section>
    </>
  );
}
