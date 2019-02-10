import { Auth } from 'aws-amplify'

export const signup = (user) => {
    const { email, password } = user;
    return new Promise((resolve, reject) => {
        Auth.signUp({
            username: email,
            password
        })
            .then(u => resolve({ email: u.user.username, user_id: u.userSub, confirmed: u.userConfirmed }))
            .catch(error => reject(error));
    });
}


export const confirm = (user, confirmationCode) => {
    return new Promise(async (resolve, reject) => {
        Auth.confirmSignUp(user.user_id, confirmationCode)
            .then(confirmedUser => resolve(confirmedUser))
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
}

export const logout = () => {

    return new Promise(async (resolve, reject) => {
        try {
            await Auth.signOut();
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