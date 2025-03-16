'use server';

async function createSession(previousState,data) {
    const email= data.get('email');
    const password = data.get('password');

    if(!email || !password) {
        return {error: 'Email and password are required'};
    }
    return {success: true};
}

export default createSession;