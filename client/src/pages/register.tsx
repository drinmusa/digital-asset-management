import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../utils/axios";
import FormInput from "../components/FormInput";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterInput = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const { name, email, password } = data;
      await api.post("/register", {
        name,
        email,
        password,
      });
      toast.success("Registration successful! Please log in.");
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error?.response?.data?.message || "Registration failed";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
        Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          label="Name"
          placeholder="Your name"
          error={errors.name?.message}
          register={register("name")}
        />
        <FormInput
          label="Email"
          placeholder="you@example.com"
          type="email"
          error={errors.email?.message}
          register={register("email")}
        />
        <FormInput
          label="Password"
          placeholder="Password"
          type="password"
          error={errors.password?.message}
          register={register("password")}
        />
        <FormInput
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
          register={register("confirmPassword")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-md transition"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
