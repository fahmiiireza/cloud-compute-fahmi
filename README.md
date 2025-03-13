
# 🏋️ Workout Routine Tracker API

This is the **backend API** for the **Workout Routine Tracker** web app. It provides **CRUD operations** for managing workout routines using **Firebase Firestore**.

---

## 🚀 Setup & Installation

### 1️⃣ Clone this repository:
```sh
git clone https://github.com/yourusername/workout-tracker.git
cd workout-tracker/backend
```

### 2️⃣ Install dependencies:
```sh
npm install
```

### 3️⃣ Create a `.env` file and add:
```
PORT=5000
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

### 4️⃣ Start the server:
```sh
npm start
```
The API will run on **http://localhost:5000**

---

## 📌 API Endpoints

### 🔥 Create a Workout
**`POST /workouts`**  
- **Description:** Add a new workout routine.
- **Request Body:**
```json
{
  "name": "Push Day",
  "exercises": [
    { "name": "Bench Press", "sets": 4, "reps": 8 },
    { "name": "Shoulder Press", "sets": 3, "reps": 10 }
  ]
}
```
- **Response:**
```json
{
  "id": "unique_workout_id",
  "name": "Push Day",
  "exercises": [
    { "name": "Bench Press", "sets": 4, "reps": 8 },
    { "name": "Shoulder Press", "sets": 3, "reps": 10 }
  ]
}
```

---

### 📋 Get All Workouts
**`GET /workouts`**  
- **Description:** Retrieve all stored workouts.
- **Response:**
```json
[
  {
    "id": "workout_id_1",
    "name": "Push Day",
    "exercises": [
      { "name": "Bench Press", "sets": 4, "reps": 8 },
      { "name": "Shoulder Press", "sets": 3, "reps": 10 }
    ]
  },
  {
    "id": "workout_id_2",
    "name": "Leg Day",
    "exercises": [
      { "name": "Squats", "sets": 4, "reps": 10 },
      { "name": "Leg Press", "sets": 3, "reps": 12 }
    ]
  }
]
```

---

### 📄 Get a Single Workout
**`GET /workouts/:id`**  
- **Description:** Retrieve a specific workout by ID.
- **Response:**
```json
{
  "id": "workout_id_1",
  "name": "Push Day",
  "exercises": [
    { "name": "Bench Press", "sets": 4, "reps": 8 },
    { "name": "Shoulder Press", "sets": 3, "reps": 10 }
  ]
}
```

---

### ✏️ Update a Workout
**`PUT /workouts/:id`**  
- **Description:** Update an existing workout routine.
- **Request Body:**
```json
{
  "name": "Updated Push Day",
  "exercises": [
    { "name": "Incline Bench Press", "sets": 3, "reps": 8 }
  ]
}
```
- **Response:**
```json
{
  "id": "workout_id_1",
  "name": "Updated Push Day",
  "exercises": [
    { "name": "Incline Bench Press", "sets": 3, "reps": 8 }
  ]
}
```

---

### ❌ Delete a Workout
**`DELETE /workouts/:id`**  
- **Description:** Remove a workout routine by ID.
- **Response:**
```json
{ "message": "Workout deleted successfully" }
```

---

## 🛠️ Technologies Used
- **Node.js**
- **Express.js**
- **Firebase Firestore**
- **Dotenv**

---

## 📫 Contact
For any questions, feel free to contact me at **your@email.com**.

---

## 📜 License
This project is licensed under the **MIT License**.
```

✅ Now, just **copy and paste this into your `README.md`** file, and it will work perfectly! 🚀