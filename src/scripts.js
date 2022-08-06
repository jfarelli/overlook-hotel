import './images/hotel-room.jpg'
import './css/styles.css';
import { getData } from './apiCalls';
import { postData } from './apiCalls';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer';
import Hotel from './classes/Hotel';
import dayjs from 'dayjs';
dayjs( ).format( );


// ============================ GLOBAL VARIABLES =====================================
let listOfRooms;
let listOfBookings;
let listOfCustomers;
let currentCustomer;
let postedRoomData;
let customerLoginInfo;
// let room;
let booking;
let hotel;


// ====================== QUERY SELECTORS / ELEMENTS BY ID ===========================
let welcomeMessage = document.querySelector( '.welcome-message' );
let customerRoomsTotalCost = document.querySelector( '.total-rooms-cost' );
let bookingHitsoryTitleText = document.querySelector( '.booking-history' );
let calendarInput = document.getElementById( 'select' );
let roomTypesDiv = document.getElementById( 'roomType' );
let roomTypeDropDownMenu = document.getElementById( 'roomTypeDropDown' );
let availavbleRoomsByDateGrid = document.getElementById( 'availableRoomsByDateGrid' );
let availavbleRoomsByTypeGrid = document.getElementById( 'availableRoomsByTypeGrid' );
let bookingHistoryDisplay = document.getElementById( 'bookingHistoryGrid' );
let availableRoomsByDateGridContainer = document.getElementById( 'availableRoomsByDateGrid' );
let availableRoomsByTypeGridContainer = document.getElementById( 'availableRoomsByTypeGrid' );
let returnHomeButton = document.querySelector( '.return-home' );

let gridContainer = document.querySelector( '.grid-container' );
let loginWindow = document.getElementById( 'mainLoginHolder' );
let loginForm = document.getElementById( 'loginForm' );


// ============================ EVENT LISTENERS ======================================
// window.addEventListener( 'load', loadData );
calendarInput.addEventListener( 'change', getAvailableRoomsByDate )
roomTypeDropDownMenu.addEventListener( 'change', filterAvailableRoomsByRoomTypeOnPage )
returnHomeButton.addEventListener( 'click', returnHome );
loginForm.addEventListener( 'submit', checkCustomerIsValidOnLogin );

availableRoomsByDateGridContainer.addEventListener( 'click', ( e ) => {
    if ( e.target.classList == 'submit-button' ){        
        return bookAvailableRoom( e );
    }
} )


availableRoomsByTypeGridContainer.addEventListener( 'click', ( e ) => {
    if( e.target.classList == 'submit-button' ){
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
        // currentCustomer = new Customer( listOfCustomers[ 14 ] ); 
        // currentCustomer = new Customer( listOfCustomers[ Math.floor( Math.random( ) * listOfCustomers.length ) ] ) 
        // console.log('CURRENT CUSTOMER: ', currentCustomer)
        // currentCustomer = new Customer( listOfCustomers );
        hotel = new Hotel( listOfCustomers, listOfRooms, listOfBookings )
        displayCustomersBookingHistory( );
        } );
}


function displayCustomersBookingHistory( ) {
    welcomeMessage.innerText = `Welcome, ${ currentCustomer.name }!`;
    currentCustomer.getCustomersBookingHistory( listOfBookings, listOfRooms );
    customerRoomsTotalCost.innerHTML = `Lifetime Booking Total <b>$${ currentCustomer.getTotalCostOfRoomsForCustomer( ) }</b>`;
    return currentCustomer.customerBookingHistory.map( booking => {
        bookingHitsoryTitleText.innerText = `You have ${ currentCustomer.customerBookingHistory.length } rooms in your booking history.`
        bookingHistoryDisplay.innerHTML += 
            `<section class="grid-item grid-item-1">
                <img class= "hotel-image" src='./images/hotel-room.jpg' alt="hotel-image">
                <p class="booking-date">${ booking.date }</p>
                <p class="booking-room-type">${ booking.roomDetails.roomType.toLowerCase( )
                .split(' ')
                .map( ( word ) => word.charAt( 0 ).toUpperCase( ) + word.substring( 1 ) )
                .join(' ') }</p>
                <p class="booking-cost">Room Cost: $${ booking.roomDetails.costPerNight }</p>
            </section>`
    } )
}


function displayDateInTitle( e ){
    let date = new Date( e.target.value )
    let day = date.getDate( ) +1;
    let month = date.getMonth( ) +1;
    let year = date.getFullYear( );
    return `${ month }/${ day }/${ year }`;
}


