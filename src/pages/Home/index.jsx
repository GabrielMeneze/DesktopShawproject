import { useState, useEffect } from 'react';
import { Card } from '../../components/CardHome/index';
import axios from 'axios';
import styles from './Home.module.css';
import "bootstrap/dist/css/bootstrap.min.css"
import './Home.module.css';

export function Home() {
  const [user, setUser] = useState('');
  const [listUser, setListUser] = useState();
  const [userdata, setUserdata] = useState()

  // GET (calling the user list)
  useEffect(() => {
    axios.get('https://api.github.com/users?per_page=8')
      .then(res => {
        setUserdata(res.data)
      })
  }, [])

  // GET (search for a specific user)
  const handleSearch = async () => {
    await axios
      .get(`https://api.github.com/users/${user}`)
      .then((response) => {
        setListUser(response.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <header className={styles.title}>
        <h1>GitHub Users!!!</h1>
      </header>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Type here..."
          onChange={(e) => setUser(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>
      <div>
        {listUser && (
          <Card
            image={listUser.avatar_url}
            username={listUser.login}
            id={listUser.id}
            description={listUser.bio}
            route={`/profile/${listUser.login}`}
          />
        )}
      </div>

      <section className="col-8 mx-auto">
        <article className="d-flex flex-wrap">
          {userdata !== undefined && userdata.map((item) => {
            return (
              <Card
                image={item.avatar_url}
                username={item.login}
                id={item.id}
                route={`/profile/${item.login}`}
              />
            )
          })}
        </article>
      </section>
    </>
  );
}
