const init = {
  sort: "",
  type: "",
  order: "asc",
  search: "",
};
export default function Reducer(state = init, action) {
  switch (action.type) {
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    case "SET_ORDER":
      return { ...state, order: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    default:
      return state;
  }
}
