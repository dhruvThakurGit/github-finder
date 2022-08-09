import axios from "axios";
const url = process.env.REACT_APP_GITHUB_URL;
const token = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: url,
  headers: { Authorization: `token ${token}` },
});

export async function searchUsers(name) {
  const addr = url + "/search/users?q=" + name.replace(/ /g, "");
  const res = await fetch(addr, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const { items } = await res.json();

  return items;
}

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
