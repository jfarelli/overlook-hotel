// import chai from 'chai';
import { expect } from 'chai'; 
import Bookings from '../src/classes/Bookings';
import Customers from '../src/classes/Customers'; 
import Rooms from '../src/classes/Rooms';
import bookingsData from '../src/sample-data/bookings-sample-data';
import customersData from '../src/sample-data/customers-sample-data';
import roomsData from '../src/sample-data/rooms-sample-data';

describe( 'Customer', ( ) => {

  let customer1;
  let customer2;
  
  let bookingData;

  let booking1;
  let booking2;

  let room1;
  let room2;

  beforeEach( ( ) => {
    bookingData = bookingsData.map( bookings => new Bookings( bookings ) )
    
    customer1 = new Customers( customersData[ 0 ] );
    customer2 = new Customers( customersData[ 1 ] );

    booking1 = new Bookings( bookingData[ 0 ] );
    booking2 = new Bookings( bookingData[ 4 ] );

    room1 = new Rooms( roomsData[ 0 ] );
    room2 = new Rooms( roomsData[ 1 ] );

  } );

  it( 'Should be a function', ( ) => {
    expect( Customers ).to.be.a('function');
  } );

  it( 'Should be an instance of Customer', ( ) => {
    expect( customer1 ).to.be.an.instanceOf( Customers );

    expect( customer2 ).to.be.an.instanceOf( Customers );
  } );

  it( 'Should take in a Customer\'s ID', ( ) => {
    expect( customer1.id ).to.be.a( "number" );
    expect( customer1.id ).to.equal( customersData[0].id );

    expect( customer2.id ).to.be.a( "number" );
    expect( customer2.id ).to.equal( customersData[1].id );
  } );

  it( 'Should take in a Customer\'s NAME', ( ) => {
    expect( customer1.name ).to.be.a( "string" );
    expect( customer1.name ).to.equal( customersData[0].name );

    expect( customer2.name ).to.be.a( "string" );
    expect( customer2.name ).to.equal( customersData[1].name );
  } );

  it( 'Should be able to store a Customer\'s Booking HISTORY', ( ) => {
    expect( customer1.customerBookingHistory ).to.be.a( "array" );
    expect( customer1.customerBookingHistory ).to.deep.equal( [ ] );

    expect( customer2.customerBookingHistory ).to.be.a( "array" );
    expect( customer2.customerBookingHistory ).to.deep.equal( [ ] );
  } );

  it( 'Should get the Customer\'s Booking HISTORY', ( ) => {
    customer1.getCustomersBookingHistory( bookingData, roomsData )
    expect( customer1.customerBookingHistory[ 0 ].id ).to.equal( booking1.id );

    customer2.getCustomersBookingHistory( bookingData, roomsData )
    expect( customer2.customerBookingHistory[ 0 ].id ).to.equal( booking2.id );
  } );

  it( 'Should get the TOTAL COST of Customer\'s Booking HISTORY', ( ) => {
    customer1.getCustomersBookingHistory( bookingData, roomsData )
    expect( customer1.getTotalCostOfRoomsForCustomer( ) ).to.equal( '1685.32' );

    customer2.getCustomersBookingHistory( bookingData, roomsData )
    expect( customer2.getTotalCostOfRoomsForCustomer( ) ).to.equal( '1326.92' );
  } );

} );