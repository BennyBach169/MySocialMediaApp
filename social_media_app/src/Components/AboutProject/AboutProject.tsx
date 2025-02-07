import "./AboutProject.css";




export function AboutProject(): JSX.Element {
    return (
        <div className="AboutProject">
		 <div className="about-project-container">
      <h3 className="about-project-title">About My Social Media Project</h3>
      <p className="about-project-description">
        This project leverages a modern tech stack to build a scalable and efficient social media platform. Here's a breakdown of the technologies used:
      </p>
      <div className="tech-stack">
        <div className="tech-item">
          <h4>Frontend</h4>
          <ul>
            <li>React (Vite, React Router (SPA))</li>
            <li>Redux for state management</li>
            <li>MUI for icons</li>
            <li>CSS for styling</li>
          </ul>
        </div>
        <div className="tech-item">
          <h4>Backend</h4>
          <ul>
            <li>Spring Boot (Java, REST API)</li>
            <li>Custom session manger system</li>
            <li>JWT for authentication</li>
            <li>Work Flow: Entities{">"}Repostories{">"}Services{">"}Controllers</li>
          </ul>
        </div>
        <div className="tech-item">
          <h4>Database</h4>
          <ul>
            <li>MySQL for data management (developing stage)</li>
            <li>PostgreSQL for data management (produciton)</li>
          </ul>
        </div>
        <div className="tech-item">
          <h4>Deployment</h4>
          <ul>
            <li>Docker for containerization</li>
            <li>GitHub Actions for CI/CD</li>
          </ul>
        </div>
      </div>
    </div>
        </div>
    );
}
