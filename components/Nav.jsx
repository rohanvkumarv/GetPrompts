"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders} from "next-auth/react";

const Nav = () => {
    // const isUserLoggedIn =; 
    const {data :session} = useSession();
    const [providers ,setProviders] =useState(null);
    const [toggleDropDown, settoggleDropDown] = useState(false);



    useEffect(() => {
      const setUpProviders = async () => {
          const response = await getProviders();
          setProviders(response);
      }
      setUpProviders();
  }, []);
  

  return (
   <nav className="flex-between w-full mb-16  pt-3">
    <Link href="/" className="flex gap-2 flex-center "> 
     <Image
     src="/assets/images/logo.svg"
     alt="Logo"
     width={30}
     height={30}
     className="object-contain"/>
     <p className="logo_text">GetPrompts</p>

     
    </Link>
    {/* desktop navigation  */}
     {/* {alert(session?.user)}
     {alert(providers)} */}
    <div className="sm:flex hidden">

      {session?.user ?(
        <div className="flex gap-3 md:gap-5"> 
        <Link href= "/create-prompt"
        className="black_btn">
            Create Prompt
        </Link>
        <button type="button" onClick={signOut}
        className="outline_btn">Sign Out</button>

        <Link href="/profile">
        <Image
        src={session?.user.image}
        alt="Profile"
        width={37}
        height={37}
        className="rounded-full"
       
        />
     
        </Link>

        </div>
      ):(
        <>
        {providers && Object.values(providers).map((provider)=>(  
            <button
            type="button"
            key={provider.name}
            onClick={()=> signIn(provider.id)}
            className="black_btn">
            Sing In
              
            </button>

        ))}
         
        </>
      )}

    </div>

    {/* mobile navigation  */}

    <div className="sm:hidden flex relative">
        {session?.user ? (
            <div className="flex">
                <Image
                src={session?.user.image}
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
                onClick={()=> settoggleDropDown((prev)=> !prev) } />


                {toggleDropDown && (
                    <div className="dropdown">
                        <Link
                          href= "/profile"
                          className="dropdown_link"
                          onClick={()=> settoggleDropDown(false)}
                        
                        > Create Button</Link>

<Link
                          href= "/profile"
                          className="dropdown_link"
                          onClick={()=> settoggleDropDown(false)}
                        
                        > Create Button</Link>

                        <button
                          type="button"
                          onClick={()=> 
                          {
                                settoggleDropDown(false)
                            signOut()
                          }}
                          className="mt-5 w-full black_btn"
                        
                        >
                          Sign Out
                        </button>
                    </div>
               )}
            </div>
           
        ):(
        
        <>
        {providers && Object.values(providers).map((provider)=>(  
                <button
                type="button"
                key={provider.name}
                onClick={()=> signIn(provider.id)}
                className="black_btn">
                Sing In
                
                </button>

            ))}
        </>
    )}
        
    </div>





   </nav>
  )
}

export default Nav