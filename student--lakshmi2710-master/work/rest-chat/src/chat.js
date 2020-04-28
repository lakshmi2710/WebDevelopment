import {
  fetchLogIn,
  fetchLoginStatus,
  fetchGetChats,
  fetchLogOut,
  fetchSendMessage,
  fetchUserList
} from './services';

const appState = {
  pollId: null,
  isLoggedIn: false,
  error: '',
};

const loginDom = document.querySelector('#login-page');
const chatDom = document.querySelector('#chat-app');
const newMsg = document.querySelector('.message');
const sendButton = document.querySelector('.btn-msg');

function renderLogin(show) {
  if (show) {
      chatDom.remove();
      document.body.append(loginDom);
      loginDom.style.visibility = "visible";
  } else {
      loginDom.remove();
  }
}

function renderChat(show) {
  if (show) {
      loginDom.remove();
      document.body.append(chatDom);
      chatDom.style.visibility = "visible";
  } else {
      chatDom.style.visibility = "hidden";
  }
}

function renderErrors(text) {
  document.querySelector('.Status').innerHTML = text;
}

function poll(shouldPoll) {
  if (shouldPoll && !appState.pollId) {
      appState.pollId = setInterval(() => {
          fetchGetChats()
              .catch((err) => {
                  poll(false);
                  appState.error = err.error;
                  renderPage();
              })
              .then((chatMessages) => {
                  appState.error = '';
                  renderMsg(chatMessages);
              });

          fetchUserList()
              .catch((err) => {
                  poll(false);
                  appState.error = err.error;
                  renderPage();
              })
              .then((usersList) => {
                  appState.error = '';
                  renderActiveUsers(usersList);
              });
      }, 3000);
  }
  if (!shouldPoll && appState.pollId) {
      clearTimeout(appState.pollId);
      appState.pollId = null;
  }
};

function renderMsg(chatMessages) {
  if (chatMessages) {
      const msgDom = document.querySelector('.message-list');
      msgDom.innerHTML = chatMessages.chats.map((message) =>
          `<ul>[${message.timestamp}] ${message.username}: ${message.message}</ul>`
      ).join('');
  }
}

function renderActiveUsers(users) {
  if (users) {
      const userDom = document.querySelector('.user-list');
      userDom.innerHTML = users.map((user) => `<p>${user}</p>`).join('');
  }
}

function renderPage() {
  if (!appState.isLoggedIn) {
      renderLogin(true);
      renderChat(false);
  } else {
      renderLogin(false);
      renderChat(true);
  }
  renderErrors(appState.error);
}

const login = document.querySelector('.login-panel');

login.addEventListener('click', (e) => {
  if (!e.target.classList.contains('create')) {
      return;
  }

  const username = login.querySelector('.username').value.toUpperCase();
  login.querySelector('.username').value = '';
  fetchLogIn(username)
      .then(() => {
          appState.isLoggedIn = true;
          appState.error = '';
          poll(true);
          renderPage();

      })
      .catch((err) => {
          poll(false);
          appState.error = err.error;
          renderPage();
      });
});


const logout = document.querySelector('.logout');

logout.addEventListener('click', (e) => {
  fetchLogOut()
      .then(() => {
          appState.isLoggedIn = false;
          appState.error = '';
          poll(false);
          renderPage();
      })
      .catch((err) => {
          poll(false);
          appState.error = err.error;
          renderPage();
      });
});

sendButton.addEventListener('click', (e) => {
  const msg = newMsg.value;
  newMsg.value = '';
  fetchSendMessage(msg)
      .then(() => {
          appState.error = '';
          appState.isLoggedIn = true;
          poll(true);
          renderPage();
      })
      .catch((err) => {
          poll(false);
          appState.error = err.error;
          renderPage();
      });
});

// Initial load

fetchLoginStatus()
  .then(() => {
      appState.isLoggedIn = true;
      poll(true);
      renderPage();
  })
  .catch(() => {
      poll(false);
      appState.isLoggedIn = false;
      renderPage();
  });