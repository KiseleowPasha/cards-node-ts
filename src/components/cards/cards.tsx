import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ICardsProps } from '../../types/props';
import { Card } from '../card/card';
import './cards.css';

export const Cards: React.FC<ICardsProps> = ({ cards }: ICardsProps) => {
  const cardsInStore = useSelector((state: RootState) => state.cards.cards);
  useEffect(() => {
    fetch('/api/cards', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(cards),
    });
  }, [cardsInStore]);
  if (cardsInStore.length === 0) return <span>Здесь пусто...</span>;
  return (
    <div className='cards'>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};
