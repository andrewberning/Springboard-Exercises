const Person = ({name, hobbies, age}) => {
  const voteText = age >= 18 ? "Go vote!" : "Go study!";

  const hobbiesLIs = hobbies.map(hobby => <li>{hobby}</li>);

  return (
    <div>
      <p>Learn some information about the person:</p>
      <ul>
        <li>Name: {name}</li>
        <li>Age: {age}</li>
        <ul>
          Hobbies: {hobbiesLIs}
        </ul>
      </ul>
      <h3>{voteText}</h3>
    </div>
  );
}