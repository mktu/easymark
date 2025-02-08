export type BookmarkSortOption = 'date' | 'title' | 'frequency'

export const BookmarkSortOptions: {
    [_ in BookmarkSortOption]: {
        label: string,
    }
} = {
    date: {
        label: 'Registered Date',
    },
    title: {
        label: 'Title',
    },
    frequency: {
        label: 'Frequency',
    }
}