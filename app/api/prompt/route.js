import { connectToDB } from "@utils/database"
import { Prompt } from "@models/prompt"

export const GET = async (req) => {
  // const search = req.nextUrl.searchParams.get('search')
  // const query = {
  //   $or: [
  //     { creator: { $regex: new RegExp(search, 'i') } },
  //     { prompt: { $regex: new RegExp(search, 'i') } },
  //     { tag: { $regex: new RegExp(search, 'i') } },
  //   ],
  // }

  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })

  } catch (error) {
    return new Response('failed to fetch prompts', { status: 500 })
  }
}