import React from "react";
import { useState, useEffect } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import {useTheme} from "../hooks/useTheme";

const DetailCard = (props) => {
  const {theme} = useTheme()
  const [dentist, setDentist] = useState({})

  useEffect(() => {
    fetch(`https://dhodonto.ctdprojetos.com.br/dentista?matricula=${props.id}`).then(
      response => {
        response.json().then(
          dentist => {
            if(dentist === undefined) {

              console.log("Error!")

            } else {
              setDentist(dentist)
            }
          }
        )
      }
    )

  }, []);

  return (
    <>
      <h1>Detail about Dentist {`${dentist.nome}`} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        <div
          className={`card-body row ${theme}`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {`${dentist.nome}`}</li>
              <li className="list-group-item">
                Sobrenome: {`${dentist.sobrenome}`}
              </li>
              <li className="list-group-item">
                Matrícula: {`${dentist.matricula}`}
              </li>
            </ul>
            <div className="text-center">
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${theme} ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
