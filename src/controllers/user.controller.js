import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "you did it by yourself man. You are genius.",
  });
});

export default registerUser;
