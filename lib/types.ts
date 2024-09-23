export type BookmarkSortOption = 'date' | 'title' | 'frequency'

export const BookmarkSortOptions: {
    [key in BookmarkSortOption]: {
        label: string,
    }
} = {
    date: {
        label: 'Date',
    },
    title: {
        label: 'Title',
    },
    frequency: {
        label: 'Frequency',
    }
}
