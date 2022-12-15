import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    isAttending: { type: Boolean, default: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})