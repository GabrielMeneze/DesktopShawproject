import styles from './Card.module.css';

// homepage card
export function Card({ username, id, image, name, route }) {
  return (
    <a href={route}>
      <div className={styles.card}>
        <div className={styles.details}>
          <img src={image} alt="photo of a github user" />
          <div>
            <p className='mt-3'>Id: {id}</p>
            <p>Name: {username}</p>
          </div>
        </div>
        <span className="material-symbols-outlined">chevron_right</span>
      </div>
    </a>
  );
}