function getAvailableRoomsByDate( e ) {
    availavbleRoomsByDateGrid.innerHTML = '';
    e.preventDefault( );
    bookingHistoryDisplay.classList.add( 'hidden' );
    availavbleRoomsByTypeGrid.classList.add( 'hidden' );
    returnHomeButton.classList.remove( 'hidden' );
    availavbleRoomsByDateGrid.classList.remove( 'hidden' );
    roomTypesDiv.classList.remove('hidden')
    roomTypeDropDownMenu += `<option value="${ roomTypeDropDownMenu.value }">${ roomTypeDropDownMenu.value }</option>`
    hotel.checkAvailabilityByDate( e.target.value )
    hotel.roomAvailability.forEach( availableRoom => {
        if( !hotel.roomAvailability.length ) {
            bookingHitsoryTitleText.innerText = `We FIERCELY appologize, but there are no rooms available on ${ fullDate }. Please choose another date.`;  
        } else {
            bookingHitsoryTitleText.innerText = `There are ${ hotel.roomAvailability.length } rooms available on ${ displayDateInTitle( e ) }`;  
            availavbleRoomsByDateGrid.innerHTML += 
            `<section class="grid-item grid-item-1">
                <img class= "hotel-image" src='./images/hotel-room.jpg' alt="hotel-image">
                <p class="booking-date">${ availableRoom.roomType.toLowerCase( )
                    .split(' ')
                    .map( ( word ) => word.charAt( 0 ).toUpperCase( ) + word.substring( 1 ) )
                    .join(' ') }</p>
                <p class="booking-room-type">${ availableRoom.bedSize.charAt( 0 ).toUpperCase( ) + availableRoom.bedSize.slice( 1 ) } Bed</p>
                <p class="booking-cost">Room Cost: $${ availableRoom.costPerNight }</p>
                <input type="submit" value="Book It!" name="select-booking" class="submit-button" id="${ availableRoom.number }"></input>
            </section>`
        }
        // if( e.target.type === 'select-one') {
        //     filterAvailableRoomsByRoomTypeOnPage( e )
        // }       
    } )   
}


function displayDateInRoomTypeTitle( input ){
    let date = new Date( input.value )
    let day = date.getDate( ) +1;
    let month = date.getMonth( ) +1;
    let year = date.getFullYear( );
    return `${ month }/${ day }/${ year }`;
}


function filterAvailableRoomsByRoomTypeOnPage( e ){
    // e.preventDefault();
    availavbleRoomsByTypeGrid.innerHTML = ''
    availavbleRoomsByDateGrid.classList.add( 'hidden' );
    availavbleRoomsByTypeGrid.classList.remove( 'hidden' );
    const filteredRoomsByType = hotel.filterAvailableRoomsByType( e.target.value );
    filteredRoomsByType.forEach( availableRoom => {
            bookingHitsoryTitleText.innerText = `There are ${ filteredRoomsByType.length } ${ e.target.value.toLowerCase( )
                .split(' ')
                .map( ( word ) => word.charAt( 0 ).toUpperCase( ) + word.substring( 1 ) )
                .join(' ') }s Available on ${ displayDateInRoomTypeTitle( calendarInput ) }`;  
            availavbleRoomsByTypeGrid.innerHTML += 
            `<section class="grid-item grid-item-1">
                <img class= "hotel-image" src='./images/hotel-room.jpg' alt="hotel-image">
                <p class="booking-date">${ availableRoom.roomType.toLowerCase( )
                    .split(' ')
                    .map( ( word ) => word.charAt( 0 ).toUpperCase( ) + word.substring( 1 ) )
                    .join(' ') }</p>
                <p class="booking-room-type">${ availableRoom.bedSize.charAt( 0 ).toUpperCase( ) + availableRoom.bedSize.slice( 1 ) } Bed</p>
                <p class="booking-cost">Room Cost: $${ availableRoom.costPerNight }</p>
                <input type="submit" value="Book It!" name="submit-button" class="submit-button" id="${ availableRoom.number }"></input>
            </section>`
        // }
    } )   
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
            window.alert( `WOO HOO!!! You're room is booked for ${ dayjs( response[ 0 ].newBooking.date ).format("dddd, MMMM D YYYY") }!` )
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
            console.log('RESPONSE for VALID USER: ', response)
            loadData( response ) 
            currentCustomer = new Customer( response );
            console.log('CURRENT CUSTOMER after VALID LOGIN: ', currentCustomer)
        } )
        .catch( error => console.log( error ) )
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
    console.log('LISTOFCUSTOMERS: ', listOfCustomers)
    let stuff = new Customer( listOfCustomers );
    console.log('STUFF: ', stuff)
    return stuff
}

