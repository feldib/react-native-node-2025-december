import {
  faUsers,
  faGlassCheers,
  faFootball,
  faChessPawn,
  faPersonWalking,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export enum CategoryKey {
  Meetup = 'meetup',
  Party = 'party',
  Sports = 'sports',
  Boardgames = 'boardgames',
  WalkAndTalk = 'walk_and_talk',
}

export enum CategoryName {
  Meetup = 'Meetup',
  Party = 'Party',
  Sports = 'Sports',
  Boardgames = 'Boardgames',
  WalkAndTalk = 'Walk and Talk',
}

export const CategoryIcons: Record<CategoryKey, IconDefinition> = {
  [CategoryKey.Meetup]: faUsers,
  [CategoryKey.Party]: faGlassCheers,
  [CategoryKey.Sports]: faFootball,
  [CategoryKey.Boardgames]: faChessPawn,
  [CategoryKey.WalkAndTalk]: faPersonWalking,
};

export const Categories = {
  [CategoryKey.Meetup]: {
    name: CategoryName.Meetup,
    icon: CategoryIcons[CategoryKey.Meetup],
  },
  [CategoryKey.Party]: {
    name: CategoryName.Party,
    icon: CategoryIcons[CategoryKey.Party],
  },
  [CategoryKey.Sports]: {
    name: CategoryName.Sports,
    icon: CategoryIcons[CategoryKey.Sports],
  },
  [CategoryKey.Boardgames]: {
    name: CategoryName.Boardgames,
    icon: CategoryIcons[CategoryKey.Boardgames],
  },
  [CategoryKey.WalkAndTalk]: {
    name: CategoryName.WalkAndTalk,
    icon: CategoryIcons[CategoryKey.WalkAndTalk],
  },
};
