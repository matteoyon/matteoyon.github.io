document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('cmd-input');
    const output = document.querySelector('.terminal-output');
    const mainContent = document.querySelector('.main-content');
    const navButtons = document.querySelectorAll('.sidebar-nav button');

    // Focus input on click anywhere in terminal content
    mainContent.addEventListener('click', () => {
        input.focus();
    });

    // Handle Enter key in input
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = input.value.trim();
            exec(command);
            input.value = '';
        }
    });

    // Handle Navigation Button Clicks
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const command = btn.getAttribute('data-cmd');
            // Visual feedback: type the command in the input then execute
            input.value = command;
            setTimeout(() => {
                exec(command);
                input.value = '';
                input.focus();
            }, 200);
        });
    });

    async function exec(command) {
        // Echo command
        const cmdLine = document.createElement('div');
        cmdLine.className = 'cmd-echo';
        cmdLine.innerHTML = `<span class="prompt">matteoyon@web:~$</span>${command}`;
        output.appendChild(cmdLine);

        if (!command) {
            scrollToBottom();
            return;
        }

        const lowerCmd = command.toLowerCase();

        if (lowerCmd === 'help') {
            printOutput('Available commands: <br> - about<br> - projects<br> - blog<br> - contact<br> - help<br> - clear');
        } else if (lowerCmd === 'clear') {
            output.innerHTML = '';
        } else if (lowerCmd === 'blog') {
            // Check if we should redirect or show content. 
            // The original code redirected. Let's keep it for now but maybe warn?
            // Or better, let's try to fetch blog.html content if possible, or just redirect.
            // For now, redirecting is safer as blog.html might be a full page.
            printOutput('Redirecting to blog...');
            setTimeout(() => {
                window.location.href = 'blog.html';
            }, 1000);
        } else {
            // Try to fetch text file
            try {
                const response = await fetch(`resources/${lowerCmd}.txt`);
                if (response.ok) {
                    const text = await response.text();
                    printOutput(text);
                } else {
                    throw new Error('File not found');
                }
            } catch (error) {
                printOutput(`Command not found: ${command}<br>Type "help" to see a list of available commands.`);
            }
        }

        scrollToBottom();
    }

    function printOutput(html) {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'cmd-response';
        outputDiv.innerHTML = html;
        output.appendChild(outputDiv);
    }

    function scrollToBottom() {
        output.scrollTop = output.scrollHeight;
    }

    // Initial greeting
    printOutput('Welcome to MY website.<br>Type a command or use the menu to navigate.');
});