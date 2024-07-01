
export default async function handler(req, res) {
    const { name, description, volume, expirationDate, uploadDate } = req.body
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    
    const formattedDate = `${month}/${day}/${year}`;
    try {
        const response = await fetch(`https://hook.eu2.make.com/${process.env.MAKE_WEBHOOK_ID}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, description: description, volume: volume, expirationDate: expirationDate, uploadDate: formattedDate })
        })
    
        const data = await response.json()
  
        res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}