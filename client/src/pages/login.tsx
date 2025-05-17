import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const onSubmit = async (data: LoginFormValues) => {
    const { email, password } = data;
    try {
      const response = await api.post("/login", { email, password });
      const { token, role } = response.data;

      if (token && role) {
        login(token, role);
        toast.success("Logged in successfully!");
        navigate("/dashboard"); // or your desired route
      } else {
        toast.error(response.data.statusMessage);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // If backend sends specific error object as in your example
      const message =
        error?.response?.data?.statusMessage ||
        "Login failed. Please check your credentials.";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-6 bg-card shadow-lg rounded-lg border border-border">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            error={errors.email?.message}
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <FormInput
            label="Password"
            placeholder="••••••••"
            type="password"
            error={errors.password?.message}
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="submit"
            className="w-full mt-4 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
