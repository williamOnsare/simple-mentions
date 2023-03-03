import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";

const App = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event, newValue, newPlainTextValue, mentions) => {
    setValue(newValue);
    const regex = /\B@([\w]+)\b/g;
    const mentionList = newPlainTextValue.match(regex) || [];
    const suggestions = mentionList.map((mention) => ({
      id: mention.slice(1),
      display: mention,
    }));
    setSuggestions(suggestions);
  };

  const handleSelect = (mention) => {
    setValue(value.replace(/@\w+/g, mention.display));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const regex = /\B@([\w]+)\b/g;
    const mentions = value.match(regex) || [];
    const text = value.replace(regex, "");
    console.log("Mentions:", mentions);
    console.log("Text:", text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <MentionsInput value={value} onChange={handleChange}>
        <Mention
          trigger="@"
          data={suggestions}
          onAdd={handleSelect}
          renderSuggestion={(suggestion) => <div>{suggestion.display}</div>}
        />
      </MentionsInput>
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
