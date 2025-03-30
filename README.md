
// to install all dependencies

npm install
npm start to start the server

app.use('/users',userRoutes)
app.use('auth',authRoutes)
router.post("/", createUser); // Route to create a new user
router.get("/", getAllUsers); // Route to get all users
router.get("/:id", getUserById); // Route to get a user by ID
router.put("/:id", verifyToken, updateUser); // Route to update a user
router.delete("/:id", verifyToken, deleteUser); // Route to delete a user
router.post("/auth/send-otp", sendOtp);
router.post("/auth/verify",verifyOtp);

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
