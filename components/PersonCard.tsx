import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Person } from "types";

const PersonCard = ({ person }: Person) => {
  const sburl =
    "https://vudbxrkcwwrwjoetsfzm.supabase.co/storage/v1/object/public/images/";

  const spanClass = `font-normal`;
  const pClass = `font-bold`;

  function badgeStatus(x: string) {
    if (x === "found") {
      return "badge badge-success uppercase";
    }
    if (x === "missing") {
      return "badge badge-warning uppercase";
    }
    if (x === "unknown") {
      return "badge badge-success uppercase";
    }
  }
  return (
    <article className="content">
      <div className="card-body">
        <p>
          Posted on: {format(new Date(person.created_at), "MM/dd/yy  h:mm a")}{" "}
        </p>
        <p>
          Went missing around:{" "}
          {format(new Date(person.dateMissing), "MM/dd/yy")}{" "}
        </p>
        <p>
          <span className={spanClass}>Status: </span>
          <span className={badgeStatus(person.status)}>{person.status}</span>
        </p>
        <h1>
          {" "}
          <span className={spanClass}>Name: </span>
          {person.name}
        </h1>
        <p className={pClass}>
          {" "}
          <span className={spanClass}>Age: </span>
          {person.age}
        </p>
        <p className={pClass}>
          <span className={spanClass}>Description: </span>
          {person.description}
        </p>
        <p className={pClass}>
          <span className={spanClass}>Last Seen: </span>
          {person.lastSeen}
        </p>

        {person.photoUrl && (
          <figure className="relative h-[20rem]">
            <Image
              layout="fill"
              objectFit="contain"
              src={`${sburl}/${person.photoUrl}`}
              className="rounded-md"
            />
          </figure>
        )}
        <div className="card-actions justify-end">
          <Link href={`/missing/${person.id}`}>
            <a className="btn btn-primary">Edit</a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PersonCard;
