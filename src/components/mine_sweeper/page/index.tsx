import useLocalStorage from '../../custom_hook/uselocalstorage';
import Game from '..//organisms/game';

export default function Index() {

  const level = useLocalStorage('difficulty', 'Easy', (val: string) => {
    return ['Easy', 'Normal', 'Hard'].filter(ele => ele === val).length > 0;
  })

  return <Game level={level} />
}