## Overview

HSLMS (Hospital Staff Leave Management System) is a full-stack leave-management platform for COMP60022-KN2 - Decision Analytics II. The project investigates operational challenges in Sri Lankan state hospitals through a Divisional Hospital case study, then delivers a data-engineered solution with MongoDB-backed analytics, React-based user interfaces, and an Express/Node.js API for complete staff leave workflows.

![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-Cloud-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose 8.6.3](https://img.shields.io/badge/Mongoose-8.6.3-800000?style=flat-square)
![Express.js 4.21.0](https://img.shields.io/badge/Express.js-4.21.0-000000?style=flat-square&logo=express&logoColor=white)
![React 18.3.1](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)
![React DOM 18.3.1](https://img.shields.io/badge/React%20DOM-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js >=16.20.1](https://img.shields.io/badge/Node.js-%3E%3D16.20.1-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)
![Bootstrap 5.3.3](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![React Bootstrap 2.10.4](https://img.shields.io/badge/React%20Bootstrap-2.10.4-563D7C?style=flat-square)
![Axios 1.7.5](https://img.shields.io/badge/Axios-1.7.5-5A29E4?style=flat-square&logo=axios&logoColor=white)
![CORS 2.8.5](https://img.shields.io/badge/CORS-2.8.5-2C6E49?style=flat-square)
![Multer 1.4.5-lts.1](https://img.shields.io/badge/Multer-1.4.5--lts.1-4E6E5D?style=flat-square)
![Validator 13.12.0](https://img.shields.io/badge/Validator-13.12.0-0B7285?style=flat-square)
![fast-csv 5.0.1](https://img.shields.io/badge/fast--csv-5.0.1-5C7AEA?style=flat-square)
![Moment.js 2.30.1](https://img.shields.io/badge/Moment.js-2.30.1-8A2BE2?style=flat-square)
[![LaTeX](https://img.shields.io/badge/LaTeX-47A141?style=flat-square&logo=LaTeX&logoColor=white)
[![Overleaf](https://img.shields.io/badge/Overleaf-47A141?style=flat-square&logo=Overleaf&logoColor=whit)

## Features

HSLMS provides the following features:

1. **Problem Investigation and Process Mapping**

   - Analysed leave-management bottlenecks in Sri Lankan state hospitals using a Divisional Hospital case study
   - Documented misplaced forms, manual calculations, and legacy procedures requiring digitalisation

2. **Data-Engineered Architecture**

   - Proposed data pipelines for collection, validation, storage, retrieval, and analytics
   - Compared SQL and NoSQL options and selected MongoDB for semi-structured hospital data

3. **MongoDB Schema and Data Validation**

   - Designed collections for doctors, major staff, and minor staff
   - Validated collections with real cadre datasets and imported data via mongoimport, Shell, and Compass

4. **Query Library and Analytics**

   - Built a query library with operators, regex queries, and aggregation pipelines
   - Integrated MongoDB Atlas Charts for live dashboards and KPI reporting

5. **Front-end Experience and UI Design**

   - Produced complete wireframes for all HSLMS interfaces
   - Built the React front-end with structured components, forms, and data rendering

6. **API Development and Testing**

   - Implemented Express/Node.js CRUD APIs across all staff types
   - Verified API endpoints in Postman before UI integration

7. **Administrative Export Support**

   - Added CSV export functionality for offline administrative use

8. **Evaluation and Reporting**

   - Formulated analytical questions and hypotheses to study leave patterns
   - Presented workflow improvements and outcomes in a LaTeX-compiled academic report

## Technologies Used

- **MongoDB Atlas**: Cloud database service (version managed by Atlas)
- **MongoDB Atlas Charts**: Live dashboarding (version managed by Atlas)
- **Mongoose 8.6.3**: ODM for MongoDB
- **Express.js 4.21.0**: REST API framework
- **Node.js >=16.20.1**: Backend runtime (minimum requirement from Mongoose 8.6.3)
- **React 18.3.1**: Front-end framework
- **React DOM 18.3.1**: React rendering layer
- **Bootstrap 5.3.3**: Core UI styling
- **React Bootstrap 2.10.4**: React UI components
- **Axios 1.7.5**: HTTP client
- **CORS 2.8.5**: Cross-origin resource support
- **Multer 1.4.5-lts.1**: File upload handling
- **Validator 13.12.0**: Input validation
- **fast-csv 5.0.1**: CSV import/export
- **Moment.js 2.30.1**: Date and time utilities

## Project Specifications

- **Course**: COMP60022-KN2 - Decision Analytics II
- **Application Type**: Full-stack leave-management system with analytics dashboards
- **API Port**: 6010 (Express server)
- **Data Handling**: MongoDB Atlas with validated collections and query library
- **Analytics**: MongoDB Atlas Charts and hypothesis-driven evaluation

## User Interfaces

### UIs

![HSLMS UI 1](https://github.com/supunxiii/supunxiii/blob/7653f59dcf38771e7791a1cc0795c9d6b4cdcd3c/user-interfaces/hslms/hslms-ui-1.png)

### UIs

![HSLMS UI 2](https://github.com/supunxiii/supunxiii/blob/7653f59dcf38771e7791a1cc0795c9d6b4cdcd3c/user-interfaces/hslms/hslms-ui-2.png)

### UI

![HSLMS UI 3](https://github.com/supunxiii/supunxiii/blob/7653f59dcf38771e7791a1cc0795c9d6b4cdcd3c/user-interfaces/hslms/hslms-ui-3.png)

## Getting Started

To run HSLMS locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/supunxiii/hslms.git
   ```

2. Navigate to the project directory:

   ```shell
   cd hslms
   ```

3. Install backend dependencies:

   ```shell
   cd server
   npm install
   ```

4. Create a `.env` file in `server` and set the MongoDB connection string:

   ```shell
   DATABASE=your_mongodb_atlas_connection_string
   ```

5. Start the API server:

   ```shell
   node app.js
   ```

6. In a new terminal, install client dependencies and start the React app:

   ```shell
   cd client
   npm install
   npm start
   ```

## Project Structure

```
hslms/
├── client/                         # React front-end
├── data/                           # Data sets and imports
├── server/                         # Express API and MongoDB models
├── package.json                    # Root dependencies
├── package-lock.json               # Root lockfile
├── README.md                       # Project documentation
└── LICENSE                         # Licence
```

## Developer

This project was developed by:

- **Supun Wijesooriya** - Developer

## Contributing

Contributions are welcome. If you would like to contribute:

1. Fork the repository.
2. Create a new branch:

   ```shell
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```shell
   git commit -m "Add your commit message"
   ```

4. Push your branch:

   ```shell
   git push origin feature/your-feature-name
   ```

5. Open a pull request with a clear description of your changes.

## License

This project is open-source and is licensed under the [MIT License](LICENSE).

## Contact

For any enquiries or feedback, please contact the developer:

- **Supun Wijesooriya**: [GitHub Profile](https://github.com/supunxiii)
- **Project Repository**: [hslms](https://github.com/supunxiii/hslms)

---

_Designed and developed in September 2024_
