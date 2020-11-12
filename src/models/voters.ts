export type Voter = {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    birthDate: string;
}

export type SortDir = 'asc' | 'desc';

export type VotersSort = {
  sortCol: keyof Voter;
  sortDir: SortDir;
};

export type VotersState = {
  voters: Voter[],
  votersSort: VotersSort;
}
