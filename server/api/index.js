import { Router } from 'express'

import post from './post'
import category from './category'
import user from './user'
import comment from './comment'

const router = Router()


// Add USERS Routes
router.use(post)
router.use(category)
router.use(user)
router.use(comment)

export default router
