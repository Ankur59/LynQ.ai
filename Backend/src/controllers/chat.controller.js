export const handleMessage = async (req, res) => {
    const { message } = req.body
    res.send(message)
}