import {useEffect, useState} from "react";
import Card from "../Components/Card";

const Home = () => {
  const [dentists, setDentists] = useState([])

  useEffect(() => {
    fetch(`https://dhodonto.ctdprojetos.com.br/dentista`).then(
      response => {
        // console.log(response)
        response.json().then(
          dentists => {
            // console.log(dentists)
            if(dentists === undefined) {

              console.log("Error!")

            } else {

              setDentists([...dentists])

            }
          }
        )
      }
    )

    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
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
