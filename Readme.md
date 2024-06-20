***Note:***
Switch to branch myspace-js for javascript codebase. The default branch of this repo has been migrated to typescript.
***
# MySpace
### Secure Note Taking App with MERN Stack
**Organize your thoughts and ideas with ease!** This note-taking application allows you to create, manage, and access your personal notes securely. Built with the MERN stack (MongoDB, Express.js, React.js, and Node.js), this app offers a user-friendly interface and robust features to keep your notes organized and accessible.

## Key Features:

- **Create and Edit Notes**: Effortlessly jot down your thoughts, ideas, or to-do lists within the app. Edit and update your notes as needed.
- **Detailed Notes**: Each note can have a title, descriptive content, and tags for easy categorization.
- **Overflow View**:  Don't worry if your note content overflows the page. A convenient modal window allows you to view the entire note in detail.
- **Responsive Design**: Quickly find specific notes by filtering them based on the assigned tags.
- **Secure Login and Signup**:  Register for an account and log in securely to access your notes. User authentication ensures only you can view and edit your notes.
- **MongoDB Cloud Storage**: Your notes are stored securely on MongoDB Cloud, guaranteeing data safety and accessibility.

## Technologies:

* **Frontend:**
    * **React.js:** (https://react.dev/) - The core library for building user interfaces.
    * **React Router DOM:** (https://reacttraining.com/react-router) - Enables navigation between different views within the app.
* **Backend:**
    * **Node.js:** (https://nodejs.org/en/download/package-manager/current) - JavaScript runtime environment for server-side development.
    * **Express.js:** (https://expressjs.com/) - Framework for building web applications and APIs on top of Node.js.
    * **Mongoose:** (https://www.npmjs.com/package/mongoose) - ODM library for interacting with the MongoDB database.
    * **MongoDB Cloud:** (https://www.mongodb.com/products/platform/atlas-database) - Cloud-based database service for MongoDB.
* **Security:**
    * **bcrypt** (Considered for future implementation) - Library for secure password hashing.
    * **jsonwebtoken** (Considered for future implementation) - Library for creating and verifying JWTs for user authentication.


## Skills Learned:

### React Hooks:
1.  **useContext**:
    
    *   Provides a way to share data across components in a tree hierarchy without explicitly passing props through every level.
        
2.  **useNavigate**:
    
    *   Enables programmatic navigation within the application, allowing you to redirect users based on actions or events.
        
3.  **useRef**:
    
    *   Creates a mutable ref object that persists across re-renders.
        
    *   Useful for storing DOM elements, values, or functions that don’t participate in the state or prop flow.
        
4.  **useLocation**:
    
    *   Provides access to the current URL pathname, search string, and state object from the react-router-dom library.
        
    *   Valuable for building dynamic and responsive components based on the routing context.
### Integration of Backend and Frontend

1.  **Node.js and Express.js**:
    
    *   This combination lays the foundation for building a robust server-side API.
        
    *   Handles user authentication, data fetching, and manipulation for the React frontend.
        
2.  **RESTful API Design**:
    
    *   Understanding and implementing RESTful API principles ensures clean communication between the frontend and backend.
        
    *   Allows the React application to interact effectively with the MongoDB database.
        
3.  **Data Fetching Techniques**:
    
    *   Skills in fetching data from the backend API using fetch method.
        
    *   Crucial for populating the React application with dynamic content like notes and user information.

## Getting Started

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Shivamrut/MySpace.git
    ```
2. **Install Dependencies**:
    *First Frontend* :
    ```bash
    cd MySpace/client
    npm install
    ```
    *Now Backend* :
    ```bash
    cd ../server
    npm install
    ```
3. **Obtain a Database Cluster URI for MongoDb database**:
   * Create a free account on https://www.mongodb.com/products/platform/atlas-database.
   * Refer mongodb docs to create a new cluster and obtain uri.
4. **Configure URI**:
    In the db.js replace the uri.

5. **Run the Development Server**:
    From the client directory
    ```bash
    npm run both
    ```
    This will start both frontend and backend servers, frontend accessible at [http://localhost:3000/](http://localhost:3000/) and backend at  [http://localhost:8080/](http://localhost:8080/) in your web browser.

# Thank you for visting
## Please leave a feeback
