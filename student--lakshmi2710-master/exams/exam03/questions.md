# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Be substantive!)

React JSX component should be small and function specific.:
    One componet should corresponds to one function, i.e means one component should render specific part of our page.
    Components like functions could be standalone, that makes testing and maintance easy.
    Updating smaller component will be easy.
React JSX components should be created such that it should be reusable.
    By creating reusable componets, can main tain consistancy over all the project. And also across any numbers of projects.
    For example u can create login component and it should be able to reuse for any applications.

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?

By using progressive enhancement, can completely remove javascript overhead, javascript framework adds to web applications with SPA alone.
Also by using Progressive enhancement, apps remains working if no JS, great for search engines, Also its gtreat for ensuring backend is secure    


## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of networkfg traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps.
    port 3000: react local server 
    port 4000: web back end server

    When a user requests resource on localhost:3000, react server provides with the static web page content.
    Not when the webpage requests for resource localhost:3000/service, react app does not have any resource to respond for "/service". So it tries to proxy the request to "localhost:4000".
    Now the localhost:4000 serves with the reponse for "/service" to localhost:3000 and localhost:3000 proxies the response back to the user.
    
    <!-- Please find attached image for network flow diagram -->


## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`
    Now all the resources are avialble in the server running at port 4000 including the static reources like html, css and raw JS files. So when the browser requests for "\service", server running at port 4000 can the resource availble. Now the server can process the reource and send the reponse back to JS on browser.

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.
    We can always send data from parent to child using props.
    Easiest direction of data flow is from parent to child.

    If we pass data "up" means from child to parent, there are chances it might end up in infinite loop.

    We can send data using state or even we can directly use variables to send data from parent to child.

    Example: 

    const (parentData, setParentData) = useState('')
    parentRender()  {
        return(
            <div>
                <child parentData = {parentData} >
                </child>
            </div>
        )
    }

    Not only state, we can also send function or variables to child component 



## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data?  Give simple code samples if that makes it easier to describe.
        Anything that is "down" can change data up by "callbacks"


        function ParentComponent() {
            const callBackFunction = () => {
                setSomeVariable("val")

                });

            return (
                <childComponet callBAckFunction = { callBAckFunction }>
            )
        }

        function ChildComponent( callBAckFunction ) {
            const callFunctionToChangeData = () =>
                callBackFunction(val)

            return(
                <button onClick = { callFunctionToChangeData }/>

            )
        }
   

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

For 1st collection i would use objects of objects since it can be managed by using id as key for each record.

personObj1 = {
  "654321": {
    id: "654321", 
    name: "Bao", 
    address: "123 Main Street"
  },
  "654324": {
    id: "654324", 
    name: "dav", 
    address: "123 Main Street"
  }
 }

For the 2nd collection i would use array of objects

const recipe = [{
     qty: "1 cup", 
     ingredient: "shredded cheese", 
     instructions: "sprinkle over pizza"
}, {qty: "2 cup", 
     ingredient: "cheese", 
     instructions: "add over pizza"
}]


Objects are always used to represent a thing like person, building etc. Means which is defined by set of characteristics.
These characteristics are called properties. And properties contains key-value pair.

We use arrays whenever we want to add and store a list of items in a single variable hence using to store recipe details in array.


## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.
        JavaSCript is Object oriented language.
        Objects can have inheritance that means an object can use the properties of another object.
        When code access on object to get some value, and if object does not have the requested value, it will check for the prototype of it. Prototype is an object, when asked for the value, if it does not have, then it will check its prototype.

        If that prototype has no value then it check for its prototype and so on. This will continue until an object does not have any prototype.

        Example:
        const Person = "Lakshmi";

        console.log(Person.toUpperCase());
        console.log(Person.lenght);

        Inheritance using constructor Function Example:

        fucntion person(name) {
            this.name = name;
        }

        Person.prototype.Greet = function() {
            console.log(`'${this.name} says hello'`)
        };

        

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` be sure to explain why that is wrong.

        !username will return true, if username is undefined.
        So there is no point in checking username == undefined. It is dead code which will never be hit.

## Q10: What is decoupling?  What is an example of decoupling in a React app?

        Decoupling means two or more methods/functions able to transact without being connected or coupled. 
        Decoupled functions dont interact with each other or have very limited info about the other.
        Decoupled Functions/methods can be reused any number of times.

        In react,  components can be decoupled for better reusability and maintanance.

        Decoupling react components make them not aware of any storage or action creator.
        The goal is to have them to manage their own state and call functions to emit a change

        In any application Login and Logout functions can be decoupled into 2 seperate components.

        Example: Login and Logout components can be decoupled in react for better reusabilt and maintanance. 

        const Login = ({ onLogin }) => {
                const onInput = (event) => {
                    setNewLoginUser(event.target.value);
                }

            return (
                <div id="login-page">
                </div>
            )
            }

        const Logout = ({  }) => {
            const onlogout = () => {
                fetchLogOut()
                .then(() => onLogout());
            };

            return (
                <div>
                {user.isLoggedIn ?
                    <div>
                    </div> : ""}

                </div>
            );
            };

