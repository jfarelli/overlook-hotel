// import chai from 'chai';
import { expect } from 'chai'; 
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer'; 
import Room from '../src/classes/Room';
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
    bookingData = bookingsData.map( booking => new Booking( booking ) )
    
    customer1 = new Customer( customersData[ 0 ] );
    customer2 = new Customer( customersData[ 1 ] );

    booking1 = new Booking( bookingData[ 0 ] );
    booking2 = new Booking( bookingData[ 4 ] );

    // room1 = new Room( roomsData[ 0 ] );
    // room2 = new Room( roomsData[ 1 ] );

  } );

  it( 'Should be a function', ( ) => {
    expect( Customer ).to.be.a('function');
  } );

  it( 'Should be an instance of Customer', ( ) => {
    expect( customer1 ).to.be.an.instanceOf( Customer );

    expect( customer2 ).to.be.an.instanceOf( Customer );
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
    customer1.getCustomersBookingHistory( bookingData, roomsData );
    expect( customer1.customerBookingHistory ).to.be.a( "array" );
    expect( customer1.customerBookingHistory[ 0 ].id ).to.equal( booking1.id );

    customer2.getCustomersBookingHistory( bookingData, roomsData )
    expect( customer2.customerBookingHistory ).to.be.a( "array" );
    expect( customer2.customerBookingHistory[ 0 ].id ).to.equal( booking2.id );
  } );

  it( 'Should get the TOTAL COST of Customer\'s Booking HISTORY', ( ) => {
    customer1.getCustomersBookingHistory( bookingData, roomsData );
    expect( customer1.getTotalCostOfRoomsForCustomer( ) ).to.equal( '1685.32' );

    customer2.getCustomersBookingHistory( bookingData, roomsData );
    expect( customer2.getTotalCostOfRoomsForCustomer( ) ).to.equal( '1326.92' );
  } );

} );
