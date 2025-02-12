import { Suspense } from "react";
import UpdatePassword from "./_components/UpdatePassword";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <UpdatePassword />
    </Suspense>
  );
}
