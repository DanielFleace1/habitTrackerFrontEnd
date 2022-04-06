/**
 * Validates signup fields.
 *
 *
 * @remarks
 * 
 *
 * @param username - A string for username.
 * @param email - A string for user's email.
 * @param password - A string for user's password.
 *
 *
 * @returns - String (for an error) or true ( valid sign up)
 *
 *
 */

    const SignUpvalidation = ((obj) =>{
        // no blank fields 
        if(!obj.username || !obj.password || !obj.email) return 'No fileds can be blank.'
        // valid email - contains an (@) that is preceded and followed by one or more nonwhitespace characters.
        let emailRegex = /^\S+@\S+$/; 
        if(!emailRegex.test(obj.email)) return 'Please use a valid email. '
        //passwordRegex
        let passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
        if(!passwordRegex.test(obj.password)) return 'Please use a valid password.'
        // Sign up meets requirments - return true 
        return true 
    })

export default SignUpvalidation

 
