import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleDog() {
  const [dog, setDog] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchSingleDog = async () => {
      try {
        const response = await axios
          .get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
          .then((res) => res.data);
        setDog(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleDog();
  }, [name]);

  return (
    <>
      <section className="max-w-4xl mx-auto flex items-center justify-center h-screen ">
        {dog?.map((items) => {
          return (
            <div
              key={items.id}
              className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center"
            >
              <article>
                {
                  <img
                    src={`https://cdn2.thedogapi.com/images/${items.reference_image_id}.jpg`}
                    alt={items.name}
                  />
                }
              </article>
              <article>
                <h1 className="text-3xl font-bold text-white mb-8 lg:text-3xl">
                  {items.name}
                </h1>
                {items.description && (
                  <p className="text-slate-400 mb-4 text-xs lg:text-base leading-loose lg:leading-relaxed">
                    {items.description}
                  </p>
                )}
                <ul className="text-sm text-slate-400 leading-loose lg:text-base lg:leading-relaxed">
                  <li>
                    <span className="font-bold text-slate-200">
                      Breeds for:
                    </span>{" "}
                    {items.bred_for}
                  </li>
                  <li>
                    <span className="font-bold text-slate-200">Weight: </span>{" "}
                    {items.weight.metric} kg
                  </li>
                  <li>
                    <span className="font-bold text-slate-200">Height: </span>{" "}
                    {items.height.metric} cm
                  </li>
                  <li>
                    <span className="font-bold text-slate-200">
                      Breed Group:{" "}
                    </span>{" "}
                    {items.breed_group}
                  </li>
                  <li>
                    {" "}
                    <span className="font-bold text-slate-200">
                      Lifespan:{" "}
                    </span>{" "}
                    {items.life_span}
                  </li>
                  <li>
                    <span className="font-bold text-slate-200">
                      Temperament:{" "}
                    </span>{" "}
                    {items.temperament}
                  </li>
                  {items.origin ? <li>{items.origin}</li> : ""}
                  <Link
                    to="/"
                    className="inline-block bg-slate-600 py-2 px-6 rounded mt-8 text-white hover:bg-slate-500 transition-all duration-200"
                  >
                    &larr; Back
                  </Link>
                </ul>
              </article>
            </div>
          );
        })}
      </section>
    </>
  );
}
