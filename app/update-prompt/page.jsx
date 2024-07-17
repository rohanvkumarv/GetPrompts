"use client"

import Form from "../../components/Form"
import { useRouter, useSearchParams  } from 'next/navigation';

import { useState } from 'react';
import { useEffect } from "react";



const EditPrompt = () => {
  const router = useRouter();
  
  const  searchParams = useSearchParams();

  const promptId = searchParams.get(`id`);

  
 
  
  const [submitting ,setSubmitting ] = useState(false)
  const [post , setPost ] = useState({
    prompt:'',
    tag:''
  })

  useEffect(() => {
    const getPromptDetails = async ()=>{
        const response =  await fetch(`/api/prompt/${ promptId}`)
        const data = await response.json();
       setPost({
        prompt:data.prompt,
        tag:data.tag
       })
    } 
    console.log(`this is prompt id ${promptId}`);
    if ( promptId) getPromptDetails();
  }, [ promptId])
  
  const updatePrompt  = async (e)=>{
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert("Prompt id not found")

    try {
        const response = await fetch(`api/prompt/${promptId}`,{
            method:'PATCH',
            body: JSON.stringify({
                prompt:post.prompt,
        
                tag:post.tag
            })
        })
        if(response.ok){
            router.push('/')
        }
    } catch (error) {
        console.log(error);
    } finally {
        setSubmitting(false);
    }
  }
  return ( 
    <Form

    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handlesubmit={updatePrompt}
    
    
    
      />
  )
}

export default EditPrompt