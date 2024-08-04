const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// 메시지 컨테이너 스타일 설정
messageContainer.style.display = 'flex';
messageContainer.style.flexDirection = 'column-reverse';
messageContainer.style.overflowY = 'auto';

function addMessage(message, isUser) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper');

    if (!isUser) {
        const profileImage = document.createElement('img');
        profileImage.src = 'template/profile.png';
        profileImage.alt = '프로필 사진';
        profileImage.classList.add('profile-image');
        messageWrapper.appendChild(profileImage);
    }

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'echo-message');
    messageElement.textContent = message;
    messageWrapper.appendChild(messageElement);

    // 새 메시지를 컨테이너의 맨 위에 추가
    messageContainer.insertBefore(messageWrapper, messageContainer.firstChild);
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, true);
        setTimeout(() => addMessage(message, false), 1000);
        messageInput.value = '';
    }
}

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function resizeChat() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', resizeChat);
window.addEventListener('orientationchange', resizeChat);

resizeChat();

// 입력 필드에 포커스가 가면 스크롤을 맨 아래로 이동
document.getElementById('message-input').addEventListener('focus', () => {
    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, 300);
});