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

    function exec(command) {

       output.innerHTML += '~ ' + input.value + '\n'; 

        switch (command) {
            case 'help':
                output.innerHTML += 'Available commands: help, about, projects, contact\n';
                break;
            case 'about':
                output.innerHTML += "I'm a software developer and this is my first attemp to make a website.\nYup, I've never had experiene with Html/CSS/Js before.\nYup, probably if you press F12 you will see a multiple errors.\nYup, it's a work in progress and probably I'll drop this project at a certain time\n";
                break;
            case'projects':
                output.innerHTML += "No more projects for now :(\n";
                break;    
            case 'contact':
                output.innerHTML += 'Send mail to: matteoyon[at]live.com\n';
                break;    
            default:
                output.innerHTML += 'Command not found: ' + command + '\nType "help" to see a list of available commands\n';
                break;
        }

        output.scrollTop = output.scrollHeight;
    }

});