# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.

Resource represts an object on which you can do operations.
For example "recipe" is a resource, where add recipe, delete recipe, update recipe, get recipe are all valid operation.

So url should always represent only resource.

URL /addRecipe does not reprsent resource. Its a bad practice to use like this.
This can be modified by using POST and by send adding parameter inside post body and converting url to /recipe.

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)

```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
fetch return a promise and but not the reponse data. So the variable username will not contain the username data and will hold a reference to the promise returned by fetch.

Fix:
const getUsername = () => fetch('/username')
  .then(response => response.text())
  .then((data) => {
      return data;
  })

getUsername()
.then((data) => {
    const username = data;
});


## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?

    state means current state of an application in the context of the user which is rendered by the DOM.

    store state in DOM, means saving the complete current state in variable.

    State might get pretty complicated with the DOM, so rather than reading DOM for the state it is much easier to save it in object. As reading from DOM gets complicated, it can be error prone and adds lot to the time complexity.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
    
In multiple-page-web application, every requests rendering a new page from the server in the browser. MPA will have multiple level of UI and its bigger than SPA. It adds more complexity to application.

In Single-page-application, page reloading is not required. SPA is one web page that we visit which then loads all other content using JavaScript logic. In SPA, all the resourses are loaded only once. Only data is transmitted back and forth.


## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?

Progressive enhancement is a method, which focus on displaying core webpage content at the begining. And then it keeps adding up things and alter according to user request by modyfying presentation of page.
For example: autofill, form validation before submitting.

Single page application with progressive enhancement behaves like a multiple page application when javascript is turned off.
Single page application without progressive enhancement will have only front end javascript


## Q6: Explain how a REST service is or is not similar to a dynamic asset.

Rest service and dynamic asset does the same work and are very similar. REST service is more organised and it makes designing complex applications easy as we can query the multiple resource. 

Non similar: Dynamic asset is meant more for quering purpose rather than updating the asset from the user end. It is seen as a static content from the user end but it is subject to change on the server.


## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
As browser attaches cookies for every request sent to the server, so any data which is not needed by the server for all requests should be avoided to be stored in cookie. By avoiding this design, we can save a lot of sending unwanted data on every web request. Also should not use cookie has a means to store data on client end.

Example: application data


## Q8: Explain why it is useful to separate a function that fetches data from the what you do with that data
1. There is clear distintion of logic which helps in debugging the application. 
2. We can do all the error handling related to the fetch network call function and error handling related to the data logic also a cler seperation. This makes error handling easy and makes application less complicated which reduces mistakes in general
3. Much readable and reusable code.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
There is no guarantee that will asynchronous erros will be thrown before the execution of try block is completed. Once the try block is completed its execution it will not further catch any exception thrown by the asynchronous code initiated from try block.


## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
 Separation of concerns is everywhere, both front end and server side.
 Example:
 client-side:
  Here there should a seperate function which deals with getting data from dom, send the data to server and seperate function which updates the dom to empty values. But in the below example we can all all hapenining in the same function

    sendNewRecipe.addEventListener('click', (e) => {
          const title = document.querySelector('[name="Title"]').value;
          const ingredients = document.querySelector('[name="Ingredients"]').value;
          const instruction = document.querySelector('[name="Instructions"]').value;
          document.querySelector('[name="Title"]').value = '';
          document.querySelector('[name="Ingredients"]').value = '';
          document.querySelector('[name="Instructions"]').value = '';

          fetchAddRecipe(title, ingredients, instruction)
              .then((res) => {
                  appState.error = '';
                  getRecipeDesctiption(res.id)
              })
              .catch((err) => {
                  appState.error = err.error;
                  renderAddRecipePage();
                  renderErrors(appState.error);
              });
});

server side:
1. Here check for user authorization should be done first and in a seperate function.
2. Once is authorization is complete, we have to validate the request data.
3. once the request validation is successfull, we can go ahead and update the data in the store.

app.post('/recipe', express.json(), (req, res) => {
    const id = nextID();
    const uid = req.cookies.uid;
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const instruction = req.body.instruction;
    author = storage.cookieUser[uid].username;
    if (!uid || !storage.cookieUser[uid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.cookieUser[uid]) {
        res.clearCookie('uid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    if (title.match(/^ *$/) || ingredients.match(/^ *$/) || instruction.match(/^ *$/)) {
        res.status(400).json({
            error: "Empty message: Please enter recipe details"
        });
        return
    }

    storage.RecipeList[id] = {
        "title": title,
        'author': author,
        'ingredients': ingredients,
        'instruction': instruction
    };


    res.json({
        'id': id,
        'result': 'Recipe stored sucessfully'
    });
});