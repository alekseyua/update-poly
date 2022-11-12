import Text from "../../helpers/Text"
import CollectiionsInfoContainer from "../../Views/CollectionsInfo/CollectionsInfoContainer"

export const collections = store => {

    store.on('openInfoCollection', ({ context, modalState }, obj, { dispatch }) => {
        try {
            const prevContentModal = modalState
            const { collections, title } = obj

            return dispatch('setModalState', {
                show: true,
                title: Text({ text: 'title-collection' }),
                content: (
                    <CollectiionsInfoContainer
                        collections={collections}
                        title={title}
                    />
                ),
                closeModal: () => dispatch('setModalState', prevContentModal)
            })
        } catch (err) {
            console.log('ERROR openInfoCollection', err);
        }

    })
}