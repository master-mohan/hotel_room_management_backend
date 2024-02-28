const checkRoomAvailability = require("../../middlewares/checkRoomAvailability");

const availableRoomNumbers = async (roomNumberModel, req, res) => {
  const { roomtypeId, checkIn, checkOut } = req.body;

  //check for room availability
  const availableRooms = await checkRoomAvailability({
    checkIn,
    checkOut,
    roomtypeId,
  });

  return res.status(200).send({
    success: true,
    result: availableRooms,
  });
};

module.exports = availableRoomNumbers;
