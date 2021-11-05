import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchCards } from '../store/reducers/cardsReducer';
import { Cards } from './cards/cards';

export const App: React.FC = () => {
  const { loaded, cards } = useSelector((state: RootState) => state.cards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCards());
  }, []);
  if (!loaded) return <h1>Загрузка...</h1>;
  return <Cards cards={cards} />;
};
