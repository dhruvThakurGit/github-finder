import { createContext, useReducer } from "react";
// import { useState } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const url = process.env.REACT_APP_GITHUB_URL;
const token = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubContextProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  async function searchUsers(name) {
    dispatch({
      type: "SET_LOADING",
    });

    const addr = url + "/search/users?q=" + name.replace(/ /g, "");
    const res = await fetch(addr, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const { items } = await res.json();

    // setUsers(json);
    // setLoading(false);

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  }

  async function getUser(login) {
    dispatch({
      type: "SET_LOADING",
    });

    const addr = url + "/users/" + login;
    const res = await fetch(addr, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const data = await res.json();

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  }

  function clearUsers() {
    dispatch({
      type: "CLEAR_USERS",
    });
  }

  async function getRepos(login) {
    const addr = url + "/users/" + login + "/repos?sort=created&per_page=15";
    const res = await fetch(addr, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const data = await res.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  }

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers: searchUsers,
        clearUsers: clearUsers,
        getUser: getUser,
        dispatch: dispatch,
        getRepos: getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
