const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Store submissions in memory (in production, use a database)
const submissions = [];

// Save submission endpoint
app.post('/api/submit-quiz', async (req, res) => {
  try {
    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...req.body
    };
    
    // Store submission
    submissions.push(submission);
    
    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'andy@formulaicagency.com',
      subject: 'New Employment Quiz Submission',
      html: `
        <h2>New Employment Quiz Submission</h2>
        
        <h3>Contact Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${submission.contact.firstName} ${submission.contact.lastName}</li>
          <li><strong>Email:</strong> ${submission.contact.email}</li>
          <li><strong>Phone:</strong> ${submission.contact.phone || 'Not provided'}</li>
          <li><strong>Preferred Contact:</strong> ${submission.contact.best}</li>
        </ul>
        
        <h3>Quiz Results:</h3>
        <ul>
          <li><strong>Case Strength:</strong> ${submission.result.score}%</li>
          <li><strong>Estimated Compensation:</strong> £${submission.result.compensation.toLocaleString()}</li>
          <li><strong>Claims Selected:</strong> ${submission.claims.join(', ')}</li>
          <li><strong>Employment Status:</strong> ${submission.answers.step_1}</li>
          <li><strong>Timeline:</strong> ${submission.timeline}</li>
          <li><strong>Employment Length:</strong> ${submission.answers.step_4}</li>
          <li><strong>Salary:</strong> £${submission.salary.toLocaleString()}</li>
          <li><strong>Amount Owed:</strong> £${submission.amountOwed.toLocaleString()}</li>
          <li><strong>Conditional Answers:</strong> ${submission.answers.step_5 ? submission.answers.step_5.join(', ') : 'None'}</li>
        </ul>
        
        <p><strong>Quiz completed in:</strong> ${Math.round(submission.quizDuration / 1000)} seconds</p>
        
        <p><strong>Submission ID:</strong> ${submission.id}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all submissions (for admin purposes)
app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
