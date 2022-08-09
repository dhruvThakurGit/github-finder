import React, { useState } from "react";
import { useEffect, useContext } from "react";
import GithubContext from "../context/github/GithubContext";
import { useParams } from "react-router-dom";
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import RepoList from "../components/repos/RepoList";

const url = process.env.REACT_APP_GITHUB_URL;
const token = process.env.REACT_APP_GITHUB_TOKEN;

const User = () => {
  const { loginName } = useParams();
  const { getUser, user, loading, getRepos, repos, dispatch } =
    useContext(GithubContext);

  const [userData, setUserData] = useState([]);
  const [userRepos, setUserRepos] = useState([]);

  useEffect(() => {
    async function getUserData(login) {
      const addr = url + "/users/" + login;
      const res = await fetch(addr, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await res.json();
      setUserData(data);
    }

    async function getUserRepos(login) {
      const addr = url + "/users/" + login + "/repos?sort=created&per_page=15";
      const res = await fetch(addr, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await res.json();
      setUserRepos(data);
    }
    getUserData(loginName);
    getUserRepos(loginName);

    // dispatch({ type: "SET_LOADING" });
    // getUser(loginName);
    // getRepos(loginName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <>Loading...</>;
  } else
    return (
      <>
        <div className="w-full mx-auto lg:w-10/12">
          <div className="mg-4">
            <Link to="/" className="btn btn-ghost">
              Back to search
            </Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
            <div className="custom-card-image mb-6 md:mb-0">
              <div className="rounded-lg shadow-xl card image-full">
                <figure>
                  <img src={userData.avatar_url} alt="" />
                </figure>
                <div className="card-body justify-end">
                  <h2 className="card-title mb-0">{userData.name}</h2>
                  <p className="flex-grow-0">{userData.login}</p>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl card-title">
                  {userData.name}
                  <div className="ml-2 mr-1 badge badge-success">
                    {userData.type}
                  </div>
                  {userData.hireable && (
                    <div className="mx-1 badge badge-info">Hireable</div>
                  )}
                </h1>
                <p>{userData.bio}</p>
                <div className="mt-4 card-actions">
                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    Visit Github Profile
                  </a>
                </div>
              </div>

              <div className="w-full rounded-lg shadow-md bg-base-100 stats">
                {userData.location && (
                  <div className="stat">
                    <div className="stat-title text-md">Location</div>
                    <div className="text-lg stat-value">
                      {userData.location}
                    </div>
                  </div>
                )}

                {userData.blog && (
                  <div className="stat">
                    <div className="stat-title text-md">Website</div>
                    <div className="text-lg stat-value">
                      <a
                        href={`https://${userData.blog}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {userData.blog}
                      </a>
                    </div>
                  </div>
                )}

                {userData.twitter_username && (
                  <div className="stat">
                    <div className="stat-title text-md">Twitter</div>
                    <div className="text-lg stat-value">
                      <a
                        href={`https://twitter.com/${userData.twitter_username}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {userData.twitter_username}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaUsers className="text-3xl md:text-5xl" />
                </div>
                <div className="stat-title pr-5">Followers</div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">
                  {userData.followers}
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaUserFriends className="text-3xl md:text-5xl" />
                </div>
                <div className="stat-title pr-5">Following</div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">
                  {userData.following}
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaCodepen className="text-3xl md:text-5xl" />
                </div>
                <div className="stat-title pr-5">Public Repos</div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">
                  {userData.public_repos}
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaStore className="text-3xl md:text-5xl" />
                </div>
                <div className="stat-title pr-5">Public Gists</div>
                <div className="stat-value pr-5 text-3xl md:text-4xl">
                  {userData.public_gists}
                </div>
              </div>
            </div>
          </div>

          <RepoList repos={userRepos} />
        </div>
      </>
    );
};

export default User;
