document.getElementById('chatbot-send-button').addEventListener('click', sendChatMessage);

document.getElementById('chatbot-user-input').addEventListener('keypress', function (keyPressed) {
    if (keyPressed.key === 'Enter') {
        sendChatMessage();
    }
});

document.getElementById('send-images-button').addEventListener('click', sendImages);


async function sendChatMessage() {
    console.log("sendChatMessage");
    var userChatMessage = document.getElementById('chatbot-user-input').value;
    console.log(userChatMessage);
    document.getElementById('chatbot-user-input').value = '';
    addMessageToChatbox("YOU: "+userChatMessage, "user-message");

    
    const response = await fetch('/chat',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({question: userChatMessage})
    })
    console.log(response);
    if(response.status === 200){
        const data = await response.json();
        console.log(data);
        addMessageToChatbox("GPT: "+data.answer, "bot-message");
    }
    else{
        addMessageToChatbox("Virhe: " + await response.text(), "user-message");
    }

    

    console.log('Status: ' + response.status);
}

function addMessageToChatbox(message, className) {
    console.log("viesti lisätty chatboxii ")
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.innerText = message;
    console.log(messageElement);
    document.getElementById('chatbox').appendChild(messageElement);
}

