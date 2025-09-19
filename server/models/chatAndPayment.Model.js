const mongoose = require('mongoose')

const ChatAndPaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
    },
    providerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }],
    room: {
        type: String,
        index: true // ✅ single field index
    },
    amount: Number,
    service: String,
    time: String,
    razorpayOrderId: String,
    transactionId: String,
    PaymentStatus: {
        type: String,
        default: 'pending'
    },
    newChat: { type: Boolean, default: true },
    isChatStarted: { type: Boolean, default: false },
    messages: [
        {
            sender: { type: String, required: true },
            text: String,
            file: {
                name: String,
                type: String,
                content: String, // ⚠️ If storing base64, consider moving to S3/CDN
            },
            senderName: String,
            senderRole: String,
            replyTo: {
                messageId: String,
                text: String,
                senderName: String,
                senderRole: String,
                isFile: { type: Boolean, default: false },
                isAudio: { type: Boolean, default: false },
                timestamp: Date,
            },
            isAudio: { type: Boolean, default: false },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    deleteByUser: { type: Boolean, default: false },
    deletedDateByUser: Date,
    deleteByProvider: { type: Boolean, default: false },
    deletedDateByProvider: Date,
    isManualChat: { type: Boolean, default: false },
    groupName: String,
    isGroupChatEnded: { type: Boolean, default: false },
    userChatTempDeleted: { type: Boolean, default: false },
    providerChatTempDeleted: { type: Boolean, default: false },
}, { timestamps: true })

// ✅ Compound index: room + _id (useful for pagination)
ChatAndPaymentSchema.index({ room: 1, _id: -1 })

// You can also add this if you query mostly by userId or providerId
// ChatAndPaymentSchema.index({ userId: 1 })
// ChatAndPaymentSchema.index({ providerId: 1 })

const ChatAndPayment = mongoose.model('ChatAndPayment', ChatAndPaymentSchema)
module.exports = ChatAndPayment
