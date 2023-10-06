export const RequestStatus = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCEEDED: 'succeeded',
    FAILED: 'failed'
};

export const PUBLISHED = 'Published'
export const DRAFT = 'Draft'

export const SIGNUP_SUCCESSFUL = "Signup Successful"
export const LOGOUT_SUCCESSFUL = "Logout Successful"

export const VERIFICATION_SUCCESSFUL = "Verification Successful"

export const PREMIUM = 'premium'

export const BASIC = 'basic'

export const PAYMENT_SUCCESSFUL = 'Payment Successful'
export const PAYMENT_CANCELLED = 'Payment Cancelled'

export const BASE_URL = "http://127.0.0.1:8000/api"
export const USER_LOGIN_URL = `${BASE_URL}/users/login/`
export const USER_SIGNUP_URL =  `${BASE_URL}/users/signup/`

export const EMAIL_VERIFICATION_URL = `${BASE_URL}/users/verifyemail/`
export const BLOG_LIST_URL = `${BASE_URL}/blogs/list/`;

export const CREATE_DRAFT_URL = `${BASE_URL}/blogs/create/`

export const DRAFT_LIST_URL = `${BASE_URL}/blogs/drafts/`

export const PUBLISHED_LIST_URL = `${BASE_URL}/blogs/published/`

export const CHECKOUT_PREMIUM_URL = `${BASE_URL}/subscription-plans/checkout/1/`
