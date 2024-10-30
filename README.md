# Chat App

A real-time chat application built with Node.js for the backend and React for the frontend.

<details>
<summary><strong>Technologies Used</strong></summary>

- **Node.js** & **Express**: Backend framework and server
- **MongoDB**: Database for messages
- **React**: Frontend framework
- **Docker** & **Docker-Compose**: Containerization and multi-container management

</details>

<details>
<summary><strong>User Stories</strong></summary>

### 1. User Login
**As** a user,  
**I want** to log into the chat application,  
**So that** I can access chat features and communicate with other users.

### 2. Sending Messages
**As** a user,  
**I want** to send messages,  
**So that** I can communicate with other users in real time.

### 3. Deleting My Messages
**As** a user,  
**I want** to delete only my messages,  
**So that** I can keep the chat organized and remove unnecessary messages.

### 4. Viewing Message History
**As** a user,  
**I want** to view the history of old messages,  
**So that** I can find important information or track previous conversations.

### 5. User Logout
**As** a user,  
**I want** to log out of the chat application,  
**So that** I can protect my privacy and security when I'm done chatting.

</details>

<details>
<summary><strong>Prerequisites</strong></summary>

- Docker and Docker Compose installed

</details>

<details>
<summary><strong>How to Run the Application</strong></summary>

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd chatApp
   ```
2. Build and start the application:

```bash
docker-compose up --build -d
```

3. Access the app via:

    Backend API: http://localhost:5000
    Frontend: http://localhost:3000

4. To stop the containers:

```bash
docker-compose down
```

</details> <details> <summary><strong>Running Tests</strong></summary>

1. Navigate to the /testing directory:

```bash

cd testing
```

2. Install dependencies:

```bash
npm i
```
3. Run tests:

```bash
npm run test
```

This generates reports and opens them automatically.

</details>
