import React from 'react';
import useLocalStorage from '../../custom_hook/uselocalstorage';
import Game from '../organisms/game';
import Header from '../../common/organisms/header';

export default function Index() {

  const level = useLocalStorage({
    key: 'difficulty',
    defaultValue: 'Easy'
  }, (val: string) => {
    return ['Easy', 'Normal', 'Hard'].filter(ele => ele === val).length > 0;
  })

  return (
    <>
      <Header />
      <Game level={level} />
    </>
  )
}