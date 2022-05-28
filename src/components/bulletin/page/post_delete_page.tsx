import React from 'react';

interface Props{
  postid: string;
}

export default function PostDeletePage({
  postid
}:Props){
  return <div>{postid}</div>;
}