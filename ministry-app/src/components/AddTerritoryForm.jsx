import { useReducer } from "react";

function AddTerritoryForm({ dispatch, clickedPos }) {
  const initialState = {
    name: "",
    description: "",
    openAddTerritoryForm: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload };
      case "description":
        return { ...state, description: action.payload };
      case "reset":
        return { ...initialState };
      case "set":
        return { ...action.payload };
    }
  }
  const [state, setState] = useReducer(reducer, initialState);
  const { name, description } = state;

  function handleAddterritory(e) {
    e.preventDefault();
    dispatch({
      type: "addTerritory",
      payload: {
        name,
        description,
        id: new Date().getTime(),
        clickedPos,
      },
    });
  }

  return (
    <div
      className="modal-overlay addTerritory"
      onClick={() => dispatch({ type: "closeTerritoryForm" })}
    >
      <form
        className="modal-content territoryForm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Add New Territory</h3>
        <div className="formGroup">
          <label htmlFor="name">Territory Name:</label>
          <input
            value={name}
            onChange={(e) =>
              setState({ type: "name", payload: e.target.value })
            }
            type="text"
            id="name"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description:</label>
          <input
            value={description}
            onChange={(e) =>
              setState({ type: "description", payload: e.target.value })
            }
            type="text"
            id="description"
            required
          />
        </div>

        <div className="formActions">
          <button
            onClick={(e) => handleAddterritory(e)}
            type="submit"
            className="btn btn--primary"
          >
            Add Territory
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onSubmit={() => dispatch({ type: "closeTerritoryForm" })}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTerritoryForm;
