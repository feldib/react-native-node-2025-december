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

export enum CategoryIcon {
  Meetup = 'users',
  Party = 'glass-cheers',
  Sports = 'football',
  Boardgames = 'chess-pawn',
  WalkAndTalk = 'walk',
}

export const Categories = {
  [CategoryKey.Meetup]: {
    name: CategoryName.Meetup,
    icon: CategoryIcon.Meetup,
  },
  [CategoryKey.Party]: {
    name: CategoryName.Party,
    icon: CategoryIcon.Party,
  },
  [CategoryKey.Sports]: {
    name: CategoryName.Sports,
    icon: CategoryIcon.Sports,
  },
  [CategoryKey.Boardgames]: {
    name: CategoryName.Boardgames,
    icon: CategoryIcon.Boardgames,
  },
  [CategoryKey.WalkAndTalk]: {
    name: CategoryName.WalkAndTalk,
    icon: CategoryIcon.WalkAndTalk,
  },
};
