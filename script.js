// <!-- ...existing code... -->
const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');

// Emoji picker setup (same as previous answer)
const emojiBtn = document.createElement('button');
emojiBtn.type = 'button';
emojiBtn.className = 'emoji-btn';
emojiBtn.textContent = '😊';

const emojiPicker = document.createElement('div');
emojiPicker.className = 'emoji-picker';
emojiPicker.style.display = 'none';
emojiPicker.innerHTML = `
  <span>😀</span>
  <span>😂</span>
  <span>😍</span>
  <span>👍</span>
  <span>🙏</span>
  <span>🎉</span>
`;

document.querySelector('.chat-input').insertBefore(emojiBtn, sendButton);
document.querySelector('.chat-input').appendChild(emojiPicker);

emojiBtn.addEventListener('click', () => {
  emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'flex' : 'none';
});
emojiPicker.querySelectorAll('span').forEach(emoji => {
  emoji.addEventListener('click', () => {
    chatInput.value += emoji.textContent;
    emojiPicker.style.display = 'none';
    chatInput.focus();
  });
});

function appendMessage(text, type = 'sent') {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${type}`;
  msgDiv.innerHTML = `<span class="avatar">${type === 'sent' ? 'U' : 'A'}</span><div class="bubble">${text}</div>`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (text) {
    appendMessage(text, 'sent');
    socket.emit('chat message', text);
    chatInput.value = '';
  }
}

sendButton.addEventListener('click', e => {
  e.preventDefault();
  sendMessage();
});
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

socket.on('chat message', function(msg) {
  appendMessage(msg, 'received');
});

// <!-- ...existing code... -->