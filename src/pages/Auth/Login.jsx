import { useEffect } from "react";
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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;

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
      });
  };

  useEffect(() => {
    if (user) return navigate(-1);
  }, [navigate, user]);

  return (
    <div className="min-h-screen grid place-items-center">
      <form
        className="bg-black/20 p-8 grid w-11/12 md:w-3/5 max-w-md mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-5 md:mb-8">
          Sign In
        </h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="text"
            id="email"
            {...register("email")}
            className="shadow-sm bg-[#161616b3] border border-[#808080b3] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@gmail.com"
            required
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="shadow-sm bg-[#161616b3] border border-[#808080b3] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
          {errors.root && (
            <span className="text-sm text-center text-red-500">
              {errors.root.message}
            </span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "cursor-wait" : "cursor-pointer"
          } disabled:opacity-75 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
        >
          Login
        </button>
      </form>
    </div>
  );
}
