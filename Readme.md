To start do: npm start, then viw in brwser at (http://localhost:8000/)
# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT                           | Port for running on localhost       | "8000"      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies (follwing command will install all dependecies as in package.json file)
```
cd <project_name>
npm install 
```
- Build and run the project
```
npm start
```
  use `http://localhost:8000` to connect Api


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **routes**               | Contain all express routes, separated by module/area of application                       
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| ** **/index.ss           | Entry point                                                              |
| package.json             | Contains npm dependencies as well as [build scripts] 


## functionality
doctors can register ,login(get access token).
localhost:8000/doctors/register
localhost:8000/doctors/login
___________________________________
logged in doctors can register patients, can create reports for patient
localhost:8000/patients/register // header contains token and body contains email and name of patient
localhost:8000/patients/:id/create_report // header contains token and body contains status that to be added in report
Report contains details like patient name,status,checked by doctor name
-------------------------------------
doctors can find all patient
localhost:8000/patients/findall
can search particular patient using id
localhost:8000/patients/find/:id 
_______________________________________________________________
doctors can see stats of monthly patients
localhost:8000/patients/stats

doctrs can search reports by status
