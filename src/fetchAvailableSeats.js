const axios = require("axios");
const {consecutiveSeats: requestedConsecutiveSeats} = require('config');

const AVAILABLE_STATUS = 10;
const OCCUPIED_STATUS = 60;
const LOOKING_AT_SEAT = 20;

/**
 * Add all available seats that have at least [requestedConsecutiveSeats]
 * @param api
 * @returns {Promise<*[]>}
 */
const fetchAvailableSeats = async (api) => {
    const response = await axios.get(api);
    const seats = response?.data?.seats;
    let availableSeats = [];
    let availableConsecutiveSeats = [];
    let numberOfConsecutiveSeats = 0;
    for (const [seat, status] of Object.entries(seats)) {
        if(status === AVAILABLE_STATUS ){
            availableConsecutiveSeats.push(seat);
            numberOfConsecutiveSeats++
        }
        else {
            if(numberOfConsecutiveSeats >= requestedConsecutiveSeats){
                availableSeats = [...availableSeats, availableConsecutiveSeats];
                availableConsecutiveSeats = [];
                numberOfConsecutiveSeats = 0;
            }
        }
    }
    if(numberOfConsecutiveSeats >= requestedConsecutiveSeats){
        availableSeats = [...availableSeats, availableConsecutiveSeats];
    }
    return availableSeats;
}

module.exports = fetchAvailableSeats;