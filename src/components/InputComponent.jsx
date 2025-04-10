import { useState, useEffect } from "react";

export default function InputComponent() {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState({});

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
  const url =
    "https://jlipiyayfklx2xvckt577hvn5i0phffc.lambda-url.eu-central-1.on.aws";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${url}?q=${encodeURIComponent(userInput)}` //had an error here took some time to fix. GPT wasnt helpful its q not querry
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
  }, [userInput]);

  return (
    <div>
      <input type="text" value={userInput} onChange={handleChange} />

      {userInput && data?.results?.length > 0 && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
      {userInput && data?.results?.length === 0 && <div>Nothing found</div>}
    </div>
  );
}
