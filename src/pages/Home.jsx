import React, { useEffect, useState } from "react";
// axios
import axios from "axios";
import ".././index.css";
import { Link } from "react-router-dom";

export default function Home() {
  // get Dogs to this state array
  const [dogs, setDogs] = useState([]);
  // get search text to this state string
  const [searchDog, setSearchDog] = useState("");

  // useEfect
  useEffect(() => {
    const handleDogsData = async () => {
      try {
        const response = await axios
          .get("https://api.thedogapi.com/v1/breeds")
          .then((res) => res.data);
        console.log(response);
        setDogs(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleDogsData();
  }, []);

  // search dogs
  const handleSearchDog = async (e) => {
    try {
      const response = await axios
        .get(`https://api.thedogapi.com/v1/breeds/search?q=${searchDog}`)
        .then((res) => res.data);
      setDogs(response);
    } catch (error) {
      console.log(error);
    }
  };
  // submit dog
  const handleSubmitDog = (e) => {
    e.preventDefault();
    handleSearchDog();
  };

  return (
    <>
      {!dogs ? (
        <h1 className="flex items-center justify-center text-white text-center h-screen px-5 text-3xl font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <>
          <section className="p-8 max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="flex items-center justify-center text-white  px-5 text-3xl font-bold uppercase">
                The Dog App
              </h2>
              <p className="my-2 text-white">
                This app is powered by
                <a
                  href="https://thedogapi.com"
                  className="text-indigo-600 underline active:text-orange-400 "
                >
                  Dog Api
                </a>
              </p>
              <form
                className="max-w-xl mx-auto"
                autoComplete="off"
                onSubmit={handleSubmitDog}
              >
                <input
                  type="text"
                  id="serch"
                  name="search"
                  placeholder="Search for a Dog or Breed"
                  className="py-2 px-4 rounded shadow w-full bg-slate-500 text-2xl text-white placeholder-white"
                  value={searchDog}
                  onChange={(e) => {
                    setSearchDog(e.target.value);
                  }}
                />
                <input type="submit" value="submit" />
              </form>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20">
              {!dogs
                ? dogs.map((dogsData) => {
                    return (
                      <Link
                        key={dogsData.id}
                        to={`/${dogsData.name}`}
                        className="bg-slate-700 p-4 rounded hover:bg-slate-500 transition-all duration-300 "
                      >
                        <article>
                          <img
                            src={dogsData.image.url}
                            alt={dogsData.name}
                            loading="lazy"
                            className="rounded md:h-72 w-full object-cover"
                          />
                          <h3 className="text-white text-lg font-bold mt-4">
                            {dogsData.name}
                          </h3>
                          <p className="text-slate-400">
                            Bread for: {dogsData.bred_for}
                          </p>
                        </article>
                      </Link>
                    );
                  })
                : dogs.map((dog) => {
                    return (
                      <Link
                        key={dog.id}
                        to={`/${dog.name}`}
                        className="bg-slate-700 p-4 rounded hover:bg-slate-500 transition-all duration-300 "
                      >
                        <article>
                          <img
                            src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                            alt={dog.name}
                            className="rounded md:h-72 w-full object-cover"
                          />
                          <h3 className="text-white text-lg font-bold mt-4">
                            {dog.name}
                          </h3>
                          <p className="text-slate-400">
                            Bread for: {dog.bred_for}
                          </p>
                        </article>
                      </Link>
                    );
                  })}
            </div>
          </section>
        </>
      )}
    </>
  );
}
