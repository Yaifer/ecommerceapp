import { Auth } from 'aws-amplify'

export const checkUser = (updateUser) => {
  const userData = await Auth
    .currentSession()
    .catch(err => console.log('error: ', err));

  if (!userData) {
    console.log('userData: ', userData)
    updateUser({})
    return
  }
///NESTED DESTRUCTURING OF A PAYLOAD CONST
  const { idToken: { payload }} = userData
  const isAuthorized =
    payload['cognito:groups'] &&
  payload['cognito:groups'].includes('Admin')

  updateUser({
    username: payload['cognito:username'],
    isAuthorized
  });
};
