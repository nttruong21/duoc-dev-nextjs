import { cookies } from "next/headers";

import accountServices from "@/services/account";

import ProfileForm from "./components/profile-form";

const Profile = async () => {
  const cookieStore = cookies();

  const response = await accountServices.getProfile(
    cookieStore.get("token")?.value
  );

  return (
    <div className="space-y-4">
      <div>Fetch data from server: {response.name}</div>
      <ProfileForm name={response.name} />
    </div>
  );
};

export default Profile;
