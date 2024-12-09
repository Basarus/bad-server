import { doubleCsrf } from 'csrf-csrf'
import { doubleCsrfOptions } from '../config'

const { doubleCsrfProtection: csrfProtection, generateToken } =
    doubleCsrf(doubleCsrfOptions)

export { csrfProtection, generateToken }
