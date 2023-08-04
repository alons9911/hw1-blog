How to create CSRF attack:

1. Run the web application using npm
2. Create new user using 'Signup' page
3. Open Chrome Developer Tool by pressing F12
4. Login with the new user using 'Login' page
5. In the Chrome Developer Tool, navigate to Cookies section under Application
6. Copy the value of currentUser cookie (while the checkbox 'show URL-decoded' is checked)
7. Run the csrf_attack.js script using 'node csrf_attack.js'
8. Paste the copied value when you are asked to do so
9. The script should let you know if the attack was successful.
   If so, new fake post of the given user should appear in the public feed.