import { cookies } from "next/headers";

import accountServices from "@/services/account";

import ClientComponent from "./components/client-component";

const Profile = async () => {
  const cookieStore = cookies();

  const response = await accountServices.getProfile(
    cookieStore.get("token")?.value
  );

  return (
    <div className="p-6">
      <div>Fetch data from server: {response.data.name}</div>
      <ClientComponent />
    </div>
  );
};

export default Profile;
