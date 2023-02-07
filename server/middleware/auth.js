// TODO implement security measures when using in production mode
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    }
    
    res.status(statusCode).cookie("token", token, options).json({
        email: user.email,
        token
    })
}

// TODO testing authorize method [admin, musician, organizer]
const authorize = function authorize(...roles) {
    return (req, res, next) => {
        // console.log(roles);
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                mess: 'User ${req.user.role} is not authorized to access this route'
            });
        }
        next();
    }   
}

module.exports = {
    sendTokenResponse,
    authorize
}