enum InquiryStatus {
    pending = "PENDING",
    resolved = "RESOLVED",
}
enum InquiryColor {
    pending = "#FF9100",
    resolved = "#32CD32",
}
enum PriceFilter {
    high_to_low = "HIGH_TO_LOW",
    low_to_high = "LOW_TO_HIGH"
}
enum ContentPages{
    TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
    SECURITY_AND_PRIVACY = 'SECURITY_AND_PRIVACY'
}
enum NotificationType {
    email = "EMAIL",
    push = "PUSH"
}
enum NotificationPageType {
    contact_us = "CONTACT_US"
}
enum Selects {
    all = "ALL",
    selected = "SELECTED"
}
enum GraphType {
    Yearly = 'YEARLY',
    Monthly = 'Monthly',
    Six_Months = 'Six_Months',
    Weekly = 'Weekly',
    Daily = 'Daily',
}
export const CREDIT_CONTRACTS = 'CREDIT_CONTRACTS'
export const CREDIT_SCORE = 'CREDIT_SCORE'
export const PEER_TO_PEER_LENDING = 'PEER_TO_PEER_LENDING'
export const DEBT_REPORTING = 'DEBT_REPORTING'
export const AI_DISPUTE = 'AI_DISPUTE'
export const KUNFIRM_RECEIPT = 'KUNFIRM_RECEIPT'
export const CASH_REWARD = 'CASH_REWARD'
export const KUNFIRM_POINTS = 'KUNFIRM_POINTS'
export const KUNFIRM_REFERRAL = 'KUNFIRM_REFERRAL'
export default {
    InquiryStatus,
    PriceFilter,
    GraphType,
    InquiryColor,
    NotificationType,
    NotificationPageType,
    ContentPages,
    Selects
}