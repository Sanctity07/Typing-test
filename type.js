let typingStarted = false;
        let charCount = 0;
        let timeLeft = 60; // or any initial time you want
        const inputBox = document.getElementById('inputBox');
        const timerElement = document.getElementById('timer');
        const resultElement = document.getElementById('result');

        inputBox.disabled = false;

        function startTyping(event) {
            if (!typingStarted) {
                typingStarted = true;
                charCount = 0;
                startTimer();
            }
            // Increment character count
            charCount++;
        }

        function startTimer() {
            const countdown = setInterval(() => {
                timeLeft--;
                timerElement.textContent = `Time Left: ${timeLeft}s`;

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    inputBox.disabled = true;
                    resultElement.textContent = `Time's up! You typed ${charCount} characters.`;
                }
            }, 1000);
        }

        function restartTyping() {
            typingStarted = false;
            charCount = 0;
            timeLeft = 60; // reset to initial time
            inputBox.disabled = false;
            inputBox.value = '';
            timerElement.textContent = `Time Left: ${timeLeft}s`;
            resultElement.textContent = '';
        }

        // Add an event listener to the restart button
        document.getElementById('restartButton').addEventListener('click', restartTyping);