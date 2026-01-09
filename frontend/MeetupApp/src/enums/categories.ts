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

export const CategoryIcons: Record<CategoryKey, IconDefinition> = {
  [CategoryKey.Meetup]: faUsers,
  [CategoryKey.Party]: faGlassCheers,
  [CategoryKey.Sports]: faFootball,
  [CategoryKey.Boardgames]: faChessPawn,
  [CategoryKey.WalkAndTalk]: faPersonWalking,
};

export const Categories = {
  [CategoryKey.Meetup]: {
    icon: CategoryIcons[CategoryKey.Meetup],
  },
  [CategoryKey.Party]: {
    icon: CategoryIcons[CategoryKey.Party],
  },
  [CategoryKey.Sports]: {
    icon: CategoryIcons[CategoryKey.Sports],
  },
  [CategoryKey.Boardgames]: {
    icon: CategoryIcons[CategoryKey.Boardgames],
  },
  [CategoryKey.WalkAndTalk]: {
    icon: CategoryIcons[CategoryKey.WalkAndTalk],
  },
};
