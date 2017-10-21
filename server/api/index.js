import { Router } from 'express'

import post from './post'
import category from './category'

const router = Router()


// Add USERS Routes
router.use(post)
router.use(category)

export default router
