import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  createActionDeleteCard,
  createActionLikeCard,
} from '../../store/reducers/cardsReducer';
import { ICardProps } from '../../types/props';
import './card.css';

export const Card: React.FC<ICardProps> = ({ card }: ICardProps) => {
  const cards = useSelector((state: RootState) => state.cards.cards);
  const dispatch = useDispatch();

  const handlerLikeCard = (id: number): void => {
    dispatch(createActionLikeCard(id));
    fetch('/api/cards', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(cards),
    });
  };

  const handlerDeleteCard = (
    id: number,
    event: React.MouseEvent<HTMLElement>
  ): void => {
    event.stopPropagation();
    dispatch(createActionDeleteCard(id));
  };

  return (
    <div className='card' onClick={(): void => handlerLikeCard(card.id)}>
      <div
        className='delete'
        onClick={(event: React.MouseEvent<HTMLElement>): void =>
          handlerDeleteCard(card.id, event)
        }
      >
        Удалить
      </div>
      <img src={card.img} alt='card-pic' width={100} />
      <span>{card.title}</span>
      <div className={card.liked ? 'liked' : 'not-liked'}>
        {card.liked ? 'Нравится' : 'Не нравится'}
      </div>
    </div>
  );
};
