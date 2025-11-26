const nodemailer = require('nodemailer')
const config = require('../config/env')

let transporter

const isConfigured = () =>
  Boolean(
    config.email.enabled &&
      config.email.host &&
      config.email.user &&
      config.email.pass
  )

const getTransporter = () => {
  if (!transporter) {
    if (!isConfigured()) {
      throw new Error('Email service is not fully configured.')
    }

    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    })
  }
  return transporter
}

const formatCurrency = (amount, currency = 'INR') => {
  const numeric =
    typeof amount === 'string'
      ? Number(amount)
      : typeof amount === 'number'
        ? amount
        : amount?.toNumber
          ? amount.toNumber()
          : 0
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(numeric)
}

const sendDonationReceipt = async ({
  to,
  name,
  amount,
  currency = 'INR',
  orderId,
  paidAt = new Date(),
}) => {
  if (!isConfigured() || !to) {
    return { skipped: true }
  }

  const mailer = getTransporter()
  const formattedAmount = formatCurrency(amount, currency)

  const subject = `Thank you for donating ${formattedAmount}`
  const message = `
    <p>Hi ${name || 'Friend'},</p>
    <p>We have successfully received your contribution of <strong>${formattedAmount}</strong>.</p>
    <p><strong>Order ID:</strong> ${orderId}<br/>
    <strong>Payment Date:</strong> ${new Date(paidAt).toLocaleString()}</p>
    <p>Your donation empowers HĀRVÉST to continue building sustainable, community-led change.</p>
    <p>Warm regards,<br/>Team HĀRVÉST</p>
  `

  await mailer.sendMail({
    from: config.email.from || config.email.user,
    to,
    subject,
    html: message,
  })

  return { success: true }
}

module.exports = {
  sendDonationReceipt,
  isConfigured,
}


