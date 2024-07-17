import "../styles/globals.css"
import Nav from "../components/nav"
import Provider  from "../components/Provider"



export const metadata = {
    title: "GetPrompts",
    description: "Get Unique Ai Prompts",
}


const RootLayout = ({children}) => {
  return (
   <html>
    <body>
        <Provider>
        <div className='main'>
            <div className="gradient"/>
        </div>
        <div className="app">
           <Nav/>
            {children}
        </div>
        </Provider>
    </body>
   </html>
  )
}

export default RootLayout