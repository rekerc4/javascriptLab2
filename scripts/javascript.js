"use strict"//uses strict mode. 

let run = () =>{//function that runs code after onload and .25 seconds delay. 
   
    let yourHit = 0;//initialize the value for the variable storing value of your hits. 
    let grantHit = 0;//initialize the value for the variable storing Grants hits. 
    let youAdjective = "";//sets an empty string for adjective used to describe users hit. 
    let grantAdjective = "";//sets an empty string for adjective used to describe Grant's hit. 

    let adjec = () =>{//Function for determining adjective used to describe hits. 
        if(yourHit === 2){//Sets adjective used to describe users hit to mighty if user hits Grant for 2. 
            youAdjective = "mighty"; 
        } 
        else{//Sets adjective used to describe users hit to glancing if user hits Grant for 1. 
            youAdjective = "glancing";
        }
        if(grantHit === 2){//Sets adjective used to describe Grants hit to mighty if Grant hits user for 2. 
            grantAdjective = "mighty";
        }
        else{//Sets adjective used to decribe Grant's hit to glancing if Grant hits user for 1. 
            grantAdjective = "glancing";
        }
    }

    let getDamage = () => {//function call to assign a random value between 1 and 5 for damage dealt by you and Grant each round. 
        yourHit = (Math.ceil(Math.random() * 5));//set a random number for each hit user makes on Grant. 
        grantHit = (Math.ceil(Math.random() * 5));//set a random number for each hit Grant makes on user. 
    }

    let startGame = () => {//Function that starts the game. 
    let playChoice = prompt("Do you want to play a game?");// Ask if user wants to play. 
    let check = playChoice.toLowerCase().trim();//puts user response to lower case. 
    let checker = check.replace(/[\W0-9_]+/g, '');//strips non-alpha characters from user response. 

    if(checker === 'yes' || check === 'y' || check === 'yeah' || check === 'sure' || check === 'ye'){//Some variations on yes check against the users response. 
        let userName = prompt("What is your name?");//Prompt user for name and store it in a variable.
        startCombat(userName); //Call to combat function if user indicates they want to play. 
        }
    }

    let startCombat = (userName) => {//Function the initializes combat. 
        let grantHealth = 10;//set initial health number for Grant.
        let userHealth = 40;//set users initial health number. 
        let wins = 0; //set initial number of users wins. ie times Grant's health drops to zero or bellow. 
     
        let sequence = () => {//sequence were health is deducted and meesages are dislayed. 
            getDamage();//Call to get random values for users and Grants damage.   
            grantHealth = grantHealth - yourHit;//subtracts the value of users hit from Grant's health.
            userHealth = userHealth - grantHit;//subtracts the value of Grant's hit from users health. 
        
            adjec(); //Gets adjective to describe blow that matches the damage. 

            let grantMessage = `Grant hit ${userName} with a ${grantAdjective} blow doing ${grantHit} damage, ${userName} has ${userHealth} left.`;
            let userMessage = `${userName} hit Grant with a ${youAdjective} blow doing ${yourHit} damage, Grant has ${grantHealth} life, he has come back to life ${wins} times`;

            console.log(grantMessage);//Console logs Grants hit. 
            console.log(userMessage);//Console logs users hit.
            document.getElementById("only2").innerHTML = grantMessage; 
            document.getElementById("only3").innerHTML = userMessage;

        } 
        
        while(userHealth > 0){//Main while loop set to run until user runs out of health. 
            let attQ = prompt("Would you like to attack or quit?");  //Prompts user to select if they either want to attack or quit. 
            attQ = attQ.toLowerCase().trim();//Trims and sets to lower case user input. 
            let attackQuit = attQ.replace(/[\W0-9_]+/g, '').slice(0, 1); //strips non alpha characters from user input and takes only the first letter. 

            if(attackQuit === "a" || attackQuit === "y"){
                sequence();
            }//While loop should not end on its own. 
            else{
               break;//Ends while loop. 
            }
            
            if(grantHealth <= 0){//Adds one to the win counter if Grants health is reduced to 0. 
                    wins++;//Adds one to the win counter. 
                    if(wins < 3){//Checks if wins are less than three before reseting Grants health. 
                        grantHealth = 10;//Resets Grants health to 10.
                    }
                }
                if(wins === 3){//Ends game with user victory if number of wins are 3. 
                    console.log("You win Grant is defeated!!!!"); //Prints end of game message for users victory. 
                    break; //Ends while loop. 
                }
                if(userHealth <= 0){//Ends game with user defeat if users health drop to zero or below
                    console.log("You are defeated Grant wins :(");//Prints end of game message for users defeat. 
                    break;  //Ends while loop.
            }

        }
    
    }
    startGame(); //Starts the game after run(); executes. 
}

document.body.onload = setTimeout(run, 250); //Runs rest of code after the document loads and .25 seconds have ellasped. 
