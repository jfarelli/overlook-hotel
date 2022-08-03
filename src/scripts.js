import './images/hotel-room.jpg'
import './css/styles.css';
import { getData } from './apiCalls';
// import { postData } from './apiCalls';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer';
import Hotel from './classes/Hotel';


// ============================ GLOBAL VARIABLES =====================================
let listOfRooms;
let listOfBookings;
let listOfCustomers;
let currentCustomer;
// let room;
// let booking;
let hotel;


// ====================== QUERY SELECTORS / ELEMENTS BY ID ===========================
let welcomeMessage = document.querySelector( '.welcome-message' );
// let customerRoomsTotalCost = document.querySelector( '.total-rooms-cost' );
let bookingHistoryDisplay = document.querySelector( '.bottom-grid' );

// ============================ EVENT LISTENERS ======================================
window.addEventListener( 'load', loadData );


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
    welcomeMessage.innerText = `Welcome, ${ currentCustomer.name.split( ' ' )[ 0 ] }!`;
}

function displayCustomersBookingHistory( ) {
    currentCustomer.getCustomersBookingHistory( listOfBookings, listOfRooms )
    console.log('CURR CUSTOMER: ', currentCustomer)
    return currentCustomer.customerBookingHistory.map( booking => console.log('BOOKING: ', booking))
}


{/* <section class="grid-item grid-item-1">
    <img class= "hotel-image" src='./images/hotel-room.jpg' alt="hotel-image">
    <p class="booking-date">5/22/2002</p>
    <p class="booking-room-type">Residential Suite</p>
    <p class="booking-cost">Total Cost: $769.53</p>
</section> */}