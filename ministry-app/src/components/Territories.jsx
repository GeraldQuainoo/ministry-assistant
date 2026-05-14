function Territories({ territories, dispatch }) {
  return (
    <div>
      {territories.map((territory) => (
        <div
          key={territory.id}
          className="territory"
          onClick={() =>
            dispatch({
              type: "setPosition",
              payload: territory.clickedPos,
            })
          }
        >
          <h3>{territory.name}</h3>
          <p className="textSmall">{territory.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Territories;
