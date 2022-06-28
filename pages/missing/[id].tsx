import PhotoUpload from "@/components/PhotoUpload";
import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/supabase-auth-helpers/nextjs";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { Person } from "types";

const MissingSlug = ({ person }: Person) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(person.photoUrl);
  const [name, setName] = useState(person.name);
  const [age, setAge] = useState(person.age);
  const [description, setDescription] = useState(person.description);
  const [lastSeen, setLastSeen] = useState(person.lastSeen);
  const [dateMissing, setDateMissing] = useState(person.dateMissing);
  const [status, setStatus] = useState(person.status);

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
            status: status,
            dateMissing: dateMissing,
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

  function handleChange(e: FormEvent<HTMLSelectElement>) {
    const target = e.target as HTMLSelectElement;
    setStatus(target.value);
  }

  const inputClass = `input input-bordered`;

  return (
    <>
      <NextSeo
        title="AVSN Missing Persons"
        description="AV Scanner News Missing Persons in the Antelope Valley. Palmdale, Lancaster, Quartz Hill"
      />

      <section>
        <h1 className="text-center my-4">Edit missing person</h1>
        <div className="max-w-md mx-auto px-4 mb-4">
          <div className="rounded-md p-4 bg-base-300">
            <form className="form-control " onSubmit={onSubmit}>
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                className={inputClass}
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
                className={inputClass}
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
                className={inputClass}
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
                className={inputClass}
                type="text"
                placeholder="Last Seen"
                name="lastSeen"
                value={lastSeen}
                onChange={(e) => setLastSeen(e.target.value)}
              />

              <label htmlFor="date missing" className="label">
                <span className="label-text">Approximate Date Missing</span>
              </label>
              <input
                className={inputClass}
                type="date"
                placeholder="Last Seen"
                name="dateMissing"
                value={dateMissing}
                onChange={(e) => setDateMissing(e.target.value)}
              />
              <label htmlFor="status" className="label">
                <span className="label-text">Status</span>
              </label>

              <select
                onChange={handleChange}
                value={status}
                className="select font-brand"
              >
                <option className="font-brand" value="missing">
                  missing
                </option>
                <option value="found">found</option>
                <option value="unknown">unknown</option>
              </select>

              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
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
        </div>
      </section>
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
