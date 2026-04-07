# Java Full Stack Portfolio

A personal portfolio built with React, Spring Boot, and Maven. Features an about me section, animated tech stack tree, interactive project carousel, and a contact form backed by a REST API. Deployed on AWS with Docker and tested with Playwright.

---

## Live Demo

[portfolio-env.eba-bxgwg228.us-east-1.elasticbeanstalk.com](http://portfolio-env.eba-bxgwg228.us-east-1.elasticbeanstalk.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Java, Spring Boot, Maven |
| Database | PostgreSQL (H2 locally) |
| Containerization | Docker, Docker Compose |
| Cloud | AWS Elastic Beanstalk, ECR, RDS |
| Testing | Playwright |
| Version Control | Git — phase-based branching |

---

## Project Structure

```
Portfolio/
├── portfolio-backend/        # Spring Boot REST API
│   ├── src/
│   │   └── main/
│   │       ├── java/         # Controllers, Services, Models, Repositories
│   │       └── resources/    # application.properties.example
│   └── Dockerfile
├── portfolio-frontend/       # React + Vite
│   ├── src/
│   │   └── components/       # Navbar, About, TechStack, Projects, Contact
│   ├── tests/                # Playwright e2e tests
│   └── Dockerfile
├── docs/
│   └── devlog/               # Dated dev log entries per phase
├── docker-compose.example.yml
└── nginx.conf
```

---

## Features

**About** — Personal summary, goals, and resume download link.

**Tech Stack** — Left-to-right animated tree visualization grouping skills by developer role. Each role branch animates in on scroll using the Intersection Observer API with staggered skill reveals.

**Projects** — Interactive carousel with hover preview support. Selecting a project reveals a details panel with description, tech stack tags, challenges, code snippet, and GitHub link.

**Contact** — Form with client-side email validation and live word counter, wired to a Spring Boot REST API that persists submissions to PostgreSQL. Includes LinkedIn, GitHub, and email social links.

---

## Getting Started

### Prerequisites
- Java 21
- Node.js 20
- Docker Desktop
- Maven

### Local Development

**1. Clone the repository**
```bash
git clone https://github.com/tamquack/Portfolio.git
cd Portfolio
```

**2. Configure environment**

Copy the example files and fill in your values:
```bash
cp docker-compose.example.yml docker-compose.yml
cp portfolio-backend/src/main/resources/application.properties.example \
   portfolio-backend/src/main/resources/application.properties
```

Create a `.env` file at the root:
```
POSTGRES_PASSWORD=yourpassword
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/portfoliodb
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=yourpassword
```

**3. Run with Docker**
```bash
docker-compose up --build
```

Frontend: `http://localhost` — Backend: `http://localhost:8080`

### Running Tests

```bash
cd portfolio-frontend
npx playwright test
```

21 tests covering navigation, section rendering, form validation, and form submission across Chromium, Firefox, and WebKit.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/contact` | Submit a contact form message |
| GET | `/admin/all` | Retrieve all contact submissions |
| GET | `/admin/all/{email}` | Retrieve submissions by email |
| GET | `/about` | About endpoint placeholder |
| GET | `/projects` | Projects endpoint placeholder |
| GET | `/techstack` | Tech stack endpoint placeholder |

---

## Deployment

The application is containerized and deployed to AWS using the following services:

- **ECR** — stores Docker images for backend and frontend
- **Elastic Beanstalk** — orchestrates the Docker Compose deployment on EC2
- **RDS** — managed PostgreSQL instance for production data

For deployment configuration see `docker-compose.example.yml`.

---

## Development Journey

This project was built across six structured phases, each documented with dated dev logs in `docs/devlog/`.

### Goal
Build a production-grade full stack portfolio that demonstrates real-world engineering practices — REST API design, containerization, cloud deployment, end-to-end testing, and disciplined version control — not just a static page.

### Key Challenges

**CORS between React and Spring Boot** — Resolved by creating a `CorsConfig.java` class in the correct package and adding `@CrossOrigin` to the controller. Later replaced with an nginx reverse proxy in Docker so the browser never makes a cross-origin request at all.

**Git credential exposure** — `docker-compose.yml` and `.env` files containing the RDS password were accidentally committed. Resolved by removing them from git history, rotating the password, and restructuring `.gitignore` to prevent recurrence.

**EB building from source instead of ECR** — Elastic Beanstalk's Docker platform auto-detects Dockerfiles and builds locally, overriding ECR image references. Resolved by creating a `.ebignore` file to exclude source files and Dockerfiles from the deployment package, forcing EB to pull from ECR.

**RDS security group networking** — Each new EB environment creates a new security group. The RDS inbound rule had to be updated to reference the new group each time. Resolved by identifying the correct security group IDs via CLI and updating rules through the AWS Console.

**Docker Compose environment variable propagation** — EB environment variables were set correctly but were not being passed into Docker containers due to how Docker Compose resolves `${VAR}` syntax. Resolved by hardcoding the RDS endpoint as the default fallback in `application.properties`.

**PostgreSQL 18 Docker volume format change** — PostgreSQL 18 Docker images changed the expected volume mount path, causing container initialization failures. Resolved by updating the volume mount from `/var/lib/postgresql/data` to `/var/lib/postgresql`.

### Accomplishments

- Full stack REST API with Spring Boot, JPA, and PostgreSQL wired to a React frontend
- Animated, interactive UI using Tailwind CSS and the Intersection Observer API
- Multi-stage Docker builds for both frontend and backend producing lean production images
- nginx reverse proxy eliminating CORS issues in the containerized environment
- AWS deployment using ECR, Elastic Beanstalk, and RDS with proper IAM role configuration
- 21 Playwright end-to-end tests passing across Chromium, Firefox, and WebKit
- Phase-based git branching strategy with feature branches per section
- Comprehensive dev logs documenting every decision, issue, and resolution across all phases

---


## Author

Tamson — Java Full Stack Developer
