# Patient-Doctor Appointment Scheduler


## Project Overview
The **Patient-Doctor Appointment Scheduler** is a comprehensive web application designed to facilitate appointment scheduling and management between patients and doctors. It integrates **Angular 17** for the front-end, **Spring Boot** with **Java 21** for the back-end, and **MySQL** for database storage. Additionally, the application incorporates **Rasa** for natural language processing, **FastAPI** and **Uvicorn** for serving machine learning models, and **Docker Compose** for simplified containerized deployment. It supports real-time notifications, email alerts, and language translation functionality to improve user experience.


## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)


## Features
- **Appointment Management**: Schedule, update, and cancel appointments.
- **Real-Time Notifications**: Instant updates and alerts for appointment status changes.
- **Email Notifications**: Notifications sent to patients and doctors for scheduling and cancellations.
- **Multilingual Support**: Language translation to make the app accessible to diverse users.
- **AI Integration**: Built-in Rasa for natural language processing to interact with users.
- **Model Serving**: FastAPI and Uvicorn for serving machine learning models.
- **Containerized Deployment**: Docker Compose for managing multiple services.


## Tech Stack
- **Front-End**: Angular 17
- **Back-End**: Spring Boot (Java 21)
- **Database**: MySQL
- **AI/NLP**: Rasa
- **API Server**: FastAPI, Uvicorn
- **Containerization**: Docker, Docker Compose


## Installation


### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://gitlab.com/Sowmyashri.M/your-repo-name.git
cd your-repo-name


2. Set Up the Angular Front-End
Navigate to the frontend directory and install dependencies:
bash
Copy code
cd frontend
npm install
npm install primeng
npm install primeicons


Run the Angular development server:
bash
Copy code
npm run start


The front-end will be available at http://localhost:4200.
3. Set Up the Spring Boot Back-End
Navigate to the backend directory and build the Spring Boot project:
bash
Copy code
cd backend
./mvnw spring-boot:run


The back-end API will be available at http://localhost:8080.






















4. Configure MySQL Database
Make sure MySQL is running and configure your application.properties or application.yml in the backend folder:
properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/patient_care?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=12345
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.thymeleaf.check-template-location=false
spring.jpa.open-in-view=false
server.port=8080 
rasa.url=http://localhost:5005/webhooks/rest/webhook
server.servlet.session.timeout=120m
server.servlet.session.cookie.http-only=true
server.servlet.session.cookie.secure=false
spring.jackson.stream.write-constrain.max-nesting-depth=2000
spring.servlet.multipart.location=uploads/
file.uploadDir=./uploads
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=2MB
spring.servlet.multipart.max-request-size=2MB


5. Run Rasa and FastAPI with Uvicorn
Run Rasa:
bash
Copy code
cd rasa
rasa train
rasa run --enable-api


Run FastAPI with Uvicorn:
bash
Copy code
cd fastapi
uvicorn app:app --host 0.0.0.0 --port 8000
6. Use Docker Compose for Deployment
Ensure you have a docker-compose.yml file at the project root. This file defines the services needed to run your application.
Example docker-compose.yml:
yaml
Copy code
version: '3.9'


services:
  springboot:
    build:
      context: ./back-end/patient-care
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/patient_care?useSSL=false&allowPublicKeyRetrieval=true
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.MySQL8Dialect
      - SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE:-dev}
      - RASA_URL=http://rasa:5005/webhooks/rest/webhook
    networks:
      - app-network
    env_file:
      - .env
    entrypoint: [ "./wait-for-it.sh", "mysql:3306", "--", "java", "-jar", "/app/app.jar" ]


  fastapi:
    build:
      context: ./rasa_env/rasa_env/fastapi_service
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    networks:
      - app-network


  mysql:
    image: mysql:8.0.32
    container_name: mysql_container
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=patient_care
    ports:
      - "3307:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - app-network
    healthcheck:
      test: [ "CMD", "mysqladmin", "ping", "-h", "localhost" ]
      interval: 30s
      retries: 3
      start_period: 10s
      timeout: 5s


  rasa:
    image: rasa/rasa:3.0.0-full
    ports:
      - "5005:5005"
    networks:
      - app-network
    volumes:
      - ./rasa_env:/app
    command: [ "rasa", "run", "--enable-api", "--cors", "*" ]


  angular:
    build:
      context: ./front-end/healthcare-dashboard
      dockerfile: Dockerfile
    ports:
      - "4200:80"
    environment:
      - API_BASE_URL=http://springboot:8080
    networks:
      - app-network


volumes:
  db_data:




networks:
  app-network:
    driver: bridge




Start all services with:
bash
Copy code
docker-compose up --build


Configuration
Environment Variables
Ensure you set up any necessary environment variables, such as:
* Database connection details
* API keys for email notifications or external services
Custom Configuration
* For Rasa, edit the config.yml and domain.yml as needed.
* For FastAPI, update app.py or related configuration files as required.
Usage
1. Access the Front-End: Navigate to http://localhost:4200 in your web browser.
2. API Endpoints:
   * Spring Boot API: Available at http://localhost:8080.
   * Rasa Bot: Access via http://localhost:5005.
   * FastAPI Service: Visit http://localhost:8000.
Running Tests
For Angular
Run unit and integration tests:
bash
Copy code
ng test


For Spring Boot
Run unit tests using Maven:
bash
Copy code
./mvnw test


Deployment
The project can be deployed locally using Docker Compose as described in the Installation section. For production deployments, consider using managed container services like Docker Swarm, Kubernetes, or cloud platforms.
Contributing
We welcome contributions to this project! To contribute:
1. Fork the repository.
2. Create a feature branch (git checkout -b feature/your-feature-name).
3. Make your changes and commit (git commit -m 'Add new feature').
4. Push your changes (git push origin feature/your-feature-name).
5. Create a pull request with a detailed description of your changes.
License
This project is licensed under the MIT License. See the LICENSE file for more details.
Acknowledgments
* Thanks to Angular, Spring Boot, Rasa, FastAPI, and Docker for providing the essential tools and frameworks that power this project.
* Inspired by contributions from the open-source community.
Contact
* Author: Sowmyashri.M
* Email: sowmyashrishubha@gmail.com
* GitLab: https://gitlab.com/Sowmyashri.M
markdown
Copy code