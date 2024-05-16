import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "@/hooks/useAuth";
import { avatar as defaultAvatar } from "@/assets/images";

const schema = z.object({
  email: z.string().email(),
  displayName: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  photoURL: z.string().url({
    message: "Avatar image must be valid image URL",
  }),
});

export default function Profile() {
  const { user, updateUserDetails } = useAuth();
  const initialData = {
    email: user?.email,
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  };

  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialData, resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    setSubmitting(true);

    updateUserDetails(data)
      .then(() => {
        console.log("user updated!");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setEditMode(false);
        setSubmitting(false);
      });
  };

  const cancelEdit = (event) => {
    event.preventDefault();

    reset();
    setEditMode(false);
  };

  return (
    <div className="grid min-h-screen place-items-center max-sm:pt-20">
      <form className="w-11/12 max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="w-full border-b border-b-white/20 pb-4 text-4xl font-medium text-white md:text-5xl">
            Edit Profile
          </legend>
          <div className="my-6 flex gap-4 border-b border-b-white/20 pb-4 max-sm:flex-col max-sm:items-center">
            <div className="relative flex-[0.3]">
              <img
                className="aspect-square w-full object-cover object-center max-md:max-w-[10rem]"
                src={user?.photoURL || defaultAvatar}
                alt=""
              />
            </div>
            <div className="grid flex-1 items-start gap-4 max-sm:w-full">
              <div className="grid gap-1">
                <input
                  type="text"
                  name="displayName"
                  id="displayName"
                  disabled={!editMode}
                  {...register("displayName")}
                  placeholder="Username"
                  className="p-2 text-black disabled:text-white"
                />
                {errors.displayName && (
                  <span className="text-sm text-red-500">
                    {errors.displayName.message}
                  </span>
                )}
              </div>
              <div className="grid gap-1">
                <input
                  type="text"
                  name="email"
                  id="email"
                  disabled={true}
                  value={user.email}
                  className="p-2 text-black disabled:text-white"
                />
              </div>
              <div className="grid gap-1">
                <input
                  type="text"
                  name="photoURL"
                  id="photoURL"
                  disabled={!editMode}
                  {...register("photoURL")}
                  placeholder="Avatar URL"
                  className="p-2 text-black disabled:text-white"
                />
                {errors.photoURL && (
                  <span className="text-sm text-red-500">
                    {errors.photoURL.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {editMode ? (
              <>
                <button
                  disabled={submitting}
                  className={`border border-white bg-white p-[0.25em_1.5em] font-medium text-black disabled:opacity-75 ${
                    submitting ? "cursor-wait" : "cursor-pointer"
                  }`}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="border border-white bg-transparent p-[0.25em_1.5em] font-medium text-white"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setEditMode(true);
                }}
                className="border border-white bg-white p-[0.25em_1.5em] font-medium text-black"
              >
                Edit
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
}
