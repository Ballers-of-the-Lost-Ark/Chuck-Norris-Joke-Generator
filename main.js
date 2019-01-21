const blankDiv = document.getElementById('blank');
const numberOfJokes = document.getElementById('number-of-jokes');

// Update joke/jokes
numberOfJokes.addEventListener('keyup', function(x){
    if(numberOfJokes.value > 1){
        document.getElementById('span').textContent = 's';  
    }
    else{
        document.getElementById('span').textContent = ''; 
    }
    
});

// Displaying jokes
document.getElementById('form').addEventListener('submit', function(e){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes.value}`, true);

    xhr.onload = function(){
        if(this.status === 200){
            const jokes = JSON.parse(this.responseText);
            console.log(jokes);

            if(jokes.type == "success"){
                let output = '';
                jokes.value.forEach(function(x){
                    output += `
                    <p>${x.joke}</p>
                    `;
                    blankDiv.innerHTML = output;
                });
            }else{
                alert('error at http://www.icndb.com/api/');
            }
        }
    }

    xhr.send();

    numberOfJokes.value = '';

    e.preventDefault();
});