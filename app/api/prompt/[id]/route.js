import { connectToDB } from "@utils/database"
import { Prompt } from "@models/prompt"

// GET prompt
export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
    return new Response('failed to fetch prompt', { status: 500 })
  }
}

// EDIT prompt
export const PATCH = async (request, { params }) => {

  const { prompt, tag } = await request.json()

  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id)

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })

  } catch (error) {
    return new Response('failed to update prompt', { status: 500 })
  }
}

// DELETE prompt
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndDelete(params.id)

    return new Response('Promopt has been deleted', { status: 200 })

  } catch (error) {
    console.log(error)
    return new Response('failed to delete prompt', { status: 500 })
  }
}