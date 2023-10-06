This is a challenge from Frontend Mentor - https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh

The generation of the passwords is based on the use of multidimensional arrays. The script picks one random character from each of the character arrays depending on the conditions selected and outputs a string which is the generated password.
Every character from each of the arrays has an index number. The math.random() method is used to pick a random character.

It is **OF CRUCIAL IMPORTANCE** to understand that this **IS NOT** a crytographically safe way of generating passwords. This project is for demonstration purposes only and should not be used to generate passwords.
Many resources in the internet do not state this. A much safer way to generate passwords is by the use of the Web Crypto API. For this project, however, I decided not to use it as I found it a better opportunity to learn how to use the multidimensional arrays, also called 'array of arrays'.
