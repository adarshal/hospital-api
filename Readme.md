To start do: npm start, then view in brwser postman or other API handler at (http://localhost:8000/)
# Environment 
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
![image](https://user-images.githubusercontent.com/89533221/229242644-8d784db0-c27b-406f-8379-d282adb035ad.png)
![image](https://user-images.githubusercontent.com/89533221/229242667-d771485a-804a-4e82-b973-0ec786f9c197.png)

___________________________________
logged in doctors can register patients, can create reports for patient
localhost:8000/patients/register // header contains token and body contains email and name of patient<br>
![image](https://user-images.githubusercontent.com/89533221/229242734-2488a56f-084b-4b77-8c86-4dfd663b5a26.png)
![image](https://user-images.githubusercontent.com/89533221/229242816-a42bf829-4916-4bbb-95e2-fb2ff9db9a3a.png)

localhost:8000/patients/:id/create_report // header contains token and body contains status that to be added in report
Report contains details like patient name,status,checked by doctor name
-------------------------------------
doctors can find all patient
localhost:8000/patients/findall
![image](https://user-images.githubusercontent.com/89533221/229242877-78c01543-8a87-4375-afd1-4e16a6b8e546.png)


can search particular patient using id
localhost:8000/patients/find/:id 
![image](https://user-images.githubusercontent.com/89533221/229242904-fdd24afe-77bd-45b7-9aca-fc830988e094.png)

_______________________________________________________________
doctors can see stats of monthly patients
localhost:8000/patients/stats
![image](https://user-images.githubusercontent.com/89533221/229243052-15857c6e-2975-47cc-ae8a-2d5143d5417f.png)
![image](https://user-images.githubusercontent.com/89533221/229243104-e2cc5e40-2372-4b9a-bb32-fd4913acf32d.png)

doctrs can search reports by status
