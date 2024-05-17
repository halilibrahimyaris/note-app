
# Note Application

This project is a note application where users can save, list, view, and edit their notes. The project uses Java Spring Boot and JWT tokens for the backend, React for the frontend, and PostgreSQL as the database.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Java 17 or higher
- Node.js and npm
- PostgreSQL
- Maven
### Backend
Navigate to the frontend directory:
cd ../noteApplication
### Installation
Configure the PostgreSQL database:
spring.datasource.url=jdbc:postgresql://localhost:5432/note_application

spring.datasource.username=your_db_username

spring.datasource.password=your_db_password

spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

### Frontend
Navigate to the frontend directory:
cd ../note-application
Start the application:
Install the necessary dependencies:
npm install
npm start

Usage
Registration and Login:
Users can register and log in to the application using JWT tokens.

Note Management:
Users can add, view, edit, and delete notes.
