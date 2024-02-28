const { CRUD } = require("../../../models/crud.model");
const {bookedRoomModel} = require("../../../models/helpers/bookedRoomList.crud.definition");
const {roomBookedDatesModel} = require("../../../models/helpers/roomBookedDates.crud.definition");
const {roomNumberModel} = require("../../../models/helpers/roomNumbers.crud.definition");
const { getDateArrayInRange } = require("../../middlewares/common.functions");

const checkRoomAvailability = async ({ checkIn, checkOut, roomtypeId }) => {
  //get the date array from requested date range for room bookings
  const dateArray = getDateArrayInRange(checkIn, checkOut);
  console.log("dateArray",dateArray);
  //Get the distinct booking id present in the requested date range by the input of date array
  const bookingId = await CRUD.distinct(roomBookedDatesModel,'bookingId',{bookedDate: { $in: dateArray }});
  //From the distinct booking id present in the requested date range check for booked room numbers
  const totalAssignedRoom = await CRUD.findAll(bookedRoomModel, {bookingId: { $in: bookingId },roomtypeId: roomtypeId,});
  //Get the total room numbers present in the selected room type
  const roomNumbers = await CRUD.findAll(roomNumberModel, {roomtypeId: roomtypeId });
  //It is just to get the total of the room numbers in number
  const totalRoomsPresent = roomNumbers.length;
  //It is just to get the total of the room booked in number
  const totalBookedRooms = totalAssignedRoom.length;
  //The difference will give the available room numbers count
  const availableRoomCount = totalRoomsPresent - totalBookedRooms;
  //Extract the room number id's 
  const roomNumberId = await totalAssignedRoom.map((d, i) => d.roomNumberId);
  //Doing indirect operation to get the available room number documents
  const availableRooms = await CRUD.findAll(roomNumberModel, {_id: { $nin: roomNumberId }, isActive: true,roomtypeId});
  //returning available room number the count and documents.
  return { count: availableRoomCount, data: availableRooms };
};

module.exports = checkRoomAvailability;
