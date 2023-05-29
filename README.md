# Culture Quests
## Introduction  
This website works with the popular API "RESTful Countries" for users to interactively learn information about countries around the world, know them by region or continent and to save their favorite countries for them to plan their travels or interest for the future.  
This was done because not all countries are known by everyone and this website will help people that like to know and explore the world find palces they would like to visit or know more about.  

### Deployed app  
https://culture-quests.surge.sh/

## Follow these instructions if you want to play with the code
1. Clone the repository in your local machine
2. Get inside the *backend* folder and run  
   ```
   npm i
   ``` 
3. Get inside the *frontend* folder and run  
   ```
   npm i
   ``` 
4. Create your database with postgresql so you can start adding data and by running the "rest-countries-schema.sql" file.
5. Run the app by both ends.   
  Inside of backend **and** frontend run: 
  ``` 
  npm start
  ```  
**NOTE**: The you will need to get keys to the APIs used in this application for it to retrieve information correctly.


## User Flow  
- The user will start by loging in to the webpage if they have an account; if not, the user will sign up to create a new account.  
- After logging in, the user will be shown the full list of the world's countries; the user will be able to filter the countries by continent, subregion or by using the searchbar on the navbar to look for a particular country. After finding the desired country of interest, the user will be redirected to said country's details page by clicking on the country's name.  
- The details page show the country's name, official name, continent, subregion, population, area, one their official languages, flag and coat of arms, as well as some pictures for the user to get to know the country . There will also be a button for the user to track the country.
- At the user's profile page the user can look at all their tracked countries and the information they have on the profile (email, user, first and last name). The user will be able to go to the detail's page by clicking on any of the countries in the list.  
- If the user needs to change their account's information, they can click on their username in the navbar and then click the "update" button.

## API and Notes  

The API we are using is RESTful Countries (https://restcountries.com/). ***While the API has a lot of useful information for us to use, when we retrieved information for particular countries there was missing information for some (e.g. their coat of arms).*** This limited the amount of information that could be displayed to the user.  

The second API used to get pictures for a country is Unsplash (https://unsplash.com/developers).

The app was created with Node.js for the backend and React.js for the frontend. The databse is handled working with PostgreSQL.

## Potential Future Features
- Users interactivity to look at other's tracked countries.
- Accessability to look at flights for the particular country.