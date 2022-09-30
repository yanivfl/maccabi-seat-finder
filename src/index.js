require('dotenv').config();
const checksum = require('checksum');
const sendEmail = require('./sendEmail')
const ms = require("ms");
const fetchAvailableSeats = require('./fetchAvailableSeats')
const {sites, email} = require("../config/default");

console.log('Initiating Maccabi Bot...')

// todo test with Jest: https://www.freecodecamp.org/news/how-to-start-unit-testing-javascript/
// todo add other exits

const sitesWithHash = Object.entries(sites).map(async ([location, {api, url}]) => {
  console.log(`Setting up search for ${location}`);
  const availableSeats = await fetchAvailableSeats(api);
  const hash = checksum( JSON.stringify(availableSeats));
  const numberOfAvailableSeats = availableSeats.length;
  return {
    url,
    api,
    hash,
    location,
    numberOfAvailableSeats,
  }
});

const buildMessage = (url, location, availableSeats) => {
  let availableSeatsStr = '';
  availableSeats.forEach(seat => {
    availableSeatsStr += `Available Seat: ${seat}\n`
  });
  return ({
    to: email.to,
    from: email.from,
    body: `
             There are new available seats for ${location} -
             check them out here:  ${url}
             ${availableSeatsStr}`
  });
}

const lookForChanges = async (index) => {
  const {
    url,
    hash: oldHash,
    api,
    location,
    numberOfAvailableSeats,
  } = await sitesWithHash[index];
  const availableSeats = await fetchAvailableSeats(api);
  const newHash = checksum( JSON.stringify(availableSeats));

  // if the new hash and old hash are not equal, set the site hash to the new value
  // and send an SMS alerting changes
  if (newHash !== oldHash) {
    sitesWithHash[index].hash = newHash;
    if(availableSeats.length < numberOfAvailableSeats){
      console.log(`😓 Someone bought or is looking at a seat in ${location}`);
      sitesWithHash[index].numberOfAvailableSeats = availableSeats.length;
      
    }

    console.log(`💡 There are new available Seats!`);
    const { to, from, body} = buildMessage(url, location, availableSeats);
    console.log(JSON.stringify('message to be sent:', { to, from, body}));
    await sendEmail({ to, from, body});
    
  }

  // if we find no updates, report back and return
  console.log(`😓 Nothing to report on your search for ${location}`);
}

// This function will run inside our setInterval
const checkSite = (sitesObj) => {
  console.log(`🕵️  Checking for updates...`);
  sitesObj.forEach(async (site, index) => {
    await lookForChanges(index);

  });
}

// 10 minutes
setInterval(() => {
  if (sitesWithHash) {
    checkSite(sitesWithHash);
  } else {
    console.log(`No Sites to check`)
  }
}, process.env.CHECK_INTERVAL_MS || ms('30s'));
