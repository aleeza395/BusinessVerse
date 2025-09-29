import { useState } from "react";
import Searched from "./Searched";
import axios from "axios";
import "../App.css";

const Home = () => {
  const [idea, setIdea] = useState("");
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState([]);

  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      if (!selected) {
        console.log("Please select a category first");
        return;
      }
      try {
        console.log("Idea:", idea);
        const response = await axios.post(
          `http://localhost:5000/api/${selected}`,
          { idea }
        );
        setResults(response.data);
        console.log("Response:", response.data);
      } catch (err) {
        console.log("Error : ", err);
      }
    }
  };

  return (
    <div className="home-container">
      <section id="section1">
        <div className="background">
          <h1>Welcome to BusinessVerse</h1>
          <p>
            Just type the idea you got to get all the information you need about
            it.
          </p>
        </div>

        <div className="fields">
          <select
            name="category"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="dropdown"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="consumer_goods">Consumer goods & Retail</option>
            <option value="business_and_services">Business and Services</option>
            <option value="technology_and_innovation">
              Technology and Innovation
            </option>
            <option value="lifestyle_and_social_impact">
              Lifestyle and Social Impact
            </option>
            <option value="mobility_and_infrastructure">
              Mobility and Infrastructure
            </option>
            <option value="creative_and_media">Creative and Media</option>
          </select>

          <input
            id="idea"
            name="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Type your idea here..."
          />
        </div>
      </section>

      <section className="searched-part">
        {results && <Searched data={results} />}
      </section>
    </div>
  );
};

export default Home;
