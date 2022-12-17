import {useEffect, useState} from "react";
import Card from "../Components/Card";

const Home = () => {
  const [dentists, setDentists] = useState([])

  useEffect(() => {
    fetch(`https://dhodonto.ctdprojetos.com.br/dentista`).then(
      response => {
        response.json().then(
          dentists => {
            if(dentists === undefined) {

              console.log("Error!")

            } else {

              setDentists([...dentists])

            }
          }
        )
      }
    )
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {
          dentists.map(
            dentist => (
              <Card
                key={dentist.matricula}
                data={dentist}
              />
            )
          )
        }
      </div>
    </>
  );
};

export default Home;
