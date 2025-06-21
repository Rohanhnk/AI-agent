import { JSONFilePreset } from "lowdb/node";
import type { AIMessage } from "../types";
import {v4 as uuidv4} from "uuid"

export type MessageWithMetadata = AIMessage & { 
    id: string
    createdAt: string
}

type Data = {
    message: MessageWithMetadata[]
}

export const addMetadata = (message: AIMessage) => {
    return{
        ...message,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
    }
}

 export const removeMetadata = (message: MessageWithMetadata) => {
    const {id, createdAt, ...rest } = message 
    return rest 
 }

 const defaultData: Data = {
    message: [],
 }

 export const getDb = async () => {
    const db = await JSONFilePreset<Data>('db.json', defaultData)
    return db
 }

 export const addMessages = async ( messages: AIMessage[]) => {
    const db = await getDb()
    db.data.message.push(...messages.map(addMetadata))
    await db.write()
 }

 export const getMessages = async () => {
    const db = await getDb()
    return db.data.message.map(removeMetadata)
 }

