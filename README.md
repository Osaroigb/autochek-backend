# Autochek Backend

## Autochek Vehicle Valuation and Loan Processing Backend Service

This backend service supports vehicle valuation and loan processing for Autochek. It ingests vehicle data, provides valuations, processes loan applications, and updates loan statuses. The backend leverages NestJS with SQLite for data storage and integrates with a vehicle valuation model.

## Features

- Vehicle data ingestion and management
- Vehicle valuation requests and processing
- Loan application submission and status updates
- Integration with third-party vehicle valuation model
- Secure and scalable architecture

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js 16.x or newer
- npm or yarn
- SQLite3 (in-memory database for development)

### Installation

1. **Clone the Repository**

    Clone this repository to your local machine and navigate into it:

    ```bash
    git clone https://github.com/Osaroigb/autochek-backend.git
    cd autochek-backend
    ```

2. **Install Dependencies**

    Install the required packages:

    ```bash
    npm install
    ```

    Or, if you're using Yarn:

    ```bash
    yarn install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the root directory based on the `.env.example` file:

    ```bash
    cp .env.example .env  # Unix/MacOS
    copy .env.example .env  # Windows
    ```

    Update the `.env` file with your environment variables:

    ```
    JWT_SECRET_KEY=your_jwt_secret_key
    RAPIDAPI_HOST=vin-lookup2.p.rapidapi.com
    RAPIDAPI_KEY=your_rapidapi_key
    ```

4. **Run the Application**

    Start the application in development mode:

    ```bash
    npm run start:dev
    ```

    Or, if you're using Yarn:

    ```bash
    yarn start:dev
    ```

    The API will be accessible at `http://localhost:3300/`.

### API Endpoints

- **User Authentication**
  - **POST /signup**: Register a new user. Provides user details (e.g., username, password) for account creation.
  - **POST /login**: Authenticate a user. Provides credentials (e.g., username, password) to obtain a token for subsequent requests.

- **Vehicle Data Ingestion**
  - **POST /vehicles**: Ingest vehicle data.
  - **GET /vehicles/{id}**: Retrieve vehicle details.

- **Vehicle Valuation Requests**
  - **POST /vehicles/{id}/valuation**: Request valuation for a vehicle.
  - **GET /valuations/{id}**: Retrieve vehicle valuation details.

- **Loan Application Submission**
  - **POST /loans**: Submit a loan application.
  - **GET /loans/{id}**: Retrieve loan application details.

- **Loan Status Updates**
  - **PATCH /loans/{id}/status**: Update loan status.

### Documentation

For detailed API documentation, including endpoints, request/response formats, and error codes, visit the [Postman API Documentation](https://documenter.getpostman.com/view/23691550/2sAXjKbYhU).

### Additional Instructions

- **Validation Rules**: 
  - Minimum loan amount: #10,000
  - Maximum loan amount: #500,000
  - Minimum credit score: 600
  - Maximum debt-to-income ratio: 50%
  - Maximum loan term: 30 years
  - Vehicles made before 1900 or beyond 2025 are not valued.

### License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
