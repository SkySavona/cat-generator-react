import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API_KEY = "live_WvaKPbPOo4Y9aHM92jWUGKs9bW4oRA8IGvqNltcAKwxUpGBDlAWgYUcAjkaFqiDy";

function Home() {
  const [breedList, setBreedList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [catImages, setCatImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const catSectionRef = useRef(null);

  useEffect(() => {
    fetchBreeds();
  }, []);

  async function fetchBreeds() {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/breeds", {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const breeds = await response.json();
      setBreedList(breeds);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  }

  async function generateCats() {
    setIsLoading(true);
    setCatImages([]);

    if (catSectionRef.current) {
      catSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 10);
    }

    try {
      const catData = await fetchCatImages(selectedBreed);

      setTimeout(() => {
        setCatImages(catData);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error in generateCats:", error);
      setIsLoading(false);
    }
  }

  async function fetchCatImages(breedId, limit = 6) {
    let url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&order=RANDOM`;

    if (breedId) {
      url += `&breed_ids=${breedId}`;
    }

    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  return (
    <div className="home">
      <main>
        <header>
          <h1>Cat Image Generator</h1>
          <h2>Pick a cat breed to generate your perfect feline friend!</h2>
        </header>

        <section className="generate__button--container">
          <select
            id="breed-select"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="">All Breeds</option>
            {breedList.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </select>
          <button onClick={generateCats}>Generate Cats</button>
        </section>

        <section className="home__image--container">
          <div>
            <img
              className="home__image"
              src="/assets/home_page_image.svg"
              alt=""
            />
          </div>
        </section>

        <section
          id="cat-images"
          className="generated-cats"
          ref={catSectionRef}
          style={{
            display: isLoading || catImages.length > 0 ? "block" : "none",
          }}
        >
          <h2 className="generated-cats-heading">Check out your cats!</h2>
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-cats">
                {[1, 2, 3, 4].map((num) => (
                  <img
                    key={num}
                    src={`/assets/${num}.png`}
                    alt={`Loading cat ${num}`}
                    className="cat-icon"
                  />
                ))}
              </div>
              <h2 className="loading-message">Loading adorable cats...</h2>
            </div>
          ) : (
            <div className="generated-cat-grid">
              {catImages.map((cat, index) => (
                <Link key={cat.id} to={`/cat/${cat.id}`}>
                  <img src={cat.url} alt={`Generated cat ${index + 1}`} />
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;