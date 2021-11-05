export interface IStateCards {
  loaded: boolean;
  cards: ICard[];
}

export enum cardsActionsEnum {
  LOAD_CARDS = 'LOAD_CARDS',
  LIKE_CARD = 'LIKE_CARD',
  DELETE_CARD = 'DELETE_CARD',
}

export type ActionsCards =
  | IActionLoadCards
  | IActionLikeCard
  | IActionDeleteCard;

interface IActionLoadCards {
  type: cardsActionsEnum.LOAD_CARDS;
  payload: ICard[];
}

interface IActionLikeCard {
  type: cardsActionsEnum.LIKE_CARD;
  payload: number;
}

interface IActionDeleteCard {
  type: cardsActionsEnum.DELETE_CARD;
  payload: number;
}

export interface ICard {
  id: number;
  title: string;
  img: string;
  liked: boolean;
}
