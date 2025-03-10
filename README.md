## React + TypeScript Project Setup Guide

This guide will help you clone, install dependencies, and run the React + TypeScript application on your local machine.

## 📌 Prerequisites

Make sure you have the following installed on your system:

```sh
Node.js (Download: https://nodejs.org/)

Git (Download: https://git-scm.com/)
```

Make sure you have the following installed on your system:

- **Node.js** (Download: [https://nodejs.org/](https://nodejs.org/))
- **Git** (Download: [https://git-scm.com/](https://git-scm.com/))
- **Package Manager** (npm)

Package Manager (npm)

## 🚀 Clone the Repository

To clone the project, open a terminal and run:

```sh
git clone https://github.com/your-username/your-repo-name.git
```

(Replace your-username and your-repo-name with your actual GitHub username and repository name.)

Next, navigate into the project folder:

```sh
cd your-repo-name
```

## 📦 Install Dependencies

Run the following command to install all necessary dependencies:

```sh
npm install
```

## ▶️ Start the Development Server

After installing dependencies, start the React development server with:

```sh
npm start
```

## Steps to Load and Run a .tar File in Docker

## 1️⃣ Load the Docker Image from the .tar File

Navigate to the directory where your .tar file is located and run:

```sh
docker load -i your-image.tar
```

(Replace your-image.tar with the actual file name.)

## 👉 To verify the image is loaded, run:

```sh
docker images
```

This will list all available images, including the newly loaded one.

## 2️⃣ Run a Container from the Image

Find the image name or ID from the docker images command output and start a container:

```sh
docker run -d -p 8080:8080 your-image-name
```

## 3️⃣ Access the Application

Now, open your browser and go to:
http://localhost:8080/
