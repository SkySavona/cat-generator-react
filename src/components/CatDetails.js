import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_KEY =
  "live_WvaKPbPOo4Y9aHM92jWUGKs9bW4oRA8IGvqNltcAKwxUpGBDlAWgYUcAjkaFqiDy";

function CatDetails() {
  const { id } = useParams();
  const [catDetails, setCatDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCatDetails() {
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/${id}`,
          {
            headers: { "x-api-key": API_KEY },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTimeout(() => {
          setCatDetails(data);
          setIsLoading(false);
        }, 4000);
      } catch (error) {
        console.error("Error fetching cat details:", error);
        setIsLoading(false);
      }
    }

    fetchCatDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-container-details">
        <div className="loading-cats">
          {[1, 5, 3, 6].map((num) => (
            <img
              key={num}
              src={`/assets/${num}.png`}
              alt={`Loading cat ${num}`}
              className={
                num === 5 || num === 6 ? "cat-icon white-image" : "cat-icon"
              }
            />
          ))}
        </div>
        <h2 className="loading-message-details h2-details">
          Loading adorable cats...
        </h2>
      </div>
    );
  }

  const breed = catDetails.breeds[0];

  return (
    <>
      <div className="cat-details">
        <h2 className="h2-details">{breed.name}</h2>
        <img
          className="generated-cat-grid-img"
          src={catDetails.url}
          alt={breed.name}
        />
        <h2 className="h2-details">
          <strong>Temperament:</strong> {breed.temperament}
        </h2>
        <h2 className="h2-details">
          <strong>Origin:</strong> {breed.origin}
        </h2>
        <h2 className="h2-details">
          <strong>Life Span:</strong> {breed.life_span} years
        </h2>
        <h2 className="h2-details">
          <strong>Weight:</strong> {breed.weight.metric} kg
        </h2>
        <h2 className="h2-details">
          <a
            href={breed.wikipedia_url}
            target="_blank"
            rel="noopener noreferrer"
            
          >
            Learn more on Wikipedia
          </a>
        </h2>
      </div>
    </>
  );
}

export default CatDetails;
