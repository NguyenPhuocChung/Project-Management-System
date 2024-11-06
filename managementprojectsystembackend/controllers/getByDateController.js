const Calendaring = require("../models/calendaringModel");

const getEventsByDate = async (req, res) => {
  const { startDate } = req.query; // Lấy ngày từ body
  console.log("day là ", startDate);
  try {
    const events = await Calendaring.find({ startDate: startDate }); // Tìm các sự kiện theo ngày
    return res.status(200).json(events || []); // Ensure tasks is always an array
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  getEventsByDate,
};
