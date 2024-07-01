import { Inter } from "next/font/google"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [base64Image, setBase64Image] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const uploadDataToSheet = async () => {
    const imageData = await readImage()
    console.log(imageData)

    const response = await fetch(`/api/googleSheets/updateSheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: imageData?.name, description: imageData?.description, volume: imageData?.volume, expirationDate: imageData?.expirationDate, uploadDate: imageData?.uploadDate})
    })
    const data = await response.json()
    console.log(data)
  }

  const readImage = async () => {
    const response = await fetch(`/api/openai/getPictureData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64: base64Image})
    })
    const data = await response.json()
    console.log(data)
    return data?.data
  }
  return (
    <main>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button className="bg-black text-white p-3" onClick={() => uploadDataToSheet()}>Test</button>
    </main>
  )
}
