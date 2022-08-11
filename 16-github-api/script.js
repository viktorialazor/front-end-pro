const findUserButton = document.querySelector('#find-user');
const userLoginElement = document.querySelector('#user-login');
const userContainer = document.querySelector('#user-container');

const userList = [];

findUserButton.addEventListener('click', onFindUserButton);

function onFindUserButton() {
  const userLogin = userLoginElement.value;

  if (isFieldNotEmpty(userLogin)) {
    findUser(userLogin);
  } else {
    showMessage('Enter user login');
  }
};

function isFieldNotEmpty(value) {
  return value.trim() !== '';
};

function findUser(userLogin) {
  fetch(`https://api.github.com/users/${userLogin}`)
    .then(response => {
      if (!response.ok && response.status === 404) {
        throw Error(`User doesn't exist`);
      } else if (!response.ok) {
        throw Error(`Some error happened`);
      }

      return response.json();
    })
    .then((user) => {
      if (!isUserDisplayed(user)) {
        addUser(user);
        userList.push(user);
      } else {
        showMessage('User already displayed');
      }
    })
    .catch((error) => {
      showMessage(error.message);
    })
};

function addUser(user) {
  const userAvatarDescription = user['name'] ? `${user['name']}\`s avatar` : 'Image placeholder';

  let userItem = userDataTemplate
  .innerHTML
  .replace('{avatar}', user['avatar_url'])
  .replace('{avatarDescription}', userAvatarDescription)
  .replace('{repositories}', user['public_repos'])
  .replace('{followers}', user['followers'])
  .replace('{following}', user['following']);

  userContainer.insertAdjacentHTML('afterbegin', userItem);
};

function isUserDisplayed(user) {
  let isDisplayed = false;

  userList.forEach((userItem) => {
    if (user.id === userItem.id) {
      isDisplayed = true;
    }
  });

  return isDisplayed;
};

function showMessage(message) {
  alert(message);
};
