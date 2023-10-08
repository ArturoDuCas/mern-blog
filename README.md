# MERN Blogging Platform

Welcome to the repository of a MERN (MongoDB, Express.js, React, Node.js) blogging platform. This application allows users to create, read, update, and delete blog posts. It also supports user registration and authentication. The API interacts with MongoDB to store user and post data, while images are stored using Firebase Storage.

## [Live Demo](https://mern-blog-theta.vercel.app/)

## Features

- **User Authentication**: Register, log in, and manage sessions securely.
- **CRUD Operations**: Users can create, read, update, and delete posts.
- **Image Storage**: Images related to blog posts are stored in Firebase Storage.
- **Responsive UI**: The user interface is designed to be user-friendly and responsive.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js & Express.js
- **Database**: MongoDB
- **Image Storage**: Firebase Storage
- **Deployment**: Vercel

## API Documentation

### Authentication Endpoints

- **Register User**
  - Endpoint: `POST /api/register`
  - Payload: `{ username: String, password: String }`

- **Login User**
  - Endpoint: `POST /api/login`
  - Payload: `{ username: String, password: String }`

- **Get Profile**
  - Endpoint: `GET /api/profile`
  - Headers: `Cookie: token=[your-jwt-token]`

- **Logout**
  - Endpoint: `POST /api/logout`

### Post Endpoints

- **Create Post**
  - Endpoint: `POST /api/post`
  - Headers: `Cookie: token=[your-jwt-token]`
  - Payload: `{ title: String, summary: String, content: String }`
  - File: `file` (image upload)

- **Get Posts**
  - Endpoint: `GET /api/post`
  
- **Get a Specific Post**
  - Endpoint: `GET /api/post/:id`

- **Update Post**
  - Endpoint: `PUT /api/post`
  - Headers: `Cookie: token=[your-jwt-token]`
  - Payload: `{ id: String, title: String, summary: String, content: String }`
  - File: `file` (image upload, optional)

- **Delete Post**
  - Endpoint: `DELETE /api/post`
  - Headers: `Cookie: token=[your-jwt-token]`
  - Payload: `{ id: String }`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.



