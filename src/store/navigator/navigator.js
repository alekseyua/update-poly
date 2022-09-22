
export const navigator = store => {

    store.on('@init', () => ( {goToPage : ''} ))
    store.on('goToPage', ({ goToPage }, obj, { dispatch }) => ({ goToPage : obj.path }))
}