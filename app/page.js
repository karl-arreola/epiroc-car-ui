import CarUI from "@/components/car-ui/CarUI";

export default async function Home() {
  let currentCar;
  const getCar = async() => {
    try {
      const resUser = await fetch(process.env.NEXT_PUBLIC_URL + "/api/car");

      const {car} = await resUser.json();

      currentCar = car;
    } catch (error) {
      console.log("Error while getting user: ", error);
    }
  }
  await getCar();

  if(currentCar) {
    return (
      <main>
        <CarUI data={currentCar}/>
      </main>
    );
  }
}
