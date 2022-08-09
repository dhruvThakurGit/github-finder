import React, { useState } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { useContext } from "react";

const UserSearch = () => {
  const [text, setText] = useState("");
  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      console.log("Helo");
      setAlert("Please enter something", "Error");
    } else {
      setText("");
      searchUsers(text);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 ">
      <div>
        <form onSubmit={handlesubmit}>
          <div className="form-control ">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-yellow-100 input input-lg text-black rounded-r-none"
                placeholder="Search"
                value={text}
                onChange={(e) => {
                  setText(e.currentTarget.value);
                }}
              />
              <button
                type="submit"
                className="absolute rounded-l-none w-40 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {users.length > 0 && (
          <button onClick={clearUsers} className="btn btn-ghost btn-lg ml-44">
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
