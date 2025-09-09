const cron = require('node-cron');
const Reminder = require('../models/Reminder');

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const due = await Reminder.find({ dateTime: { $lte: now }, sent: false }).populate('patient');
  for (const r of due) {
    // TODO: send email / sms
    console.log(`Reminder for patient: ${r.patient.name} at ${r.dateTime}`);

    r.sent = true;
    await r.save();
  }
});
