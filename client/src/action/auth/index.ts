import { makeAxiosRequest } from "@/src/lib/utils";
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
