import CarUI from "@/components/car-ui/CarUI";
import { headers } from 'next/headers';

export default async function Home() {
  let currentCar;
  let currentCarInitiated = false;
  const headersList = headers();

  const getCar = async() => {
    try {
      const resCar = await fetch(process.env.NEXT_PUBLIC_URL + "/api/car");

      const {car} = await resCar.json();

      if(car) {
        currentCar = car;
        currentCarInitiated = true;
      }
    } catch (error) {
      console.log("Error while getting car: ", error);
    }
  }
  await getCar();

  if(currentCarInitiated) {
    return (
      <main>
        <CarUI data={currentCar}/>
      </main>
    );
  }
}
