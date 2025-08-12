## EJS (Embedded JavaScript)

**EJS** is a simple templating engine for Node.js that lets us write HTML pages with embedded JavaScript code, making it easy to generate dynamic web pages on the server side.

**In short:**  
> EJS is a templating engine for Node.js that blends HTML with JavaScript so we can create dynamic, server-rendered pages.

## Difference Between EJS and HTML

| Feature              | EJS (Embedded JavaScript)                                      | HTML (HyperText Markup Language)                  |
|----------------------|---------------------------------------------------------------|---------------------------------------------------|
| **Purpose**          | Used to create dynamic web pages by embedding JavaScript code | Used to create static web pages                   |
| **Server/Client**    | Runs on the server to generate HTML before sending to browser | Runs directly in the browser                      |
| **Code Embedding**   | Supports JavaScript inside `<% %>` or `<%= %>` tags            | Does not support programming logic directly       |
| **Data Handling**    | Can inject dynamic data from server variables into the page   | Cannot handle dynamic data without JavaScript     |
| **File Extension**   | `.ejs`                                                        | `.html`                                           |
| **Use Case**         | Server-side rendering with Node.js and Express                | Static content display                            |

## Client-Side Rendering (CSR) vs Server-Side Rendering (SSR)

| Feature              | Client-Side Rendering (CSR)                                   | Server-Side Rendering (SSR)                          |
|----------------------|---------------------------------------------------------------|-------------------------------------------------------|
| **Where Rendering Happens** | In the browser using JavaScript                          | On the server before sending HTML to the browser      |
| **Initial Load Speed** | Slower (HTML loads first, then JS fetches data and renders)  | Faster (HTML is ready to display when it reaches user)|
| **Subsequent Navigation** | Very fast (only updates parts of the page)                | Slower (full page reload or partial updates)          |
| **SEO Friendliness** | Poor by default (search engines may see empty HTML)           | Good (search engines get fully rendered HTML)         |
| **Examples**         | React SPA, Angular, Vue (without SSR)                         | EJS, Next.js (SSR mode), PHP, Django templates        |
| **When to Use**      | For highly interactive apps with fewer SEO needs              | For SEO-heavy or content-driven sites                 |



## MCP Server for AI

**MCP (Model Context Protocol) Server** is like a bridge between an AI model and external services.
It is a server that enables AI models to securely connect with and interact with external tools, APIs, and data sources using a standardized protocol.  
Allowing AI to access real-time data, execute actions, and integrate with external systems beyond text generation.
