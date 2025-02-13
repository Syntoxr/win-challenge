# Win Challenge Project

This project is a locally hosted website that allows users to view and participate in a win challenge. Users can track their progress on challenges and sync data among viewers in real-time.

## Project Structure

```
win-challenge/
├── src/
│   ├── index.html          # Main HTML document
│   ├── css/
│   │   └── styles.css      # Styles for the website
│   ├── js/
│   │   ├── app.js          # Main JavaScript file
│   │   ├── participants.js  # Participant management
│   │   ├── theme.js        # Theme management
│   │   └── challenges.js    # Challenge management
│   └── server/
│       ├── api.js          # API endpoints
│       └── server.js       # Local server setup
├── .github/
│   └── workflows/
│       └── docker-build.yml # GitHub Actions workflow
├── Dockerfile              # Docker configuration
├── docker-compose.yaml     # Docker Compose configuration
├── package.json           # npm configuration
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## Deployment Options

### Local Development

1. Clone and setup:
```bash
git clone git@github.com:Syntoxr/win-challenge.git
cd win-challenge
npm install
```

2. Start development server:
```bash
npm start
```

3. Access at [`http://localhost:3000`](http://localhost:3000)

### Docker Deployment

1. Create docker-compose.yaml:
```yaml
services:
  win-challenge:
    image: ghcr.io/syntoxr/win-challenge:latest
    ports:
      - 3000:3000
    volumes:
      - <local-data-folder>:/app/src/server/data
```

2. Start:
```bash
docker-compose up -d
```

3. Access at [`http://localhost:3000`](http://localhost:3000)

## Features

- Real-time challenge tracking
- Multi-user synchronization
- Dark/Light theme switching
- Persistent data storage
- Docker containerization
- GitHub Actions CI/CD

## Data Structure of save file

```json
{
  "participants": [
    { "id": "1", "name": "Player 1" },
    { "id": "2", "name": "Player 2" }
  ],
  "challenges": [
    { "id": "1", "name": "Complete Tutorial" },
    { "id": "2", "name": "First Achievement" }
  ],
  "completions": {
    "1": { "1": true, "2": false },
    "2": { "1": false, "2": true }
  }
}
```