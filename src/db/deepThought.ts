import { TigrisCollection, Field, PrimaryKey, TigrisDataTypes } from "@tigrisdata/core"

@TigrisCollection("deepThoughts")
export class DeepThought {

    @PrimaryKey(TigrisDataTypes.UUID, { order: 1, autoGenerate: true })
    id?: string

    @Field()
    thought!: string

}