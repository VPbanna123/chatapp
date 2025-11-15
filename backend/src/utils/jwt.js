import jwt from "jsonwebtoken"

// generate access token 
export const generateAccessToken=(userId)=>{
    return jwt.sign(
        {userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY||"15m"}
    );
}

//  generate refresh token
export const generateRefreshToken=(userId)=>{
    return jwt.sign(
        {userId},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY || '7d'}
    )
}

export const verifyAccessToken=(token)=>{
    try {
        return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        return null;
    }
}
export const verifyRefreshToken=(token)=>{
    try {
        return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return null;
    }
}