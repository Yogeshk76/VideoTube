import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser, resetError } from "@/features/authSlice";
import type { RegisterInput } from "@/types/auth.types";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Container from "@/components/uiComponents/Container";
import Button from "@/components/uiComponents/Button";
import Input from "@/components/uiComponents/Input";

function Signup() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const signup = async (data: RegisterInput) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      // handled in the authSlice
    }
  };

  return (
    <div>
      <Container>
        <div className="w-full max-w-md bg-gray-900 border border-gray-700 p-8 rounded-lg">
          <h2 className="mb-6 text-center text-2xl font-semibold uppercase text-white">Sign Up</h2>

          {/* Global Error */}
          {error && (
            <div className="mb-4 text-center text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(signup)} noValidate>
            <label htmlFor="email" className="mb-1 inline-block text-gray-300">
              Email*
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mb-4"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mb-4">{errors.email.message}</p>
            )}

            <label htmlFor="fullName" className="mb-1 inline-block text-gray-300">
              FullName*
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your fullname"
              className="mb-4"
              {...register("fullName", {
                required: "Fullname is required",
              })}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mb-4">{errors.fullName.message}</p>
            )}

            <label htmlFor="username" className="mb-1 inline-block text-gray-300">
              Username*
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="mb-4"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="text-sm text-red-500 mb-4">{errors.username.message}</p>
            )}

            <label htmlFor="avatar" className="mb-1 inline-block text-gray-300">
              Avatar*
            </label>
            <Input
              id="avatar"
              type="text"
              placeholder="avatar URL or upload file"
              className="mb-4"
              {...register("avatar", {
                required: "Avatar is required",
              })}
            />
            {errors.avatar && (
              <p className="text-sm text-red-500 mb-4">{errors.avatar.message}</p>
            )}

            <label htmlFor="coverImage" className="mb-1 inline-block text-gray-300">
              Cover Image*
            </label>
            <Input
              id="coverImage"
              type="text"
              placeholder="cover image URL or upload file"
              className="mb-4"
              {...register("coverImage", {
                required: "Cover image is required",
              })}
            />
            {errors.coverImage && (
              <p className="text-sm text-red-500 mb-4">{errors.coverImage.message}</p>
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Signup
