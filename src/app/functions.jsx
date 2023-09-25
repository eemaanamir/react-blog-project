
export const validateField = (formValues,name, value) => {
    return new Promise((resolve, reject) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
            case 'userBio':
                if (value.trim() === '') {
                    reject(formValues[name].errorMessage);
                } else {
                    resolve();
                }
                break;
            case 'email': {
                const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (!value.match(emailFormat)) {
                    reject(formValues[name].errorMessage);
                } else {
                    resolve();
                }
                break;
            }
            case 'password1':
                if (value.trim() === '') {
                    reject(formValues[name].errorMessage);
                } else {
                    resolve();
                }
                break;
            case 'password2':
                if (value !== formValues.password1.value) {
                    reject(formValues[name].errorMessage);
                } else {
                    resolve();
                }
                break;
            case 'password':
                if (value.trim() === '') {
                    reject(formValues[name].errorMessage);
                } else {
                    resolve();
                }
                break;
            default:
                resolve();
        }
    });
};
