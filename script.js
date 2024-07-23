document.addEventListener('DOMContentLoaded', function(){
    const input = document.getElementById('cmd-input');
    const output = document.querySelector('.output');

    input.addEventListener('keydown', function(event){
        if (event.key === 'Enter') {
            const command = input.value.trim();
            exec(command);
            input.value = '';
        }
    });

    async function exec(command) {

       output.innerHTML += '~ ' + input.value + '\n'; 

        if (command === 'help') {
                output.innerHTML += 'Available commands: help, about, projects, contact\n';   
        }else if (command) {
            try {
                const response = await fetch(`resources/${command}.txt`);
                if (response.ok) {
                    const text = await response.text();
                    const outputDiv = document.createElement('div');
                    outputDiv.innerHTML = text + '<br>';
                    output.appendChild(outputDiv);
                    output.scrollTop = output.scrollHeight;
                } else {
                    throw new Error('File not found');
                }
            } catch (error) {
                const outputDiv = document.createElement('div');
                outputDiv.innerHTML += 'Command not found: ' + command + '\nType "help" to see a list of available commands\n';
                output.appendChild(outputDiv);
                output.scrollTop = output.scrollHeight;
            }
        }

        output.scrollTop = output.scrollHeight;
    }

});