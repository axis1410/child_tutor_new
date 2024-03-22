import { useUser } from "@/context/UserContext";
import axios from "axios";

type UserProps = {
  id: string;
  email: string;
  fullName: string;
};

export const fetchUserDetails = async (accessToken: string) => {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL!}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userDetails: UserProps = response.data.data;

    console.log(userDetails);

    return userDetails;
  } catch (error) {
    console.log(error);
  }

  return;
};
