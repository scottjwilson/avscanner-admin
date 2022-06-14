import PhotoUpload from "@/components/PhotoUpload";
import useForm from "@/lib/useForm";
import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/supabase-auth-helpers/nextjs";
import { GetServerSideProps, NextPage } from "next";
import { Router, useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Person } from "types";

const MissingSlug = ({ person }: Person) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(person.photoUrl);

  const router = useRouter();

  // const { inputs, handleChange } = useForm({
  //   name: person.name,
  //   age: person.age,
  //   description: person.description,
  //   lastSeen: person.lastSeen,
  // });

  const [name, setName] = useState(person.name);
  const [age, setAge] = useState(person.age);
  const [description, setDescription] = useState(person.description);
  const [lastSeen, setLastSeen] = useState(person.lastSeen);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await supabaseClient
        .from("missing_persons")
        .update([
          {
            name: name,
            age: age,
            description: description,
            lastSeen: lastSeen,
            photoUrl: photoUrl,
          },
        ])
        .eq("id", person.id);
      if (data) {
        setLoading(false);
        toast.success("Successfully Updated");
        router.push("/missing");
      }
    } catch (error) {
      alert(error);
    }
  }

  async function handleDelete() {
    try {
      setDeleteLoading(true);
      const { data } = await supabaseClient
        .from("missing_persons")
        .delete()
        .eq("id", person.id);
      if (data) {
        setLoading(false);
        toast.success("Successfully Deleted");
        router.push("/missing");
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      {/* <pre>{JSON.stringify(person, null, 2)}</pre> */}

      <div className="max-w-md mx-auto  rounded-md p-8 bg-base-300">
        <h1 className="text-center text-xl">Edit missing person</h1>
        <form className="form-control" onSubmit={onSubmit}>
          <label htmlFor="name" className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            className="input input-primary"
            type="text"
            placeholder="Their Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="age" className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            className="input input-primary"
            type="text"
            placeholder="Age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label htmlFor="description" className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            className="input input-primary"
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="last seen" className="label">
            <span className="label-text">Last Seen</span>
          </label>
          <input
            className="input input-primary"
            type="text"
            placeholder="Last Seen"
            name="lastSeen"
            value={lastSeen}
            onChange={(e) => setLastSeen(e.target.value)}
          />

          <PhotoUpload
            url={photoUrl}
            size={150}
            onUpload={(url: SetStateAction<string>) => {
              setPhotoUrl(url);
              // updateProfile({ username, website, avatar_url: url });
            }}
          />

          <div className="mt-6 mb-2">
            <button
              type="submit"
              className={
                loading
                  ? "btn-primary btn btn-block loading"
                  : "btn-primary btn btn-block"
              }
            >
              Update
            </button>
          </div>
        </form>
        <div>
          <button
            onClick={handleDelete}
            className={
              deleteLoading
                ? "btn-error btn-outline btn btn-block loading"
                : "btn-error btn-outline btn btn-block"
            }
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;

  const { data: person, error } = await supabaseServerClient(ctx)
    .from("missing_persons")
    .select("*")
    .filter("id", "eq", params.id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return {
    props: {
      person: person,
    },
  };
};

export default MissingSlug;
