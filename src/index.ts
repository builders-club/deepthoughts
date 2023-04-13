import Express from 'express'
import { Tigris } from '@tigrisdata/core'
import dotenv from 'dotenv'
import { apiRouter } from './api'
import { DeepThought } from './db/deepThought'

dotenv.config()

const tigrisClient = new Tigris()
tigrisClient.registerSchemas([DeepThought])
    .then(() => {

        const app = Express()

        app.use(Express.static('src/public'))

        app.use(Express.json())

        app.use('/api', apiRouter)

        app.listen(4000, () => {
            console.log('Server is running')
        })
    })
    .catch((err) => {
        console.error(err)
    })


