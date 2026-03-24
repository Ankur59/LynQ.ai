import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";
import { sendEmail, verificatioMailContent } from "../utils/mailgen.js";

// ─────────────────────────────────────────────────────────
// HELPER: Generate access + refresh tokens and save to DB
// ─────────────────────────────────────────────────────────
const generateTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};
// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
// ─────────────────────────────────────────────────────────
const handleRegister = asyncHandler(async (req, res) => {
  const { userName, email, password, full_name, } = req.body;

  // Check if user already exists (by email OR username)
  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    throw new ApiError(
      409,
      existingUser.email === email
        ? "Email is already registered"
        : "Username is already taken"
    );
  }

  // Create the user — password is hashed by pre("save") middleware
  const user = await User.create({
    userName: userName,
    email: email,
    password: password,
    full_name: full_name,
    role: "user",
  });

  // Hashed token will be attached to this context and unhashed token in returned to return give to the user
  const verificationToken = user.generateVerificationToken();
  await user.save({ validateBeforeSave: false });


  console.log("this is verification token", verificationToken)

  await sendEmail({
    email: user.email,
    subject: "Please verify your email",
    mailgenContent: verificatioMailContent(user.userName, `${process.env.FRONTEND_BASEURL}/verification/${verificationToken}`)
  })

  return res
    .status(201)
    .json(new ApiResponse(201, "", "User created successfully"));
});

// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/login
// @desc    Login with email or username + password
// @access  Publicsuccessfully
// ─────────────────────────────────────────────────────────
const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  // Find user by email or username
  const user = await User.findOne({
    email,
  }).select("password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isBanned) {
    throw new ApiError(403, "Your account has been suspended contact administrator");
  }

  // Verify password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password_hash -refreshToken -verificationToken -passwordResetToken"
  );

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken }, "Logged in successfully")
    );
});

// ─────────────────────────────────────────────────────────
// @route   POST /api/auth/logout
// @desc    Clear refresh token and cookies
// @access  Private (requires auth middleware)
// ─────────────────────────────────────────────────────────
const handleLogout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});


const handleVerify = asyncHandler(async (req, res) => {

  const { token } = req.body

  if (!token) {
    throw new ApiError(400, "Token in required")
  }



  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");


  const userDetails = await User.findOne({
    verificationToken: hashedToken
  })

  if (!userDetails) {
    throw new ApiError(400, "Invalid Token")
  }
  if (!userDetails) {
    throw new ApiError(400, "Invalid Token")
  }

  const isTokenValid = (userDetails.verificationTokenExpiry > Date.now())

  if (!isTokenValid) {
    throw new ApiError(400, "Token Expired")
  }

  if (isTokenValid) {
    userDetails.isVerified = true
    userDetails.verificationToken = ""
    userDetails.verificationTokenExpiry = Date.now()

    userDetails.save({ validateBeforeSave: false })
  }
  res.status(200).json(new ApiResponse(200, "", "Email verified successfully"))
})

export { handleRegister, handleLogin, handleLogout, handleVerify };