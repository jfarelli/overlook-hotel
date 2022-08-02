import './images/hotel-room.jpg'
import './css/styles.css';
import { getData } from './apiCalls';
// import { postData } from './apiCalls';
import Rooms from '../src/classes/Rooms';
import Bookings from '../src/classes/Bookings';
import Customers from '../src/classes/Customers';


// ============================ GLOBAL VARIABLES =====================================
let listOfRooms;
let listOFBookings;
let listOfCustomers;
let currentCustomer;


// ====================== QUERY SELECTORS / ELEMENTS BY ID ===========================
let welcomeMessage = document.querySelector( '.welcome-message' );
// let customerRoomsTotalCost = document.querySelector( '.total-rooms-cost' );

// ============================ EVENT LISTENERS ======================================
window.addEventListener( 'load', loadData );


function loadData( ) {
    Promise.all( [ getData( 'customers' ), getData( 'rooms' ), getData( 'bookings' ) ] ).then( data => {
        listOfCustomers = data[ 0 ].customers;
        listOfRooms = data[ 1 ].rooms;
        listOFBookings = data[ 2 ].bookings;
        currentCustomer = new Customers( listOfCustomers[ Math.floor( Math.random( ) * listOfCustomers.length ) ] ) 
        displayRandomCustomerInfo( )
        } );
}


function displayRandomCustomerInfo( ) {
    welcomeMessage.innerText = `Welcome, ${ currentCustomer.name.split( ' ' )[ 0 ] }!`;
}
