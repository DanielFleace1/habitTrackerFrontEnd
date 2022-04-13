/**
 * Validates signup fields.
 *
 * @remarks
 * @param username - A string for username.
 * @param email - A string for user's email.
 * @param password - A string for user's password.
 * @returns - String (for an error) or true ( valid sign up)
 *
 */

    const SignUpvalidation = ((obj) =>{
        // No Blank Fields 
        if(!obj.username || !obj.password || !obj.email) return 'No fileds can be blank.'
        // Username should only contain Letters, White space
        let usernameRegex = /^[a-zA-Z\s]*$/;
        if(!usernameRegex.test(obj.username)) return 'Please use a name with only letters and whitespaces. '
        // Valid Email - Contains an (@) that is Preceded and Followed by One or more Nonwhitespace Characters.
        let emailRegex = /^\S+@\S+$/; 
        if(!emailRegex.test(obj.email)) return 'Please use a valid email. '
        //Password Regex
        let passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
        if(!passwordRegex.test(obj.password)) return 'Please use a valid password.'
        // Sign up Meets Requirments - Return True 
        return true 
    })
/**
 * Validates Date input for Entering New Habits
 *
 * @remarks Make sure user enters valid yyyy-mm-dd. // On the date picker users can edit it to choose yyyyyy-mm-dd
 * @param Date - Date entered by user
 * @returns - String (for an error) or true ( valid date)
 *
 */

    const DateValidation = (date) => {
      let dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
      if(!dateRegex.test(date)) return 'Please make sure input date is a valid date.'
      return true
    }

export default {
    
    SignUpvalidation,
    DateValidation,

}

 
