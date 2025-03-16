import Meeting from "../models/meetingModel.js";

// export const getMeetings = async (req, res) => {
//   try {
//     const meetings = await Meeting.find();
//     res.json(meetings);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const getMeetings = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const meetings = await Meeting.find({ user: req.user.id })
      .sort({ date: -1 }); // ✅ Ascending order (oldest first)

    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// export const createMeeting = async (req, res) => {
//   const { location, date, time, remarks } = req.body;
//   try {
//     const newMeeting = new Meeting({ location, date, time, remarks });
//     await newMeeting.save();
//     res.status(201).json(newMeeting);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const createMeeting = async (req, res) => {
  try {
    const { date, type, location, description, time, priority } = req.body;

    if (!date || !type || !location || !description || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const newMeeting = new Meeting({
      user: req.user.id,
      date: new Date(date), // ✅ Convert to Date object before saving
      type,
      location,
      description,
      time,
      priority: priority || "normal",
    });

    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const updateMeeting = async (req, res) => {
//   try {
//     const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedMeeting);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const deleteMeeting = async (req, res) => {
//   try {
//     await Meeting.findByIdAndDelete(req.params.id);
//     res.json({ message: "Meeting deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Delete a meeting
export const deleteMeeting = async (req, res) => {
  const meetingId = req.params.id;

  try {
      const meeting = await Meeting.findById(meetingId);
      if (!meeting) {
          return res.status(404).json({ message: "Meeting not found" });
      }

      await meeting.deleteOne(); // Use deleteOne() instead of remove() (deprecated)
      res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error, unable to delete meeting" });
  }
};



//  Update a meeting fine
export const updateMeeting = async (req, res) => {
    const { type, location, description, date, time, priority } = req.body;

    // Check if required fields are present
    if (!type || !location || !description || !date || !time || !priority) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        // Your logic to update the meeting
        const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(meeting);
    } catch (error) {
        console.error('Error updating meeting:', error);
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

// Function to get the start and end of a given date
export const getStartAndEndOfDate = (date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0); // Start of the day (00:00:00)

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999); // End of the day (23:59:59)

  return { startOfDay, endOfDay };
};

// export const getData = async (req, res) => {
//   const { filter } = req.query; // filter can be 'yesterday', 'today', 'tomorrow', or 'overmorrow'
//   let startDate, endDate;

//   const today = new Date();

//   if (filter === 'yesterday') {
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);
//     ({ startOfDay: startDate, endOfDay: endDate } = getStartAndEndOfDate(yesterday));
//   } else if (filter === 'today') {
//     ({ startOfDay: startDate, endOfDay: endDate } = getStartAndEndOfDate(today));
//   } else if (filter === 'tomorrow') {
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
//     ({ startOfDay: startDate, endOfDay: endDate } = getStartAndEndOfDate(tomorrow));
//   } else if (filter === 'overmorrow') {
//     const overmorrow = new Date(today);
//     overmorrow.setDate(today.getDate() + 2);
//     ({ startOfDay: startDate, endOfDay: endDate } = getStartAndEndOfDate(overmorrow));
//   }

//   try {
//     const data = await Data.find({
//       date: {
//         $gte: startDate,  // greater than or equal to the start of the day
//         $lte: endDate,    // less than or equal to the end of the day
//       },
//     });

//     res.json(data);
//   } catch (err) {
//     res.status(500).send('Error fetching data');
//   }
// };


