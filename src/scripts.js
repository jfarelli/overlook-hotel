import './images/hotel-room.jpg'
import './css/styles.css';
import { getData } from './apiCalls';
// import { postData } from './apiCalls';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer';
import Hotel from './classes/Hotel';
// import dayjs from 'dayjs';
// dayjs( ).format( );
// console.log('DAYJS: ', dayjs( ).format( ))


// ============================ GLOBAL VARIABLES =====================================
let listOfRooms;
let listOfBookings;
let listOfCustomers;
let currentCustomer;
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


// ============================ EVENT LISTENERS ======================================
window.addEventListener( 'load', loadData );
calendarInput.addEventListener( 'change', getAvailableRoomsByDate )
roomTypeDropDownMenu.addEventListener( 'change', filterAvailableRoomsByRoomTypeOnPage )


function loadData( ) {
    Promise.all( [ getData( 'customers' ), getData( 'rooms' ), getData( 'bookings' ) ] ).then( data => {
        listOfCustomers = data[ 0 ].customers;
        listOfRooms = data[ 1 ].rooms;
        listOfBookings = data[ 2 ].bookings;
        currentCustomer = new Customer( listOfCustomers[ Math.floor( Math.random( ) * listOfCustomers.length ) ] ) 
        console.log('CURRENT CUSTOMER: ', currentCustomer)
        hotel = new Hotel( listOfCustomers, listOfRooms, listOfBookings )
        displayRandomCustomerInfo( )
        displayCustomersBookingHistory( )
        } );
}


function displayRandomCustomerInfo( ) {
    welcomeMessage.innerText = `Welcome, ${ currentCustomer.name }!`;
}


function displayCustomersBookingHistory( ) {
    currentCustomer.getCustomersBookingHistory( listOfBookings, listOfRooms )
    customerRoomsTotalCost.innerHTML = `$${currentCustomer.getTotalCostOfRoomsForCustomer( )}`
    return currentCustomer.customerBookingHistory.map( booking => {
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
    e.preventDefault();
    bookingHistoryDisplay.classList.add( 'hidden' );
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
                <button class="book-it-button" id="bookIt">Book It!</button>
            </section>`
        }
        if( e.target.type === 'select-one') {
            filterAvailableRoomsByRoomTypeOnPage( e )
        }       
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
    e.preventDefault();
    availavbleRoomsByDateGrid.classList.add( 'hidden' );
    availavbleRoomsByTypeGrid.classList.remove( 'hidden' );
    hotel.filterAvailableRoomsByType( e.target.value );
    hotel.roomAvailability.forEach( availableRoom => {
            bookingHitsoryTitleText.innerText = `There are ${ hotel.roomAvailability.length } ${ e.target.value.toLowerCase( )
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
                <button class="book-it-button" id="bookIt">Book It!</button>
            </section>`
        // }
    } )   
}

