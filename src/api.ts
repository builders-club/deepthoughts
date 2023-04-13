import { Router } from "express"
import { Tigris } from '@tigrisdata/core'
import { DeepThought } from "./db/deepThought"


export const apiRouter: Router = Router()

apiRouter.get("", async (req, res) => {
    const tigrisClient = new Tigris()
    const db = tigrisClient.getDatabase()

    const thoughtCollection = db.getCollection<DeepThought>(DeepThought)

    const thoughtCursor = thoughtCollection.findMany({})
    const thoughts = await thoughtCursor.toArray()
    const thought = thoughts.sort(() => 0.5 - Math.random())[0]

    return res.status(200).json(thought).send()
})

apiRouter.get("/seed", async (req, res) => {
    const tigrisClient = new Tigris()
    const db = tigrisClient.getDatabase()

    const thoughtCollection = db.getCollection<DeepThought>(DeepThought)
    const thoughts = await thoughtCollection.insertMany(seedThoughts);

    return res.status(200).json(thoughts).send()
})

apiRouter.get("/:id", async (req, res) => {
    const tigrisClient = new Tigris()
    const db = tigrisClient.getDatabase()

    const thoughtCollection = db.getCollection<DeepThought>(DeepThought)
    const thought = await thoughtCollection.findOne({ filter: { id: req.params.id } })

    if (!thought) {
        res.status(404).json({ message: "Not found" }).send()
    }

    return res.status(200).json(thought).send()
})


const seedThoughts = [
    {
        thought: 'I hope if dogs ever take over the world, and they chose a king, they don’t just go by size, because I bet there are some Chihuahuas with some good ideas.'
    },
    {
        thought: 'If I ever get real rich, I hope I’m not real mean to poor people, like I am now.'
    },
    {
        thought: 'If trees could scream, would we be so cavalier about cutting them down? We might, if they screamed all the time, for no good reason.'
    },
    {
        thought: 'Before you criticize someone, you should walk a mile in their shoes. That way when you criticize them, you are a mile away from them and you have their shoes.'
    },
    {
        thought: 'I can picture in my mind a world without war, a world without hate. And I can picture us attacking that world, because they’d never expect it.'
    },
    {
        thought: 'If trees could scream, would we be so cavalier about cutting them down? We might, if they screamed all the time, for no good reason.'
    },
    {
        thought: 'Sometimes when I reflect back on all the beer I drink I feel ashamed. Then I look into the glass and think about the workers in the brewery and all of their hopes and dreams. If I didn’t drink this beer, they might be out of work and their dreams would be shattered. Then I say to myself, It is better that I drink this beer and let their dreams come true than to be selfish and worry about my liver.'
    },
    {
        thought: 'To me, boxing is like a ballet, except there’s no music, no choreography, and the dancers hit each other.'
    },
    {
        thought: 'Do you know what happens when you slice a golf ball in half? Someone gets mad at you. I found this out the hard way.'
    }
]
