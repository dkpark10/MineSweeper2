import React, { useEffect, useState } from 'react';
import { levelList } from '../modules/common';
import RadioButton from './atoms/radio_button';
import { HeaderText } from './atoms/text';
import Header from './header';
import '../styles/option.css';

const OptionContainer = () => {

  const [selectedLevel, setSelectedLevel] = useState<string>('');

  useEffect(() => {

    if (levelList[localStorage.getItem('difficulty')] === undefined) {
      setSelectedLevel('Easy');
      return;
    }

    setSelectedLevel(localStorage.getItem('difficulty'));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('difficulty', e.currentTarget.value);
    setSelectedLevel(e.currentTarget.value);
  }

  const levelContainer: JSX.Element[] = Object.entries(levelList).map((ele, idx) => {

    const [key, value] = ele;
    const isSelected = selectedLevel === key;

    return (
      <div className='option-row-container' key={idx}>
        <RadioButton
          name='level'
          value={key}
          onChange={onChange}
          checked={isSelected} />
        <label>
          <span style={{ fontSize: '18px' }}>{key}
          </span> <br />
          {`${value.row} X ${value.col} Mine : ${value.numberOfMine}`}
        </label>
      </div>
    )
  });

  return (
    <>
      <main className='option-container'>
        <HeaderText 
          size={'1.4rem'}
          value={'Difficulty'}
          isColor={true}
        />
        {levelContainer}
      </main>
    </>
  )
}

const Option = () => {

  return (
    <>
      <Header selected='Option' />
      <OptionContainer />
    </>
  )
}

export default Option;