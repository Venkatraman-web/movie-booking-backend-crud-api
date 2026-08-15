# 📧 Notification Service

A backend notification service built with **Node.js, Express.js, MongoDB, Nodemailer, and node-cron**.

The service manages email notification requests by storing them as tickets in MongoDB and processing pending notifications asynchronously through a scheduled cron job.

## 🚀 Features

- 📧 Email notification support
- 📨 Multiple recipient emails
- 💾 Notification persistence using MongoDB
- ⏳ Pending, successful, and failed notification statuses
- ⏰ Scheduled email processing using `node-cron`
- 🔐 SMTP authentication using environment variables
- ✅ Request validation
- 🧱 RESTful API structure
- 🔄 Asynchronous notification processing

## 🛠️ Tech Stack

- **Node.js** — Backend runtime
- **Express.js** — REST API framework
- **MongoDB** — Notification/ticket storage
- **Mongoose** — MongoDB ODM
- **Nodemailer** — Email delivery
- **node-cron** — Scheduled notification processing
- **dotenv** — Environment variable management
- **body-parser** — Request body parsing
- **Nodemon** — Development

## 📁 Project Structure

```text
Notification Service
│
├── controllers/
│   └── ticket.controller.js
│
├── middlewares/
│   └── ticket.middleware.js
│
├── models/
│   └── ticketNotification.model.js
│
├── routes/
│   └── ticket.routes.js
│
├── services/
│   └── email.service.js
│
├── cron/
│   └── mailer.cron.js
│
├── utils/
│   └── constants.js
│
├── index.js
├── package.json
└── .env
```

## 🏗️ Architecture

The notification flow is:

```text
Client
  ↓
POST /notiservice/api/v1/notifications
  ↓
Request Validation Middleware
  ↓
Notification Controller
  ↓
Create Ticket
  ↓
MongoDB
  ↓
Status: PENDING
  ↓
Cron Job
  ↓
Fetch Pending Tickets
  ↓
Nodemailer / SMTP
  ↓
Email Recipient(s)
  ↓
Status: SUCCESS / FAILED
```

## 📬 Notification Ticket

Each notification is stored as a ticket.

Example document:

```json
{
  "subject": "Booking Confirmation",
  "content": "Your movie booking has been successfully confirmed.",
  "recepientEmails": [
    "user@example.com"
  ],
  "status": "PENDING"
}
```

### Fields

| Field | Type | Description |
|---|---|---|
| `subject` | String | Email subject |
| `content` | String | Email body |
| `recepientEmails` | Array | Email addresses receiving the notification |
| `status` | String | Current notification status |
| `createdAt` | Date | Ticket creation time |
| `updatedAt` | Date | Last update time |

## 📊 Notification Status

The service supports three notification states:

```text
PENDING
SUCCESS
FAILED
```

### PENDING

The notification has been created but has not yet been successfully sent.

### SUCCESS

The email was successfully processed by the mail service.

### FAILED

Email delivery/processing failed.

## 📡 API

### Create Notification

```http
POST /notiservice/api/v1/notifications
```

### Request Body

```json
{
  "subject": "Booking Confirmation",
  "content": "Your booking has been successfully confirmed.",
  "recepientEmails": [
    "user@example.com"
  ]
}
```

The notification is initially stored with:

```json
{
  "status": "PENDING"
}
```

The cron worker later processes the pending ticket.

## 👥 Multiple Recipients

The `recepientEmails` field accepts multiple email addresses:

```json
{
  "subject": "Movie Booking Update",
  "content": "Your booking has been updated.",
  "recepientEmails": [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com"
  ]
}
```

This allows a single notification ticket to target multiple recipients.

## ⏰ Cron-Based Processing

The service uses `node-cron` to periodically search MongoDB for pending notifications.

Conceptually:

```text
Every scheduled interval
        ↓
Find PENDING tickets
        ↓
Send emails
        ↓
If successful → SUCCESS
        ↓
If failed → FAILED
```

This prevents the API request from having to wait for email processing to complete.

## 📧 Email Service

Emails are sent using **Nodemailer** through an SMTP provider.

The SMTP credentials are kept in environment variables rather than hardcoded in the source code.

Example:

```env
EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-password
```

For Gmail, use a **Google App Password** rather than your normal Gmail password when SMTP authentication requires it.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Navigate to the project

```bash
cd Notification-Service
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

```env
PORT=3001
DB_URL=mongodb://localhost:27017/notification-service
EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 5. Start the service

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The service will run on:

```text
http://localhost:3001
```

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port on which the notification service runs |
| `DB_URL` | MongoDB connection string |
| `EMAIL` | SMTP email account |
| `EMAIL_PASS` | SMTP password/app password |

Never commit your `.env` file.

Add:

```gitignore
.env
node_modules/
```

## 🧪 Testing

The API can be tested using Postman, Thunder Client, Insomnia, or cURL.

Example:

```http
POST http://localhost:3001/notiservice/api/v1/notifications
```

Body:

```json
{
  "subject": "Booking Confirmation",
  "content": "Your booking has been successfully confirmed.",
  "recepientEmails": [
    "user@example.com"
  ]
}
```

After the request:

```text
API Request
    ↓
Ticket stored in MongoDB
    ↓
PENDING
    ↓
Cron worker finds ticket
    ↓
Nodemailer sends email
    ↓
SUCCESS
```

## 🧠 Backend Concepts Demonstrated

This project demonstrates:

- REST API design
- Express middleware
- MVC/layered architecture
- MongoDB and Mongoose
- Background job processing
- Cron scheduling
- SMTP
- Nodemailer
- Asynchronous JavaScript
- Environment-based configuration
- Email notification workflows
- Status-based processing

## 🚧 Future Improvements

Potential improvements include:

- Message queues such as RabbitMQ or Kafka
- Retry mechanism for failed emails
- Exponential backoff
- Dead-letter queue
- Email templates
- HTML email support
- Rate limiting
- Notification priority
- Delivery tracking
- Better concurrency control for cron workers
- Centralized logging
- Dockerization
- CI/CD pipeline
