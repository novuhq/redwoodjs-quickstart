import { Novu } from '@novu/node'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

const novu = new Novu(process.env.NOVU_API_KEY)

export async function sendNotification(email, name, message) {
  await novu.trigger('on-boarding-notification-yMs3IjDph', {
    to: {
      subscriberId: process.env.REDWOOD_ENV_SUBSCRIBER_ID,
      email: email,
    },
    payload: {
      name: name,
      message: message,
    },
  })
}

export const contacts = () => {
  return db.contact.findMany()
}

export const contact = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact = ({ input }) => {
  validate(input.email, 'email', { email: true })

  sendNotification(input.email, input.name, input.message)

  return db.contact.create({
    data: input,
  })
}

export const updateContact = ({ id, input }) => {
  return db.contact.update({
    data: input,
    where: { id },
  })
}

export const deleteContact = ({ id }) => {
  return db.contact.delete({
    where: { id },
  })
}
