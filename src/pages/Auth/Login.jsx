import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "@/hooks/useAuth";

const initialData = {
  email: "",
  password: "",
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;

    setIsSubmitting(true);

    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate(-1);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setError("root", {
          message: errorMessage,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (user) return navigate(-1);
  }, [navigate, user]);

  return (
    <div className="grid min-h-screen place-items-center">
      <form
        className="mx-auto grid w-11/12 max-w-md bg-black/20 p-8 md:w-3/5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 text-2xl font-bold text-white md:mb-8 md:text-3xl">
          Sign In
        </h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="block w-full rounded-lg border border-[#808080b3] bg-[#161616b3] p-2.5 text-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="name@gmail.com"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="block w-full rounded-lg border border-[#808080b3] bg-[#161616b3] p-2.5 text-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
          {errors.root && (
            <span className="text-center text-sm text-red-500">
              {errors.root.message}
            </span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "cursor-wait" : "cursor-pointer"
          } rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-75`}
        >
          Login
        </button>
      </form>
    </div>
  );
}
