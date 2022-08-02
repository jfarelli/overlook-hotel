// import chai from 'chai';
import { expect } from 'chai'; 
import Bookings from '../src/classes/Bookings';
import Customers from '../src/classes/Customers'; 
import Rooms from '../src/classes/Rooms';
import Hotel from '../src/classes/Hotel';
import bookingsData from '../src/sample-data/bookings-sample-data';
import customersData from '../src/sample-data/customers-sample-data';
import roomsData from '../src/sample-data/rooms-sample-data';

describe( 'Hotel', ( ) => {
    let bookingData;

    let customer1;

    let booking1;

    let room1;

    let hotel1;

    beforeEach( ( ) => {
        bookingData = bookingsData.map( bookings => new Bookings( bookings ) )
        
        customer1 = new Customers( customersData[ 0 ] );

        booking1 = new Bookings( bookingsData[ 0 ] );

        room1 = new Rooms( roomsData[ 0 ] );

        hotel1 = new Hotel( customersData, roomsData, bookingsData  )

    } );

    it( 'Should be a function', ( ) => {
      expect( Hotel ).to.be.a('function');
    } );
    
    it( 'Should be an instance of Hotel', ( ) => {
        expect( hotel1 ).to.be.an.instanceOf( Hotel );
    } );
    
    it( 'Should store all Rooms in the Hotel', ( ) => {
      expect( hotel1.allRooms).to.equal( roomsData );
    } ); 
    
    it( 'Should store all Bookings in the Hotel', ( ) => {
        expect( hotel1.allBookings).to.equal( bookingsData );
    } ); 

    it( 'Should store all Customer Data in the Hotel', ( ) => {
        expect( hotel1.allCustomers).to.equal( customersData );
    } ); 

    it( 'Should store available Rooms in the Hotel', ( ) => {
        expect( hotel1.roomAvailability).to.be.a( "array" );
        expect( hotel1.roomAvailability).to.deep.equal( [ ] );
    } ); 

    it( 'Should check Room Availability', ( ) => {
        hotel1.checkAvailabilityByDate( "2022/01/24" )
        expect( hotel1.roomAvailability).to.be.a( "array" );
        expect( hotel1.roomAvailability).to.deep.equal
            ( 
                [
                    {
                        number: 3,
                        roomType: 'suite',
                        bidet: false,
                        bedSize: 'king',
                        numBeds: 1,
                        costPerNight: 491.14
                    },
                    {
                        number: 4,
                        roomType: 'single room',
                        bidet: false,
                        bedSize: 'queen',
                        numBeds: 1,
                        costPerNight: 429.44
                    },
                    {
                        number: 5,
                        roomType: 'single room',
                        bidet: true,
                        bedSize: 'twin',
                        numBeds: 2,
                        costPerNight: 340.17
                    }
                ]
            );
        hotel1.checkAvailabilityByDate( "2022/02/16" )
        expect( hotel1.roomAvailability).to.be.a( "array" );
        expect( hotel1.roomAvailability).to.deep.equal
            ( 
                [
                    {
                        number: 2,
                        roomType: 'junior suite',
                        bidet: false,
                        bedSize: 'full',
                        numBeds: 2,
                        costPerNight: 477.38
                    },
                    {
                        number: 3,
                        roomType: 'suite',
                        bidet: false,
                        bedSize: 'king',
                        numBeds: 1,
                        costPerNight: 491.14
                    },
                    {
                        number: 4,
                        roomType: 'single room',
                        bidet: false,
                        bedSize: 'queen',
                        numBeds: 1,
                        costPerNight: 429.44
                    },
                    {
                        number: 5,
                        roomType: 'single room',
                        bidet: true,
                        bedSize: 'twin',
                        numBeds: 2,
                        costPerNight: 340.17
                    }
                ]
            );
    } ); 

} );