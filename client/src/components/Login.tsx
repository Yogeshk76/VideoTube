import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, resetError } from "@/features/authSlice";
import type { LoginInput } from "@/types/auth.types";
import { useNavigate, useLocation} from "react-router-dom";
import { useEffect } from "react";
import  Container  from "@/components/uiComponents/Container";
import Button from "@/components/uiComponents/Button";
import Input from "@/components/uiComponents/Input"


function Login() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {loading , error} = useAppSelector((state) => state.auth);
  const {register, handleSubmit, formState: { errors }} = useForm<LoginInput>();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const login = async (data: LoginInput) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      // handled in the authSlice
    }
  };

  return (
    <Container>
       <div className="w-full max-w-md bg-gray-900 border border-gray-700 p-8 rounded-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold uppercase text-white">Play</h2>

        {/* Global Error */}
        {error && (
          <div className="mb-4 text-center text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(login)} noValidate>
          <label htmlFor="email" className="mb-1 inline-block text-gray-300">
            Email or Username*
          </label>
          <Input
            id="email"
            type="text"
            placeholder="Enter email or username"
            className="mb-4"
            {...register("email", {
              required: "Email or username is required",
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mb-4">{errors.email.message}</p>
          )}

          <label htmlFor="password" className="mb-1 inline-block text-gray-300">
            Password*
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="mb-6"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mb-4">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#ae7aff] text-black py-3"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in with Email/Username"}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;