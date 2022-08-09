import React from "react";
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from "react-icons/fa";

const RepoItem = ({ repo }) => {
  return (
    <div className="mb-2 rounded-md card bg-base-200 hover:bg-base-300">
      <div className="card-body">
        <h3 className="mb-2 text-xl font-semibold">
          <a href={repo.html_url}>
            <FaLink className="inline mr-1" /> {repo.name}
          </a>
        </h3>
        <p className="mb-3">{repo.description}</p>
        <div>
          <div className="mr-2 badge badge-info badge-lg">
            <FaEye className="mr-2" /> {repo.watchers_count}
          </div>
          <div className="mr-2 badge badge-success badge-lg">
            <FaStar className="mr-2" /> {repo.stargazers_count}
          </div>
          <div className="mr-2 badge badge-error badge-lg">
            <FaInfo className="mr-2" /> {repo.open_issues}
          </div>
          <div className="mr-2 badge badge-warning badge-lg">
            <FaUtensils className="mr-2" /> {repo.forks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
