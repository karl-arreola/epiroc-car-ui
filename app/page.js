import CarUI from "@/components/car-ui/CarUI";

export default async function Home() {

  const getCar = async() => {
    try {
      const resUser = await fetch(process.env.NEXT_PUBLIC_URL + "/api/car");

      const {car} = await resUser.json();

      return car;
    } catch (error) {
      console.log("Error while getting user: ", error);
    }
  }
  const car = await getCar();

  return (
    <main>
      <CarUI data={car}/>
    </main>
  );
}
