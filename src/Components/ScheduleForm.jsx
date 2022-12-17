import { useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";

const ScheduleForm = () => {
  const [dentists, setDentists] = useState([])
  const [patients, setPatients] = useState([])

  const [dentistId, setDentistId] = useState("")
  const [patientId, setPatientId] = useState("")

  const [date, setDate] = useState([])
  const [token, setToken] = useState("")

  function getDentists() {
    return fetch(`https://dhodonto.ctdprojetos.com.br/dentista`).then(
      response => {
        response.json().then(
          dentists => {
            if(dentists === undefined) {

              console.log("Error!")

            } else {

              dentists > 1 ? setDentists([...dentists]) : setDentists(dentists)

            }
          }
        )
      }
    )
  }

  function getPatients() {
    return fetch(`https://dhodonto.ctdprojetos.com.br/paciente`).then(
      response => {
        response.json().then(
          patients => {
            if(patients === undefined) {

              console.log("Error!")

            } else {

              patients > 1 ? setPatients([...patients.body]) : setPatients(patients.body)

            }
          }
        )
      }
    )
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))

    getDentists()
    getPatients()

  }, []);


  const handleSubmit = (event) => {

    event.preventDefault()

    if (token === "" || token === null) {

      alert("Usuário não autorizado.");
      window.location.href = "/login"

    } else if (patientId === "" || dentistId === "" || date === "") {

      alert("Um ou mais campos não preenchidos.");

    } else {

      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paciente: {
            matricula: `${patientId}`,
          },
          dentista: {
            matricula: `${dentistId}`,
          },
          dataHoraAgendamento: `${date}`,
        }),
      };

      fetch("https://dhodonto.ctdprojetos.com.br/consulta", requestConfig).then(
        response => {
          response
            .json()
            .then((data) => {
              console.log(data);

              alert("Consulta marcada com sucesso! Você será redirecionado para a Home.");

              setTimeout(() => window.location.href = "/home", 2000);
            })
            .catch((e) => {
              alert("Erro ao enviar a requisição.");
            });
        }
      );
    }
  };

  return (
    <>
      <div
        className={`text-center container}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select
                className="form-select"
                name="dentist"
                id="dentist"
                onChange={e => setDentistId(e.target.value)}
              >
                <option>-- select --</option>
                {
                dentists.map(dentist => (
                  <option key={dentist.matricula} value={dentist.matricula}>
                    {`${dentist.nome} ${dentist.sobrenome}`}
                  </option>
                ))
                }
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select
                className="form-select"
                name="patient"
                id="patient"
                onChange={e => setPatientId(e.target.value)}
              >
                <option>-- select --</option>
                {
                patients.map(patient => (
                <option key={patient.matricula} value={patient.matricula}>
                  {`${patient.nome} ${patient.sobrenome}`}
                </option>
                ))
                }
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <button
              className={`btn btn-light ${styles.button
                }`}
              type="submit"
              onClick={handleSubmit}
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
