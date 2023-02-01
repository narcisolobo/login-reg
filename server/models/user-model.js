import mongoose from 'mongoose';
const { model, Schema } = mongoose;
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
const EMAIL_REGEX = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: (email) => EMAIL_REGEX.test(email),
        message: 'Please enter a valid email.',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minLength: [8, 'Password must be at least eight characters.'],
    },
  },
  { timestamps: true }
);

/* 
  We don't want to save the 'confirm password' field
  in the database. Mongoose lets you create a virtual
  field for those cases.
*/
userSchema
  .virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

/*
  Additional validation for comparing the
  password field and the confirm password
  fields.
*/
userSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate(
      'confirmPassword',
      'Passwords do not match.',
      this._confirmPassword
    );
  }
  next();
});

/* 
  Before saving the user in the database,
  hash the password.
*/
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

/* 
  Mongoose unique validator treats a unique field
  as a validation error.
*/
userSchema.plugin(uniqueValidator, {
  message: 'A user with that email already exists. Please log in.',
});

const User = model('User', userSchema);
export default User;
