# Overlook Hotel

## Get a room!

### Table of contents
* [Setting Up](#setup)
* [How To Use](#how)
* [Error Handling](#error)
* [Challenges & Reflections](#challenges)
* [Future Iterations](#future)
* [Technologies Used](#tech)
* [Contributors](#contributors)

### Setting Up: <a name="setup"></a>

* Clone down the repo by clicking the green **Code** button, and then copying the link under **SSH**.
* In your terminal, type in `git clone` and then paste the copied link.
* Once you have cloned the repo, change ( `cd` ) into the directory and install the project dependencies, by running `npm install`.
* Run `npm start` in the terminal, and copy the URL link (`http://localhost:8080/`) to see the HTML page 
* Now that you have that visit this [GitHub](https://github.com/turingschool-examples/overlook-api) and clone it down into a seperate folder outside of the one you previously cloned.
* Then, CD into the folder and run `npm install` and then `npm start`
* No need to copy and paste an address for this.
* The website should be functioning now!
* To stop running the server, use Control + C in the terminal. (Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems.)


### How To Use: <a name="how"></a>

* Logging in:
    * Username will be the word **customer** followed by a number from **1-50** to pull up a user: `customer32`
    * Password will be: `overlook2021`

https://user-images.githubusercontent.com/97558758/183459893-a8584e29-e886-4d48-b319-d9088f8c2019.mov

<br>

* Customer Display:
    * The Customer is presented with a display that welcomes them and shows their "Lifetime Booking Total".
    * The Customer is also presented with a message saying how many rooms they have in their booking history, and a display of all their past and future trips organized by date.

https://user-images.githubusercontent.com/97558758/183460452-b2936622-6801-496e-a7f0-5ab9c1605c73.mov

<br>

* Filter by Date and Room Type:
    * The calendar at the top-right of the page allows you to filter available rooms by date.
    * Once a date is selected a drop-down menu appears to further filter those room by room type.

https://user-images.githubusercontent.com/97558758/183460821-89536cdf-5746-4521-8557-d4fb829a85a4.mov

<br>

* Book a Room:
    * After the Customer has filtered available rooms by date, they can now select a room for booking by clicking the "Book It!" button that appears.
    * After the "Book It!" button is clicked the user will be shown an alert that confirms their room has been booked for the date selected.

https://user-images.githubusercontent.com/97558758/183460960-02d31d8b-ac4a-41a1-bbab-5bf474ef0ecd.mov

<br>

* Return Home and See Added Booking:
    * The Customer can click the "Return Home" button at anytime to go back to their main page.
    * If the "Return Home" button is clicked after a successful booking, the Customer will be returned home and their "Lifetime Booking Total" will be updated.
    * The new booking will be placed in the Customer's booking history.

https://user-images.githubusercontent.com/97558758/183461109-49e37e18-4ff5-4892-b998-c887843dd695.mov

### Error Handling: <a name="error"></a>

* Customer Login Error Handling:
    * If the Customer enters an invalid Username, or Password, they will be presented with an alert notifying them.
    * Upon clicking the "OK" button on the alert, the login form will reset and they can try again.

https://user-images.githubusercontent.com/97558758/183461191-7095cbd0-ce6a-4a8d-a4b9-efda68016e73.mov

<br>

* No Room Availavility by DATE Error Handling: 
    * If there are no available rooms on the date selected by the Customer, a message will appear on the screen notifying the Customer.
    * **NOTE:** This project had a wide array of data, but nothing in the future was booked out, so I found a past date that was booked out to show my error handling works, but I later edited my code so the customer may not choose a past date for booking.

https://user-images.githubusercontent.com/97558758/183764491-c16b6b78-985b-4032-9962-b915b7bb7161.mov

<br>

* No Room Availavility by Room TYPE Error Handling: 
    * If there are no available room types on the date selected by the Customer, a message will appear on the screen notifying the Customer.
    * **NOTE:** Same thing for this video as above. I found a past date that had a smaller selection of room types and recorded the clip using that past date to show my error handling works, but then later edited my code, so that the user may not choose a past date.

https://user-images.githubusercontent.com/97558758/183764549-5ce115c1-5dca-4fca-b578-b9fec396f8e3.mov

<br>

* Selecting a Past Date:
    * If the Customer selects a date prior to the current date, they will be shown a message to let them know they need to choose the current date, or a future date for booking.

https://user-images.githubusercontent.com/97558758/183773217-b1ebb084-6672-48ac-b9a3-dbc7f052ce4a.mov


<br>



### Challenges & Reflections: <a name="challenges"></a>
* This project was a challenge, as I dealt with fetching API data from the server and also enabling the ability to POST a new Room booking for the Customer. 
* Above that was creating a login page, linking that login to the user, and then displaying that user's trips. I've only done this once before, so it was nice to get more practice.
* After deveoping my class files, referencing countless ways to overcome an error, getting help from fellow developers, repeating these previous steps over and over, and riding that emotional rollercoaster I came out the otherside with a product that I'm both proud of, and learned a great deal from.

<br>

### Future Iterations: <a name="future"></a>
* Adding a Hotel Manager interaction, so another user can:
    * Login and manage bookings.
    * See total bookings & revenue for a given day.
    * Search for Customers by name and see that user's bookings and total they've spent.

<br>

### Technologies used:<br><a name="tech"></a>
JavaScript<br>
HTML<br>
CSS<br>
GET & POST API Data<br>
Webpack<br>
Mocha<br>
Chai<br>

<br>


### Contributors: <a name="contributors"></a>

Jordan Farelli: [LinkedIn](https://www.linkedin.com/in/jordan-farelli/) | [GitHub](https://github.com/jfarelli)
