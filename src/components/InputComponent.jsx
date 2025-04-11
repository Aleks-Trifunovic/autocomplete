import { useState, useEffect } from "react";

export default function InputComponent() {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState({});
  const [selectedContact, setSelectedContact] = useState(undefined);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleDropdownContactClicked = (person) => {
    setSelectedContact(person);
    setData({});
    setUserInput("");
  };
  const url =
    "https://jlipiyayfklx2xvckt577hvn5i0phffc.lambda-url.eu-central-1.on.aws";

  useEffect(() => {
    const debounce = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${url}?q=${encodeURIComponent(userInput)}`
          );
          if (!response.ok) throw new Error("Something went wrong");
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      if (userInput) {
        fetchData();
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [userInput]);

  return (
    <div className="mainContainer">
      <div className="searchContainer">
        <input
          className="inputField"
          type="text"
          value={userInput}
          onChange={handleChange}
        />
        <div className="dropdown">
          {userInput && data?.results?.length > 0 && (
            <div className="personContainer">
              {data.results.map((person, index) => {
                return (
                  <div
                    onClick={() => handleDropdownContactClicked(person)}
                    className="person"
                    key={index}
                  >
                    <div className="imageContainer">
                      <img
                        className="personImage"
                        src={person.avatar}
                        alt="image of a person"
                      />
                    </div>
                    <div className="personInfo">
                      <p>{person.name}</p>
                      <p>{person.email}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {userInput && data?.results?.length === 0 && <div>Nothing found</div>}
          {/* {userInput && data && data.results && data.results.length === 0 && (
          <div>Nothing found</div>
        )} */}
          {/* above line is the same as the line 66 but without ?. it is a shorthand method */}
        </div>
        {/* add more in line below */}
      </div>
      <div className="selectedContact">{selectedContact?.name}</div>
    </div>
  );
}
