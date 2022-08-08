import './images/hotel-room.jpg'
import './images/overlook.jpg'
import './css/styles.css';
import { getData } from './apiCalls';
import { postData } from './apiCalls';
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer';
import Hotel from './classes/Hotel';
import dayjs from 'dayjs';
dayjs( ).format( );


let hotel;
let booking;
let listOfRooms;
let listOfBookings;
let postedRoomData;
let listOfCustomers;
let currentCustomer;
let customerLoginInfo;


let calendarInput = document.getElementById( 'select' );
let roomTypesDiv = document.getElementById( 'roomType' );
let loginWindow = document.getElementById( 'mainLoginHolder' );
let returnHomeButton = document.querySelector( '.return-home' );
let gridContainer = document.querySelector( '.grid-container' );
let welcomeMessage = document.querySelector( '.welcome-message' );
let roomTypeDropDownMenu = document.getElementById( 'roomTypeDropDown' );
let customerRoomsTotalCost = document.querySelector( '.total-rooms-cost' );
let bookingHitsoryTitleText = document.querySelector( '.booking-history' );
let bookingHistoryDisplay = document.getElementById( 'bookingHistoryGrid' );
let availavbleRoomsByDateGrid = document.getElementById( 'availableRoomsByDateGrid' );
let availavbleRoomsByTypeGrid = document.getElementById( 'availableRoomsByTypeGrid' );
let availableRoomsByDateGridContainer = document.getElementById( 'availableRoomsByDateGrid' );
let availableRoomsByTypeGridContainer = document.getElementById( 'availableRoomsByTypeGrid' );


returnHomeButton.addEventListener( 'click', returnHome );
calendarInput.addEventListener( 'change', getAvailableRoomsByDate );
document.getElementById( 'loginForm' ).addEventListener( 'submit', checkCustomerIsValidOnLogin );
roomTypeDropDownMenu.addEventListener( 'change', filterAvailableRoomsByRoomTypeOnPage )
availableRoomsByDateGridContainer.addEventListener( 'click', ( e ) => {
    if ( e.target.classList == 'submit-button' ){        
        return bookAvailableRoom( e );
    }
} )
availableRoomsByTypeGridContainer.addEventListener( 'click', ( e ) => {
    if ( e.target.classList == 'submit-button' ){
        return bookAvailableRoom( e );
    }
} )



function loadData( ) {
    Promise.all( [ getData( 'customers' ), getData( 'rooms' ), getData( 'bookings' ) ] ).then( data => {
        loginWindow.classList.add( 'hidden' );
        gridContainer.classList.remove( 'hidden' );
        listOfCustomers = data[ 0 ].customers;
        listOfRooms = data[ 1 ].rooms;
        listOfBookings = data[ 2 ].bookings;
        hotel = new Hotel( listOfCustomers, listOfRooms, listOfBookings )
        displayCustomerBookingHistory( );
        } );
}


function displayCustomerBookingHistory( ) {
    availavbleRoomsByDateGrid.innerHTML = '';
    availavbleRoomsByTypeGrid.innerHTML = '';
    bookingHistoryDisplay.innerHTML = '';
    availavbleRoomsByDateGrid.classList.add( 'hidden' );
    availavbleRoomsByTypeGrid.classList.add( 'hidden' );
    bookingHistoryDisplay.classList.remove( 'hidden' );
    welcomeMessage.innerText = `Welcome, ${ currentCustomer.name }!`;
    currentCustomer.getCustomerBookingHistory( listOfBookings, listOfRooms );
    customerRoomsTotalCost.innerHTML = `Lifetime Bookings Total <b>$${ currentCustomer.getTotalCostOfRoomsForCustomer( ) }</b>`;
    return currentCustomer.customerBookingHistory.map( booking => {
        bookingHitsoryTitleText.innerText = `You have ${ currentCustomer.customerBookingHistory.length } rooms in your booking history.`
        bookingHistoryDisplay.innerHTML += 
            `<section class="grid-item grid-item-1">
                <img class= "hotel-image" src='./images/hotel-room.jpg' alt="hotel-room-image">
                <p class="booking-date">${ dayjs( booking.date ).format( "MMMM D, YYYY" ) }</p>
                <p class="booking-room-type">${ booking.roomDetails.roomType.toLowerCase( )
                .split(' ')
                .map( ( word ) => word.charAt( 0 ).toUpperCase( ) + word.substring( 1 ) )
                .join(' ') }</p>
                <p class="booking-bed-size">${ booking.roomDetails.bedSize.charAt( 0 ).toUpperCase( ) + booking.roomDetails.bedSize.slice( 1 ) } Bed ( ${ booking.roomDetails.numBeds } )</p>
                <p class="booking-cost">Room Cost: $${ booking.roomDetails.costPerNight }</p>
            </section>`
    } )
}


