import OpenAI from "openai"

export const config = {
    maxDuration: 300
}

export default async function handler(req, res) {
    const { base64 } = req.body
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "Return in json format the content of the substance in the image. Do not add any extra text or information. The format must be: {name: name of product, description: description, expirationDate: expiration date: uploadDate: current date, volume: volume of product}" },
                  {
                    type: "image_url",
                    image_url: {
                      "url": `${base64}`,
                    },
                  },
                ],
                
              },
            ],
            response_format: { "type": "json_object" }
          })
        const stringJson = JSON.stringify(response.choices[0])
        const parseDate = JSON.parse(stringJson)
      res.status(200).json({ data : JSON.parse(response.choices[0].message.content)})
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}