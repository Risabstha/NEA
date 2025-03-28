import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const user = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// // DELETE user by ID
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }