export type Item = {
  id: number;
}

export type NewVoter = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    birthDate: string;
}

export type Voter = NewVoter & Item;

export type SortDir = 'asc' | 'desc';

export type VotersSort = {
  sortCol: keyof Voter;
  sortDir: SortDir;
};

export type VotersState = {
  voters: Voter[],
  votersSort: VotersSort;
}
