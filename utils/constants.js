const USER_STATUS = {
    approved: 'APPROVED',
    pending: 'PENDING',
    rejected: 'REJECTED'
}

const USER_ROLE = {
    customer: 'CUSTOMER',
    admin: 'ADMIN',
    client: 'CLIENT'
}

const BOOKING_STATUS = {
    cancelled: 'CANCELLED',
    successful: 'SUCCESSFUL',
    processing: 'IN_PROCESS',
    expired: 'EXPIRED'
}

const PAYMENT_STATUS = {
    failed: 'FAILED',
    success: 'SUCCESS',
    pending: 'PENDING'
}

module.exports = {
    USER_STATUS,
    USER_ROLE,
    BOOKING_STATUS,
    PAYMENT_STATUS
};