function getAvailableRoomsByDate( e ) {
    e.preventDefault( );
    availavbleRoomsByDateGrid.innerHTML = '';
    availavbleRoomsByTypeGrid.innerHTML = '';
    returnHomeButton.classList.remove( 'hidden' );
    bookingHistoryDisplay.classList.add( 'hidden' );
    availavbleRoomsByDateGrid.classList.remove( 'hidden' );
    availavbleRoomsByTypeGrid.classList.add( 'hidden' );
    roomTypesDiv.classList.remove('hidden')
    roomTypeDropDownMenu += `<option value="${ roomTypeDropDownMenu.value }">${ roomTypeDropDownMenu.value }</option>`
    hotel.checkAvailabilityByDate( e.target.value )
    if ( !hotel.roomAvailability.length ) {
        bookingHitsoryTitleText.innerText = `We FIERCELY appologize, but there is no availability on ${ dayjs( calendarInput.value ).format( "MMMM D, YYYY" ) }.`;  
    } else {
        hotel.roomAvailability.forEach( availableRoom => {
            console.log('AVAILABLE: ', availableRoom)
            bookingHitsoryTitleText.innerText = `There are ${ hotel.roomAvailability.length } rooms available on ${ dayjs( e.target.value ).format( "MMMM D, YYYY" ) }`;  
            availavbleRoomsByDateGrid.innerHTML += 
            `<section class="grid-item grid-item-1">
                <img class= "hotel-image" src='./images/hotel-room.jpg' alt="hotel-room-image"">
                <p class="booking-date">${ availableRoom.roomType.toLowerCase( )
                    .split(' ')
                    .map( ( word ) => word.charAt( 0 ).toUpperCase( ) + word.substring( 1 ) )
                    .join(' ') }</p>
                <p class="booking-room-type">${ availableRoom.bedSize.charAt( 0 ).toUpperCase( ) + availableRoom.bedSize.slice( 1 ) } Bed ( ${ availableRoom.numBeds } )</p>
                <p class="booking-cost">Room Cost: $${ availableRoom.costPerNight }</p>
                <input type="submit" value="Book It!" name="select-booking" class="submit-button" id="${ availableRoom.number }"></input>
            </section>`  
        } )   
    }
}


