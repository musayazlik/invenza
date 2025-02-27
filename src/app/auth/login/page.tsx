import { Metadata } from "next";
import FormCard from "./_components/form-card";

export const metadata: Metadata = {
  title: "Giriş",
  description: "Giriş yapın",
};

const Login = () => {
  return <FormCard />;
};

export default Login;
