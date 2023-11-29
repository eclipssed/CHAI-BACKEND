import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from the request body
  const { userName, fullName, email, password } = req.body;

  // check if the user details are not empty
  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    return res.ApiError(200, `requied field is necessary.`);
  }

  // check if user doesn't already exist
  const existedUser = User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existedUser) {
    return new ApiError(409, "User with email and userName already exists.");
  }

  // check if the avatar and image exist
  const avatarLocatPath = req.files?.avatar[0]?.path;
  const coverImageLocatPath = req.files?.coverImage[0]?.path;

  if (!avatarLocatPath) {
    return new ApiError(400, "Avatar is required.");
  }

  // upload the image and avatar to cloundinary
  const avatar = await uploadOnCloudinary(avatarLocatPath);
  const coverImage = await uploadOnCloudinary(coverImageLocatPath);

  if (!avatar) {
    return new ApiError(400, "Avatar is required.");
  }

  // create user object in the db
  const user = await User.create({
    email,
    password,
    fullName,
    userName: userName.toLowerCase(),
    coverImage: coverImage?.url || "",
    avatar: avatar.url,
  });

  // remove password and refresh token form the res
  const createdUser = await User.findOne(user._id)?.select(
    "-password -refreshToken"
  );

  // check if user is successfully created
  if (!createdUser) {
    return new ApiError(
      500,
      "something went wrong while registering the user."
    );
  }

  // return the response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "Successfully created the user."));
});

export default registerUser;
