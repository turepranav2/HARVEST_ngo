/* eslint-disable no-console */
const bcrypt = require('bcryptjs')
const prisma = require('../src/lib/prisma')

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@harvest.org'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123'

  const hashed = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: hashed,
      name: 'Super Admin',
    },
  })

  console.log(`Admin ready: ${admin.email}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


