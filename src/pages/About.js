function About() {
  return (
    <div className="text-center">
      <h1 className="text-6xl mb-4 text-center">Github Finder</h1>
      <p className="mb-4 text-2xl font-light">
        A React app to search GitHub profiles and see profile details.
      </p>

      <p className="text-lg text-yellow-200 mb-1">
        Version : <span className="text-yellow-600">1.0.0</span>
      </p>
      <p className="text-lg text-yellow-200">
        Made By : <pre className="inline"></pre>
        <a
          className="text-yellow-600 hover:text-yellow-400"
          href="https://github.com/dhruvThakurGit"
        >
          Dhruv Thakur
        </a>
      </p>
    </div>
  );
}

export default About;
