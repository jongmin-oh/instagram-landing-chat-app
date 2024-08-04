const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

function addMessage(message, isUser) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper');

    if (!isUser) {
        const profileImage = document.createElement('img');
        profileImage.src = 'template/profile.png'; // 기본 프로필 이미지
        profileImage.alt = '프로필 사진';
        profileImage.classList.add('profile-image');
        messageWrapper.appendChild(profileImage);
    }

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'echo-message');
    messageElement.textContent = message;
    messageWrapper.appendChild(messageElement);

    messageContainer.appendChild(messageWrapper);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, true);
        setTimeout(() => addMessage(message, false), 1000); // Echo after 1 second
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

// 초기 실행
resizeChat();

// 입력 필드에 포커스가 가면 스크롤을 맨 아래로 이동
document.getElementById('message-input').addEventListener('focus', () => {
    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 300); // 키보드가 완전히 올라올 때까지 약간의 지연 시간을 줍니다
});