function filterAvailableRoomsByRoomTypeOnPage( e ){
    availavbleRoomsByDateGrid.innerHTML = '';
    availavbleRoomsByTypeGrid.innerHTML = '';
    availavbleRoomsByDateGrid.classList.add( 'hidden' );
    availavbleRoomsByTypeGrid.classList.remove( 'hidden' );
    const filteredRoomsByType = hotel.filterAvailableRoomsByType( e.target.value );
    if ( !filteredRoomsByType.length ) {
        bookingHitsoryTitleText.innerText = `We FIERCELY appologize, but there are no ${ e.target.value.toLowerCase( )
            .split(' ')
            .map( ( word ) => word.charAt( 0 ).toUpperCase( ) + word.substring( 1 ) )
            .join(' ') }s available on ${ dayjs( calendarInput.value ).format( "MMMM D, YYYY" ) }.`;  
    } else {
        filteredRoomsByType.forEach( availableRoom => {
            bookingHitsoryTitleText.innerText = `There are ${ filteredRoomsByType.length } ${ e.target.value.toLowerCase( )
                .split(' ')
                .map( ( word ) => word.charAt( 0 ).toUpperCase( ) + word.substring( 1 ) )
                .join(' ') }s Available on ${ dayjs( calendarInput.value ).format( "MMMM D, YYYY" ) }`;  
            availavbleRoomsByTypeGrid.innerHTML += 
            `<section class="grid-item grid-item-1">
                <img class= "hotel-image" src='./images/hotel-room.jpg' alt="hotel-room-image">
                <p class="booking-date">${ availableRoom.roomType.toLowerCase( )
                    .split(' ')
                    .map( ( word ) => word.charAt( 0 ).toUpperCase( ) + word.substring( 1 ) )
                    .join(' ') }</p>
                <p class="booking-room-type">${ availableRoom.bedSize.charAt( 0 ).toUpperCase( ) + availableRoom.bedSize.slice( 1 )  } Bed ( ${ availableRoom.numBeds } )</p>
                <p class="booking-cost">Room Cost: $${ availableRoom.costPerNight }</p>
                <input type="submit" value="Book It!" name="submit-button" class="submit-button" id="${ availableRoom.number }"></input>
            </section>`
            
        } )   
    }
}


function getPostedRoomDataFromForm( e ) {
    postedRoomData = new FormData( document.querySelector( '.calendar' ) );
    let newBookedRoom = {
        userID: currentCustomer.id, 
        date: dayjs( postedRoomData.get( 'select-date' ) ).format( 'YYYY/MM/DD' ), 
        roomNumber: parseInt( e.target.id )
    };
    return newBookedRoom
}


function bookAvailableRoom( e ) {
    e.preventDefault( );
    let newRoomBooking = getPostedRoomDataFromForm( e );
    let promiseMyYouWillPost = postData( newRoomBooking );
    let fetchMeThatPromise = getData( 'bookings' );
    Promise.all( [ promiseMyYouWillPost, fetchMeThatPromise ] )
        .then( response => {
            window.alert( `WOO HOO!!! You're room is booked for ${ dayjs( response[ 0 ].newBooking.date ).format( "dddd, MMMM D YYYY" ) }!` )
            booking = new Booking( response[ 0 ].newBooking );
        } )
        .catch( error => console.log( 'ERROR: ', error ) )
}


function returnHome( ){
    bookingHistoryDisplay.classList.remove( 'hidden' );
    availavbleRoomsByDateGrid.classList.add( 'hidden' );
    availavbleRoomsByTypeGrid.classList.add( 'hidden' );
    roomTypesDiv.classList.add('hidden');
    loadData( );
}


function checkCustomerIsValidOnLogin( event ) {
    event.preventDefault( );
    customerLoginInfo = new FormData( event.target ); 
    if ( checkCustomerIsValid( customerLoginInfo.get( 'username' ) ) && customerLoginInfo.get( 'password' ) === 'overlook2021' ) {
        fetch( `http://localhost:3001/api/v1/customers/${ checkCustomerIsValid( customerLoginInfo.get( 'username' ) ) }` )
        .then( response => response.json( ) )
        .then( response => {
            whosTheCustomer( response ) 
            loadData( response ) 
            currentCustomer = new Customer( response );
        } )
        .catch( error => console.log( error ) )
    } else {
        window.alert( 'Invalid Username, or Password' );
        event.target.reset( )
    }
}

function checkCustomerIsValid( userName ) {
    let customer = userName.substring( 0, 8 );
    let customerId = userName.substring( 8 );
        if ( customer === 'customer' && parseInt( customerId ) < 51 ) {
            return customerId
        } else {
            return false
        };
}

function whosTheCustomer( listOfCustomers ) {
    return new Customer( listOfCustomers );
}

