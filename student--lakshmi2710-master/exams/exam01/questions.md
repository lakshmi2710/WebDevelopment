# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
        Static asset are objects you send to the user that the server doesnt change. Example for static asset: Image
        Dynamic asset is something which creates user specific content on fly. Example: weather report

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
    Absolute path provides full website address. Absolute path always includes domain name of the website
    Should use absolute path when refering to the link ouside the website.
    Ex: <a href="http//www.google.com" >Link</a>
        <a href="http://www.exmpale.com/example/somefoleder.html" >Link</a>

    Relative path is one, which doesnt have complete website address which it is linking to. Relative path takes user to the path inside the website. 
    It means relative path points to a path relative to the current page.
    Ex: <a href="index.html" >Link</a>
        <a href="/somefolder/index.html" >Link</a>
        <a href="../somefolder" >Link</a>

    Document root is the publicly accessble base folder for the website.
    Any working path shd be absolute path and built using DOCUMENT_ROOT

## Q: What is the difference between server-side and client-side JS?
    Both server-side JS and client-side JS are built on core JS.

    Client-side JS runs on the user end on their browser. Here JS is mostly used to modify HTML(DOM) and used to send/receive data to server on the background

    Client-side JS includes any interacting website performs with the user through web browser.
    It does enhancement of manipulation of client browser. Main task is input checking, altering UI elements, Applying styles.
    Browser in the user side runs this code. 

    Server-side JS runs on the server's local machine which accpets HTTP request and serves them appropiate response. Here JS does all the back end logic like interaction with database, access local file system and other backend infrastructure.



## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
        var, const and let all are keywords used to declare a variable.

        var is used to declare a variable within the scope of the function but it hoists when declared meaning it acts if its declared at the top of the function regardless of it line. Better to avoid this and should be used only when targetting old JS engines.

        let is used to declare a variable within any perticular block, it will have scope to the current block where it is declared.
        Unlike var it will not hoist.
        Better to use this for variable, whenever variable needs to change its value in runtime.

        const is also block scoped and doesnt hoist. Its same as let, but it prevents from re assigning the variable. However it doesnot prevent altering objects. Because it just alter value within variable.
        Better to use this almost all the time, except when there is a need to change the value of variable in runtime.


        
## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
        Constructor Function: An object created using new keyword inherits prtotype from the function prototype property.

        Object.create: When new object created using Object.create(), all its properties are in herited to the new object

        ES6 classes: When a class is defined like in any other language, when an instance of an object gets created all its memeber are inherited to the prototype of the new object created.

        Brute Force Prototype Assignment: Can inherit the prototype directly to an object using Object.setPrototype. 

## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
        const dog = {
            purr: function(){
                console.log(`${this.functionName}`);
            }
        };

        const tom = Object.create(dog);
        tom.functionName = 'Purr';
        tom.purr();

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
        class Dog{
            constructor(functionName){
                this.functionName = functionName;
            }

            insideMethod(){
                console.log(`${this.name}));
            }
        };

        const tom = new Dog('hiss')
        tom.insideMethod();


## Q: Explain what a callback is, and give an example.
            Concept of sending function reference as an argument to another function.
            And the callback function is called from the another function
            
            Ex: Using custom comparator as callback to javascript sort function(array.sort)


## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `callback`, then `this` will not have the expected implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
        It means, we should not name class by what it look like. Instead we have to name it by describing the content of the part that particular css used for. 
        If class is named according to what it looks like, then in different browser and diffrent application it will change giving no meaning to the name. 
        For example if left part of the application named as left_part. in some other window it might appear in center.

        Class poorly named: .botton, .left_part, .right_part
        Class well named: .send-message, .main-window, .application-main
