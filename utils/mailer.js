const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const hash = require('./hash');

const { SEND_GRID, API_URL } = require('../config');
const { Hash } = require('../models');

sgMail.setApiKey(SEND_GRID.API_KEY);

const mailer = {
  async sendMail({ to, from, subject, text, html }) {
    return new Promise(async (resolve, reject) => {
      try {
        const msg = { to, from, subject, text, html };
        await sgMail.send(msg);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  async sendAdminVerifyMail({ email, userId }) {
    try {
      const randomby = crypto.randomBytes(20).toString('hex');
      const haash = hash.sha512(`${userId}${randomby}`);

      await Hash.create({
        userId,
        userType: 'admin',
        hash: haash,
        validTill: new Date(Date.now() + 24 * 3600000),
      });

      const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <style>
            body {
              color: rgba(0, 0, 0, 0.7);
              font-family: sans-serif;
            }
      
            .text-center {
              text-align: center;
            }
      
            .mb-2 {
              margin-bottom: 5px;
            }
      
            .mb-4 {
              margin-bottom: 20px;
            }
      
            .mt-4 {
              margin-top: 20px;
            }
      
            .block {
              width: 80%;
              margin: auto;
            }
      
            @media (min-width: 768px) {
              .block {
                width: 60%;
              }
            }
          </style>
          <title>Emergency Monitoring System - Verify Email</title>
        </head>
        <body>
          <h1 class="text-center mb-4">Confirm your email address</h1>
          <div class="text-center block">
            <div class=" mb-4">
              There’s one quick step you need to complete before access all the features of Emergency Monitoring System.
            </div>
            <div class="mb-2">
              Please click on the link below to get started :
            </div>
            <div class="mb-2">
            <a href="${API_URL}/admin/verify?hash=${haash}">Click here</a>
            </div>
      
            <small>
              Verification codes expire after 24 hour.
            </small>
      
            <div class="mb-2 mt-4">
              Thanks,
            </div>
          </div>
        </body>
      </html>
      `;

      await mailer.sendMail({
        to: email,
        from: 'noreply@ems.com',
        subject: 'Emergency Monitoring System - Verify Email',
        text: 'The verify link will expire after 24 hrs',
        html,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = mailer;
