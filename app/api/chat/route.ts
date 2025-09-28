import { NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Information about Pasindu to help the AI respond accurately
const PASINDU_INFO = `
Name: Pasindu Weerakoon
Occupation: Undergraduate software engineering student
Education: BSc (Hons) in Software Engineering
Skills: 
- Web Development (React, Next.js, Node.js, JavaScript, HTML, CSS, Tailwind)
- Blockchain Development (Solidity, Web3.js, Ethereum)
- Full Stack Development (MERN Stack)
- UI/UX Design
- Git and version control

About me: I'm passionate about creating innovative web solutions and exploring blockchain technology. 
I enjoy building responsive web applications with modern technologies and am currently focused on 
becoming a fullstack web developer and blockchain developer.

Interests: Learning new technologies, contributing to open-source projects, participating in hackathons.

Contact: pasindupiumal0123@gmail.com
`

export async function POST(request: Request) {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" }, 
        { status: 500 }
      )
    }

    const { messages } = await request.json()

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" }, 
        { status: 400 }
      )
    }

    // Create a system message with information about Pasindu
    const systemMessage = {
      role: "system",
      content: `You are a helpful virtual assistant for Pasindu Weerakoon's portfolio website. 
      Answer questions about Pasindu based on the following information. Keep your answers concise, 
      friendly, and professional. If you don't know something specific about Pasindu that isn't 
      included in this information, you can say you don't have that specific detail but offer to 
      take a message or suggest contacting Pasindu directly. Here's information about Pasindu:
      
      ${PASINDU_INFO}`,
    }

    // Add the system message to the beginning of the conversation
    const apiMessages = [systemMessage, ...messages]

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 500,
    })

    const message = response.choices[0].message.content

    return NextResponse.json({ message })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "There was an error processing your request" }, { status: 500 })
  }
}
