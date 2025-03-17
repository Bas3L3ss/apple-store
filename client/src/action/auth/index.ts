import { axios, makeAxiosRequest } from "@/src/lib/utils";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export async function sendVerificationEmail() {
  try {
    await makeAxiosRequest<{ url: string }>("post", "/auth/verify");
    toast.success("Verification Email Sent!", {
      description: "Please check your inbox to verify your email.",
    });
  } catch (err) {
    console.error("Error:", err);
    toast.error("Verification Failed", {
      description: "There was an issue processing your payment.",
    });
  }
}

export async function sendResetPasswordEmail(email: string) {
  try {
    await axios.post("/auth/send-reset-link", { email });

    toast.success("Reset password request sent!", {
      description:
        "Check your inbox and follow the instructions to reset your password.",
    });
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error("Reset request failed", {
        description: "Please fill in valid email",
      });
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
    throw error;
  }
}

export async function resetPassword(password: string, token?: string | null) {
  if (!token) {
    throw new Error("No token is found");
  }
  try {
    await axios.post(
      "/auth/reset-password",
      {
        password,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("Reset password sucess!", {
      description: "Proceeding to login page...",
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export const editUserProfile = async (data: {
  avatar?: string;
  username: string;
  email: string;
}) => {
  try {
    const response = await makeAxiosRequest("put", `/auth/account`, data);

    return response;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};
