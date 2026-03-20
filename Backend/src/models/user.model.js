import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // handles createdAt & updatedAt automatically
  }
);

// ─────────────────────────────────────────────
// PRE MIDDLEWARE: Hash password before save
// ─────────────────────────────────────────────
userSchema.pre("save", async function () {
  // Only hash if password_hash field is new or modified
  if (!this.isModified("password")) return ;

  this.password = await bcrypt.hash(this.password, 10);
});

// ─────────────────────────────────────────────
// METHOD: Compare / match plain password with hash
// ─────────────────────────────────────────────
userSchema.methods.isPasswordCorrect = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// ─────────────────────────────────────────────
// METHOD: Generate Access Token (short-lived JWT)
// ─────────────────────────────────────────────
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.userName,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
    }
  );
};

// ─────────────────────────────────────────────
// METHOD: Generate Refresh Token (long-lived JWT)
// ─────────────────────────────────────────────
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    }
  );
};

userSchema.methods.generateVerificationToken = function () {
  // 1. Create a random plain token
  const plainToken = crypto.randomBytes(32).toString("hex");

  // 2. Hash it before storing in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(plainToken)
    .digest("hex");

  this.verificationToken = hashedToken;
  // Token expires in 24 hours
  this.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

  // 3. Return the plain token (send this in the email/link)
  return plainToken;
};

// ─────────────────────────────────────────────
// METHOD: Generate Hashed Password Reset Token
// Returns the plain token (to be sent via email/link)
// Stores the SHA-256 hashed version in DB
// ─────────────────────────────────────────────
userSchema.methods.generatePasswordResetToken = function () {
  const plainToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(plainToken)
    .digest("hex");

  this.verificationToken = hashedToken;
  // Token expires in 1 hour
  this.verificationTokenExpiry = Date.now() + 60 * 60 * 1000;

  return plainToken;
};

// ─────────────────────────────────────────────
// STATIC HELPER: Hash a raw token (for lookup comparison)
// Usage: User.hashToken(plainToken) → hashed string
// ─────────────────────────────────────────────
userSchema.statics.hashToken = function (plainToken) {
  return crypto.createHash("sha256").update(plainToken).digest("hex");
};

export const User = mongoose.model("User", userSchema);

