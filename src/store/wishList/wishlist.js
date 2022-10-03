import api from "../../api/api";

export const wishList = store => {
    const apiProfile = api.profileApi;

    store.on('@init', ()=>({countWishList: 0}));

    store.on('addWishList', async ({ context }, obj, { dispatch }) => {
        try{

            const params = {
                product: obj.id,
            }
            const resAddWishList = await apiProfile.postWishlist(params);
            console.log('resAddWishList = ', resAddWishList);

        }catch(err){
            console.log('Error add wish list ', err)
        }
    })

    store.on('removeWishList', async ({ context }, obj, { dispatch }) => {
        try{

            const resRemoveWishList = await apiProfile.deleteWishlist(obj.id);
            console.log('resRemoveWishList = ', resRemoveWishList);

        }catch(err){
            console.log('Error add wish list ', err)
        }
    })
}