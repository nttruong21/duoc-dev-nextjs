import { cookies } from "next/headers";
import envConfig from "@/configs/environment";
import ClientComponent from "./components/client-component";

interface SuccessResponse {
  data: {
    id: number;
    name: string;
    email: string;
  };
  message: string;
}

const Home = async () => {
  const cookieStore = cookies();

  const response = await fetch(
    `${envConfig.NEXT_PUBLIC_BASE_API_ENDPOINT}/account/me`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get("token")?.value}`,
      },
    }
  ).then((response) => response.json() as unknown as SuccessResponse);

  return (
    <div className="p-6">
      <div>Home</div>
      <div>Fetch data from server: {response.data.name}</div>
      <ClientComponent />
    </div>
  );
};

export default Home;
