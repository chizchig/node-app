cat <<EOF > README.md
# Node App

A simple Node.js application built with Express.js, containerized with Docker, and deployed via Helm using a CI/CD pipeline on GitHub Actions.

## Overview

This project is a minimal Express.js server that responds with "Hello from Node.js!" on the root endpoint (\`/\`). It’s designed to:
- Run locally or in a container.
- Be built and pushed to Docker Hub.
- Be scanned for vulnerabilities using Docker Scout and Trivy.
- Update a Helm chart in a separate repository (\`chizchig/helm-charts\`) for deployment.

## Features
- **Express.js Server**: Responds with a greeting at \`GET /\`.
- **Dockerized**: Built into a Docker image (\`docker.io/shadowhub/node-app\`).
- **CI/CD Pipeline**: Automated build, scan, and Helm chart updates via GitHub Actions.
- **Security**: Scanned with Docker Scout and Trivy for vulnerabilities.
- **Helm Deployment**: Updates a Helm chart for Kubernetes deployment.

## Prerequisites
- **Node.js**: v18 or later (for local development).
- **Docker**: For building and running the container.
- **Helm**: For managing the Kubernetes deployment (if deploying manually).
- **GitHub Actions**: Secrets configured (\`DOCKERHUB_USERNAME\`, \`DOCKERHUB_TOKEN\`, \`PAT\`).

## Getting Started

### Local Development
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/<your-username>/node-app.git
   cd node-app
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the app:
   \`\`\`bash
   node index.js
   \`\`\`
4. Open your browser or use \`curl\`:
   \`\`\`bash
   curl http://localhost:3000
   # Output: "Hello from Node.js!"
   \`\`\`

### Running with Docker
1. Build the Docker image:
   \`\`\`bash
   docker build -t node-app:latest .
   \`\`\`
2. Run the container:
   \`\`\`bash
   docker run -p 3000:3000 node-app:latest
   \`\`\`
3. Test it:
   \`\`\`bash
   curl http://localhost:3000
   # Output: "Hello from Node.js!"
   \`\`\`

## CI/CD Pipeline
The pipeline is defined in \`.github/workflows/ci-pipeline.yml\` and runs on push or pull request to the \`master\` branch, or manually via workflow dispatch.

### Workflow Steps
1. **Checkout Code**: Clones the repository.
2. **Set up Docker Buildx**: Configures Docker Buildx for multi-platform builds.
3. **Login to Docker Hub**: Authenticates using \`DOCKERHUB_USERNAME\` and \`DOCKERHUB_TOKEN\`.
4. **Build and Push Docker Image**: Builds and pushes the image to \`docker.io/shadowhub/node-app\` with \`latest\` and SHA tags.
5. **Install Docker Scout**: Installs the Docker Scout CLI for image analysis.
6. **Analyze Image with Docker Scout**: Runs \`docker-scout quickview\` for a summary.
7. **Scan Image for CVEs with Docker Scout**: Runs \`docker-scout cves\` for vulnerability details.
8. **Debug Image**: Pulls the image to verify availability.
9. **Cache Trivy DB**: Caches Trivy’s vulnerability database.
10. **Scan Image with Trivy**: Scans for critical CVEs, failing if any are found.
11. **Checkout Helm Charts Repo**: Clones \`chizchig/helm-charts\` using a PAT.
12. **Update Helm Chart**: Updates \`node-app/values.yml\` with the new image tag and lints the chart.
13. **Commit Helm Chart Updates**: Commits and pushes changes to \`<your-username>/helm-charts\`.

### Secrets
- \`DOCKERHUB_USERNAME\`: Your Docker Hub username.
- \`DOCKERHUB_TOKEN\`: A Docker Hub access token.
- \`PAT\`: A GitHub Personal Access Token with \`repo\` scope for \`<your-username>/helm-charts\`.

## Helm Chart
The Helm chart is maintained in a separate repository: \`chizchig/helm-charts\`. It includes:
- \`Chart.yml\`: Chart metadata.
- \`values.yml\`: Configurable values (e.g., image tag).
- \`templates/\`: Kubernetes manifests (\`deployment.yml\`, \`service.yml\`, \`_helpers.tpl\`).

After the pipeline runs, the chart’s \`values.yml\` is updated with the latest image tag (e.g., \`<git-sha>\`).

## Project Structure
\`\`\`
node-app/
├── Dockerfile        # Docker configuration
├── index.js         # Express.js application
├── package.json     # Node.js dependencies
├── .github/         # GitHub Actions workflows
│   └── workflows/
│       └── ci-pipeline.yml
└── README.md        # This file
\`\`\`

## Contributing
1. Fork the repository.
2. Create a feature branch: \`git checkout -b feature/your-feature\`.
3. Commit changes: \`git commit -m "Add your feature"\`.
4. Push to your fork: \`git push origin feature/your-feature\`.
5. Open a pull request.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details (add a \`LICENSE\` file if desired).
EOF