import { useContext, useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import {useNavigate} from "react-router-dom";

const ScheduleForm = () => {
  const [dentists, setDentists] = useState([])
  const [patients, setPatients] = useState([])

  const [dentistId, setDentistId] = useState("")
  const [patientId, setPatientId] = useState("")

  const [date, setDate] = useState([])
  const [token, setToken] = useState("")
  const navigate = useNavigate()

  function getDentists() {
    return fetch(`https://dhodonto.ctdprojetos.com.br/dentista`).then(
      response => {
        // console.log(response)
        response.json().then(
          dentists => {
            // console.log(dentists)
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
        // console.log(response)
        response.json().then(
          patients => {
            // console.log(dentists)
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


    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
  }, []);

  // console.log(dentists)
  // console.log(patients)

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem-sucedido ou ocorreu um erro
    event.preventDefault()


    // const requestOptions = {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     "username": username,
    //     "password": password
    //   })
    // };

    if (token === "" || token === null) {

      alert("Usuário não autorizado.");
      window.location.href = "http://localhost:3000/login"

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

              setTimeout(() => window.location.href = "http://localhost:3000/home", 2000);
              // setTimeout(() => navigate('/home'), 4000);
              // navigate('/home')
            })
            .catch((e) => {
              alert("Erro ao enviar a requisição.");
            });
        }
      );
      // navigate('/home')
    }

  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
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
                {/*Aqui deve ser feito um map para listar todos os dentistas*/
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
                {/*Aqui deve ser feito um map para listar todos os pacientes*/
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
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
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
