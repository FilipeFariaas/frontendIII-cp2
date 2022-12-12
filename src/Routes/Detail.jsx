import DetailCard from "../Components/DetailCard";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Detail = () => {
  let { id } = useParams()

  // const [dentist, setDentist] = useState({})

  // useEffect(() => {
    // fetch(`https://dhodonto.ctdprojetos.com.br/dentista?matricula=${id}`).then(
    //   response => {
    //     // console.log(response)
    //     response.json().then(
    //       dentist => {
    //         // console.log(dentist)
    //         if(dentist === undefined) {
    //
    //           console.log("Error!")
    //
    //         } else {
    //           setDentist(dentist)
    //         }
    //       }
    //     )
    //   }
    // )

    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
  // }, []);

  // console.log(dentist)

  return (
    <>
      <DetailCard
        id={id}
      />
    </>
  )
}

export default Detail