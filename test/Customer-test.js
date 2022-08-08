import { expect } from 'chai'; 
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer'; 
import bookingsData from '../src/sample-data/bookings-sample-data';
import customersData from '../src/sample-data/customers-sample-data';
import roomsData from '../src/sample-data/rooms-sample-data';

describe( 'Customer', ( ) => {

  let bookingData;

  let customer1;
  let customer2;

  beforeEach( ( ) => {
    bookingData = bookingsData.map( booking => new Booking( booking ) );
   
    customer1 = new Customer( customersData[ 0 ] );
    customer2 = new Customer( customersData[ 1 ] );

  } );

  it( 'Should be a function', ( ) => {
    expect( Customer ).to.be.a( 'function' );
  } );

  it( 'Should be an instance of Customer', ( ) => {
    expect( customer1 ).to.be.an.instanceOf( Customer );

    expect( customer2 ).to.be.an.instanceOf( Customer );
  } );

  it( 'Should take in a Customer\'s ID', ( ) => {
    expect( customer1.id ).to.be.a( "number" );
    expect( customer1.id ).to.equal( customersData[ 0 ].id );

    expect( customer2.id ).to.be.a( "number" );
    expect( customer2.id ).to.equal( customersData[ 1 ].id );
  } );

  it( 'Should take in a Customer\'s NAME', ( ) => {
    expect( customer1.name ).to.be.a( "string" );
    expect( customer1.name ).to.equal( customersData[ 0 ].name );

    expect( customer2.name ).to.be.a( "string" );
    expect( customer2.name ).to.equal( customersData[ 1 ].name );
  } );

  it( 'Should be able to store a Customer\'s Booking HISTORY', ( ) => {
    expect( customer1.customerBookingHistory ).to.be.a( "array" );
    expect( customer1.customerBookingHistory ).to.deep.equal( [ ] );

    expect( customer2.customerBookingHistory ).to.be.a( "array" );
    expect( customer2.customerBookingHistory ).to.deep.equal( [ ] );
  } );

  it( 'Should get the Customer\'s Booking HISTORY', ( ) => {
    customer1.getCustomerBookingHistory( bookingData, roomsData );
    expect( customer1.customerBookingHistory ).to.be.a( "array" );
    expect( customer1.customerBookingHistory ).to.deep.equal
      ( 
        [
          {
            id: '5fwrgu4i7k55hl6t6',
            userID: 1,
            date: '2022/01/10',
            roomNumber: 3,
            roomDetails: {
              number: 3,
              roomType: 'suite',
              bidet: false,
              bedSize: 'king',
              numBeds: 1,
              costPerNight: 491.14
            }
          },
          {
            id: '5fwrgu4i7k55hl6sz',
            userID: 1,
            date: '2022/01/24',
            roomNumber: 1,
            roomDetails: {
              number: 1,
              roomType: 'residential suite',
              bidet: true,
              bedSize: 'queen',
              numBeds: 1,
              costPerNight: 358.4
            }
          },
          {
            id: '5fwrgu4i7k55hl6t5',
            userID: 1,
            date: '2022/01/24',
            roomNumber: 2,
            roomDetails: {
              number: 2,
              roomType: 'junior suite',
              bidet: false,
              bedSize: 'full',
              numBeds: 2,
              costPerNight: 477.38
            }
          },
          {
            id: '5fwrgu4i7k55hl6t7',
            userID: 1,
            date: '2022/02/16',
            roomNumber: 1,
            roomDetails: {
              number: 1,
              roomType: 'residential suite',
              bidet: true,
              bedSize: 'queen',
              numBeds: 1,
              costPerNight: 358.4
            }
          }
        ] 
      );

    customer2.getCustomerBookingHistory( bookingData, roomsData );
    expect( customer2.customerBookingHistory ).to.be.a( "array" );
    expect( customer2.customerBookingHistory ).to.deep.equal
      ( 
        [
          {
            id: '5fwrgu4i7k55hl6ta',
            userID: 2,
            date: '2022/01/11',
            roomNumber: 1,
            roomDetails: {
              number: 1,
              roomType: 'residential suite',
              bidet: true,
              bedSize: 'queen',
              numBeds: 1,
              costPerNight: 358.4
            }
          },
          {
            id: '5fwrgu4i7k55hl6t8',
            userID: 2,
            date: '2022/02/05',
            roomNumber: 2,
            roomDetails: {
              number: 2,
              roomType: 'junior suite',
              bidet: false,
              bedSize: 'full',
              numBeds: 2,
              costPerNight: 477.38
            }
          },
          {
            id: '5fwrgu4i7k55hl6t9',
            userID: 2,
            date: '2022/02/14',
            roomNumber: 3,
            roomDetails: {
              number: 3,
              roomType: 'suite',
              bidet: false,
              bedSize: 'king',
              numBeds: 1,
              costPerNight: 491.14
            }
          }
        ]
      );
  } );

  it( 'Should get the TOTAL COST of Customer\'s Booking HISTORY', ( ) => {
    customer1.getCustomerBookingHistory( bookingData, roomsData );
    expect( customer1.getTotalCostOfRoomsForCustomer( ) ).to.be.a( "string" );
    expect( customer1.getTotalCostOfRoomsForCustomer( ) ).to.equal( '1,685.32' );

    customer2.getCustomerBookingHistory( bookingData, roomsData );
    expect( customer2.getTotalCostOfRoomsForCustomer( ) ).to.be.a( "string" );
    expect( customer2.getTotalCostOfRoomsForCustomer( ) ).to.equal( '1,326.92' );
  } );

} );
