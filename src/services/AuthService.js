import { Auth } from 'aws-amplify'

export const signup = (user) => {
    const { email, password, firstname, lastname, phone } = user;
    return new Promise((resolve, reject) => {
        // debugger
        Auth.signUp({
            username: email,
            password
        })
            .then(u => resolve({ email: u.user.username, user_id: u.userSub, verified: u.userConfirmed, firstname, lastname, phone, password }))
            .catch(error => reject(error));
    });
}

export const signupWithPhone = (user) => {
    const { email, password, firstname, lastname, phone } = user;
    return new Promise((resolve, reject) => {
        // debugger
        Auth.signUp({
            username: email,
            password,
            attributes: {
                email,          // optional
                phone_number: phone,   // optional - E.164 number convention
                // other custom attributes 
            },
        })
            .then(u => resolve({ email: u.user.username, user_id: u.userSub, verified: u.userConfirmed, firstname, lastname, phone, password }))
            .catch(error => reject(error));
    });
}


export const confirm = (user, confirmationCode) => {
    return new Promise(async (resolve, reject) => {
        Auth.confirmSignUp(user.user_id, confirmationCode)
            .then(confirmedUser => resolve({ confirmedUser, user_id: user.user_id }))
            .catch(error => reject(error.message));
    });
}

export const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Auth.signIn(email, password);
            resolve(user);
        } catch (e) {
            // ALERT here we can check which error we are receiving
            reject(e.message)
        }
    });


    // let username = email
    // try {
    //   const user = await Auth.signIn(username, password);
    //   alert('user successfully logged in')
    //   if (user.challengeName === 'SMS_MFA' ||
    //     user.challengeName === 'SOFTWARE_TOKEN_MFA') {
    //     // // You need to get the code from the UI inputs
    //     // // and then trigger the following function with a button click
    //     // const code = getCodeFromUserInput();
    //     // // If MFA is enabled, sign-in should be confirmed with the confirmation code
    //     // const loggedUser = await Auth.confirmSignIn(
    //     //   user,   // Return object from Auth.signIn()
    //     //   code,   // Confirmation code  
    //     //   mfaType // MFA Type e.g. SMS, TOTP.
    //     // );
    //   } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    //     // const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
    //     // You need to get the new password and required attributes from the UI inputs
    //     // and then trigger the following function with a button click
    //     // For example, the email and phone_number are required attributes
    //     // const { username, email, phone_number } = getInfoFromUserInput();
    //     const loggedUser = await Auth.completeNewPassword(
    //       user,               // the Cognito User Object
    //       password,       // the new password
    //       // OPTIONAL, the required attributes
    //       {
    //         email,
    //         // phone_number,
    //       }
    //     );
    //     console.log('loggedUser', loggedUser)
    //   } else if (user.challengeName === 'MFA_SETUP') {
    //     // This happens when the MFA method is TOTP
    //     // The user needs to setup the TOTP before using it
    //     // More info please check the Enabling MFA part
    //     Auth.setupTOTP(user);
    //   } else {
    //     // The user directly signs in
    //     console.log(user)
    //   }
    // } catch (err) {
    //   console.log(err);
    //   alert(err.message)
    //   if (err.code === 'UserNotConfirmedException') {
    //     // The error happens if the user didn't finish the confirmation step when signing up
    //     // In this case you need to resend the code and confirm the user
    //     // About how to resend the code and confirm the user, please check the signUp part
    //   } else if (err.code === 'PasswordResetRequiredException') {
    //     // The error happens when the password is reset in the Cognito console
    //     // In this case you need to call forgotPassword to reset the password
    //     // Please check the Forgot Password part.
    //   } else {
    //     console.log(err);
    //   }
    // }

    // For advanced usage
    // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
    // Auth.signIn({
    //   username, // Required, the username
    //   password, // Optional, the password
    //   // validationData, // Optional, a random key-value pair map which can contain any key and will be passed to your PreAuthentication Lambda trigger as-is. It can be used to implement additional validations around authentication
    // }).then(user => { console.log(user) })
    //   .catch(err => { console.log(err) });
}

export const logout = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await Auth.signOut({ global: true });
            resolve(true);
        } catch (error) {
            reject(error)
        }
    })
};

export const forgotPassword = (username) => {
    return Auth.forgotPassword(username)
};

export const confirmNewPassword = (user, oldPassword, newPassword) => {
    return Auth.forgotPasswordSubmit(user, oldPassword, newPassword)
};

export const isLoggedIn = (user, confirmationCode) => {
    return new Promise(async (resolve, reject) => {
        Auth.currentAuthenticatedUser()
            .then(user => resolve(user))
            .catch(err => reject(err.message));
    });
}