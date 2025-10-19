# EmailJS Setup Guide for Contact Form

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" as your email service
4. Connect your Gmail account
5. Note down the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Message from {{name}}

From: {{email}}
Name: {{name}}
Reason: {{reason}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., `user_abc123xyz789`)

### Step 5: Update Your Portfolio
1. Open `src/main.jsx`
2. Find these lines (around line 821-823):
```javascript
const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

3. Replace with your actual values:
```javascript
const PUBLIC_KEY = 'user_abc123xyz789';
const SERVICE_ID = 'service_abc123';
const TEMPLATE_ID = 'template_xyz789';
```

### Step 6: Test Your Form
1. Save the file
2. Refresh your portfolio website
3. Go to the Contact section
4. Fill out and submit the form
5. Check your Gmail inbox!

## ✅ That's It!

Your contact form will now send emails directly to your Gmail inbox whenever someone submits a message through your portfolio!

## 📧 What You'll Receive

Each email will contain:
- **Sender's Name**
- **Sender's Email** (so you can reply directly)
- **Reason for Contact** (collaboration, job opportunity, etc.)
- **Full Message**

## 🔧 Troubleshooting

**If emails aren't arriving:**
1. Check your spam folder
2. Verify all IDs are correct in the code
3. Make sure your Gmail account is properly connected to EmailJS

**If you need help:**
- EmailJS has great documentation: [docs.emailjs.com](https://docs.emailjs.com/)
- Free plan allows 200 emails/month (perfect for a portfolio!)

---

**Note:** The free EmailJS plan is perfect for portfolio websites and includes everything you need!
