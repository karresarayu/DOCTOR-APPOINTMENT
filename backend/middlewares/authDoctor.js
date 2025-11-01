import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
  try {
    // Change from destructuring to direct header access
    const dToken = req.headers.dtoken // Handle case sensitivity
    
    if (!dToken) {
      return res.json({ success: false, message: "Not authorized, login again please" })
    }

    const token_decode = jwt.verify(dToken, process.env.JWT_SECRET)
    req.docId = token_decode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default authDoctor
