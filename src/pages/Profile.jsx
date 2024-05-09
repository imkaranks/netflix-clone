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
    <div className="min-h-screen grid place-items-center max-sm:pt-20">
      <form className="w-11/12 max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="w-full text-4xl md:text-5xl text-white font-medium pb-4 border-b border-b-white/20">
            Edit Profile
          </legend>
          <div className="my-6 flex max-sm:flex-col max-sm:items-center gap-4 pb-4 border-b border-b-white/20">
            <div className="flex-[0.3] relative">
              <img
                className="w-full max-md:max-w-[10rem] aspect-square object-cover object-center"
                src={user?.photoURL || defaultAvatar}
                alt=""
              />
            </div>
            <div className="flex-1 max-sm:w-full grid gap-4 items-start">
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
                  className={`border border-white disabled:opacity-75 bg-white text-black p-[0.25em_1.5em] font-medium ${
                    submitting ? "cursor-wait" : "cursor-pointer"
                  }`}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="border border-white bg-transparent text-white p-[0.25em_1.5em] font-medium"
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
                className="border border-white bg-white text-black p-[0.25em_1.5em] font-medium"
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
