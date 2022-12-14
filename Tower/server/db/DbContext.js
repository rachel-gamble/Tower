import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from '../models/Event';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Events = mongoose.model('Event', EventSchema);

  // Tickets = mongoose.model('Ticket', this.TicketSchema);
  // Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
