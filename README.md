# Admin Application for [Little Fern](https://www.littlefern.in/)
![Build Status](https://github.com/rohit1901/admin-little-fern/actions/workflows/next_lint.yml/badge.svg)

This is an admin application built with TypeScript, MongoDB, MongoClient, AWS, Heroku, React, Next.js, Flowbite, Flowbite React, and Tailwind CSS. The application is designed to handle various types of data and provide a user-friendly interface for uploading and managing images for the Little Fern website.

## Architecture

The application is built as a full-stack web application with the following components:

1. **Frontend**: The frontend of the application is built using React and Next.js. It includes components like `Dropzone` for uploading images and `ImageBlock` for displaying and managing images. The UI is designed using Flowbite, Flowbite React, and Tailwind CSS. State management is handled by Zustand 🐻.

2. **Backend**: The backend is built with Node.js, using MongoClient to connect to the MongoDB database. User authentication and authorization are handled by AWS Cognito.

3. **Database**: MongoDB is used as the database for this application.

4. **Cloud Storage**: AWS S3 is used for storing images uploaded through the application.

5. **Content Delivery Network (CDN)**: AWS CloudFront is used to serve static and dynamic web content.

6. **Deployment**: The application is deployed on Heroku.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

1. Clone the repository
```bash
git clone https://github.com/rohit1901/admin-little-fern.git
```
2. Install NPM packages
```bash
npm install
```
3. Start the development server
```bash
npm run dev
```

## Usage

The application includes several components for handling different types of data:

### LoginButton

`LoginButton` is a component that handles user authentication. It uses AWS Cognito for user authentication and authorization. If the user is already logged in, it renders the `LFNavbar` and `LFSidebar` components along with the children components. If the user is not logged in, it renders a sign-in form.

### Logo

`Logo` is a simple component that displays the logo of the application. It uses the `next/image` component for optimized image rendering.

### Dropzone

`Dropzone` is a component for uploading images. It provides a user-friendly interface for selecting and previewing images before upload. The component uses AWS S3 for storing the uploaded images.

### Popover

`Popover` is a component that displays a popover box. It can be triggered by either hover or click events. The popover box can contain any ReactNode content.

Please refer to the source code for more details about these components.

## Built With

- ![TypeScript](https://img.shields.io/badge/-TypeScript-000000?style=flat-square&logo=typescript)
- ![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
- ![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
- ![Next.js](https://img.shields.io/badge/-Next.js-black?style=flat-square&logo=next.js)
- ![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb)
- ![AWS](https://img.shields.io/badge/-AWS-black?style=flat-square&logo=amazon-aws)
- ![Heroku](https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=heroku)
- ![Flowbite](https://img.shields.io/badge/-Flowbite-563D7C?logo=tailwind-css&logoColor=white)
- ![Flowbite React](https://img.shields.io/badge/-FlowbiteReact-563D7C?logo=tailwind-css&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-000000?logo=tailwind-css&logoColor=white)
- ![React](https://img.shields.io/badge/zustand-000000.svg?logo=react&logoColor=%2361DAFB) 🐻

## Authors

- [Rohit Khanduri](https://github.com/rohit1901)

## License

This project is licensed under the MIT License.

## Acknowledgments

- Thanks to all contributors who participated in this project.