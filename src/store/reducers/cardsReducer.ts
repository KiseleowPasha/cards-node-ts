import { Dispatch } from 'redux';
import {
  IStateCards,
  ActionsCards,
  ICard,
  cardsActionsEnum,
} from '../../types/cards';

const localStateCards: IStateCards = {
  loaded: false,
  cards: [],
};

export const cardsReducer = (
  state = localStateCards,
  action: ActionsCards
): IStateCards => {
  switch (action.type) {
    case cardsActionsEnum.LOAD_CARDS:
      return { ...state, cards: [...action.payload], loaded: true };
    case cardsActionsEnum.LIKE_CARD: {
      const currentCard = state.cards.find(
        (card: ICard) => card.id === action.payload
      );
      if (currentCard) {
        currentCard.liked = !currentCard.liked;
      }
      return { ...state };
    }
    case cardsActionsEnum.DELETE_CARD: {
      return {
        ...state,
        cards: [...state.cards.filter((card) => card.id !== action.payload)],
      };
    }
  }
  return state;
};

const createActionLoadCards = (cards: ICard[]): ActionsCards => {
  return {
    type: cardsActionsEnum.LOAD_CARDS,
    payload: cards,
  };
};

export const fetchCards = () => {
  return (dispatch: Dispatch<ActionsCards>) => {
    fetch('api/cards')
      .then((response) => response.json())
      .then((cards) => dispatch(createActionLoadCards(cards)));
  };
};

export const createActionLikeCard = (id: number): ActionsCards => {
  return {
    type: cardsActionsEnum.LIKE_CARD,
    payload: id,
  };
};

export const createActionDeleteCard = (id: number): ActionsCards => {
  return {
    type: cardsActionsEnum.DELETE_CARD,
    payload: id,
  };
};
