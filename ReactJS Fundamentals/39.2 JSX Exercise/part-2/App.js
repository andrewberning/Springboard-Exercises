const App = () => {
  return (
    <div>
      <Tweet name="tname1" username="thandle1" data={new Date().toDateString()} message="Test Message 1" />
      <Tweet name="tname2" username="thandle2" data={new Date().toDateString()} message="Test Message 2" />
      <Tweet name="tname3" username="thandle3" data={new Date().toDateString()} message="Test Message 3" />
    </div>
  );
};