export const handleMessage = async (req, res) => {
    const { message } = req.body
    console.log("this is message", message)
}