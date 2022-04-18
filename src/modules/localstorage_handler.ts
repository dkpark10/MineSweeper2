// 로컬스토리지는 언제나 조작 가능하기에 값을 검증하자.
const levels = ['Easy', 'Normal', 'Hard'] as const;

const checkLevel = () => {
  let curretLevel = localStorage.getItem('difficulty');
  const isManipulated = levels.filter(level => level === curretLevel).length >= 1;

  // 조작되었음 디폴트값은 easy로 맞춘다.
  if(isManipulated === true){
    curretLevel = 'Easy';
  }  

  return curretLevel;
}

export { checkLevel };