import styles from "./Card.module.css";
import {useTheme} from "../hooks/useTheme";

const Card = (props) => {
  const {theme} = useTheme()

  return (
    <>
      <div className={`card ${theme === 'dark' ? 'dark' : ''}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          <a href={`/dentist/${props.data.matricula}`}>
            <h5 className={`card-title ${styles.title}`}>
              {`${props.data.nome} ${props.data.sobrenome}`}
            </h5>
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
